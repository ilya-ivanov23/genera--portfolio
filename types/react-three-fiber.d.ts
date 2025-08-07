import { MeshProps, PlaneGeometryProps, ShaderMaterialProps, Object3DProps, AmbientLightProps, DirectionalLightProps, PointLightProps } from '@react-three/fiber';
import { ThreeGlobeProps } from '@react-three/drei';

declare module '@react-three/fiber' {
    interface ThreeElements {
        mesh: MeshProps;
        planeGeometry: PlaneGeometryProps;
        shaderMaterial: ShaderMaterialProps;
        primitive: Object3DProps;
        ambientLight: AmbientLightProps;
        directionalLight: DirectionalLightProps;
        pointLight: PointLightProps;
        threeGlobe: ThreeGlobeProps;
    }
}
