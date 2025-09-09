/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.cache = {
            type: 'filesystem', // Использовать файловую систему для кэширования
            buildDependencies: {
                config: [__filename], // Пересобирать кэш при изменении конфига
            },
        };
        return config;
    },
};

module.exports = nextConfig;
