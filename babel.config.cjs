module.exports = api => {
    // Cache configuration is a required option
    api.cache(false)
    const presets = [
        '@babel/preset-typescript',
        '@babel/preset-env'
    ]
    return {
        presets,
        plugins: [
            '@babel/plugin-proposal-class-properties',
            ['babel-plugin-webpack-aliases', { config: 'webpack/webpack.common.js' }]
        ]
    }
}
