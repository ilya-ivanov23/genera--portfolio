'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CanvasRevealEffectProps {
    animationSpeed?: number; // 0.1 (медленнее), 1.0 (быстрее)
    opacities?: number[];
    colors?: number[][];
    containerClassName?: string;
    dotSize?: number;
    showGradient?: boolean;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
                                                                          animationSpeed = 0.4,
                                                                          opacities = [0.3, 0.5, 0.8, 1.0],
                                                                          colors = [[0, 255, 255]],
                                                                          containerClassName = '',
                                                                          dotSize = 3,
                                                                          showGradient = true,
                                                                      }) => {
    return (
        <div className={`relative bg-white h-full w-full ${containerClassName}`}>
            <div className="h-full w-full">
                <DotMatrix
                    animationSpeed={animationSpeed}
                    opacities={opacities}
                    colors={colors}
                    dotSize={dotSize}
                />
            </div>
            {showGradient && (
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
            )}
        </div>
    );
};

interface DotMatrixProps {
    animationSpeed: number;
    opacities: number[];
    colors: number[][];
    dotSize: number;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
                                                 animationSpeed,
                                                 opacities,
                                                 colors,
                                                 dotSize,
                                             }) => {
    const { size } = useThree();

    // Подготовка uniforms
    const uniforms = useMemo(() => ({
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_opacities: { value: opacities },
        u_colors: {
            value: colors.map(color => color.map(c => c / 255)), // Нормализация цвета (0-1)
        },
        u_dot_size: { value: dotSize },
        u_animation_speed: { value: animationSpeed },
    }), [size, opacities, colors, dotSize, animationSpeed]);

    // Обновление времени для анимации
    useFrame(({ clock }) => {
        uniforms.u_time.value = clock.getElapsedTime();
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                attach="material"
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                blending={THREE.NormalBlending}
                transparent={true}
            />
        </mesh>
    );
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_dot_size;
  uniform float u_animation_speed;
  uniform float u_opacities[10];
  uniform vec3 u_colors[6];
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    // Смещение для создания "точек"
    vec2 grid = vec2(u_dot_size / u_resolution.x, u_dot_size / u_resolution.y);
    st = floor(st / grid) * grid;

    // Анимация и прозрачность
    float anim = mod(u_time * u_animation_speed, 1.0);
    float opacity = u_opacities[int(anim * 10.0)];

    // Выбор цвета
    int colorIndex = int(random(st) * 6.0);
    vec3 color = u_colors[colorIndex];

    gl_FragColor = vec4(color, opacity);
  }
`;

const DotMatrixCanvas: React.FC = () => {
    return (
        <Canvas className="absolute inset-0 h-full w-full">
            <DotMatrix
                animationSpeed={0.4}
                opacities={[0.3, 0.5, 0.8, 1.0]}
                colors={[[0, 255, 255], [255, 0, 255], [255, 255, 0]]}
                dotSize={3}
            />
        </Canvas>
    );
};

export default CanvasRevealEffect;
