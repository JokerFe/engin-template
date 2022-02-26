const merge = require('webpack-merge');
const { join, resolve } = require('path');

const argv = require('yargs-parser');
const _mode = argv.mode || 'development';
const _modeFLag = argv.mode === 'prodution';
const _mergeConfig = require(`./webpack/webpack.${_mode}.js`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssLoaders = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            // 用来处理 @import()
            importLoaders: 1,
        },
    },
    {
        loader: 'postcss-loader',
    },
];

const webpackBaseConfig = {
    entry: {
        app: resolve('src/index.tsx'),
    },
    output: {
        path: join(__dirname, './dist/asstes'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(css|scss)$/,
                use: cssLoaders,
            },
            {
                test: /\.(png|jpeg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
                type: 'assets',
            },
        ],
    },
    resolve: {
        alias: {
            '@assets': resolve('src/assets'),
            '@components': resolve('src/components'),
            '@models': resolve('src/models'),
            '@routes': resolve('src/routes'),
            '@pages': resolve('src/pages'),
            '@utils': resolve('src/utils'),
            '@recoil': resolve('src/recoil'),
            '@hooks': resolve('src/hooks'),
            '@api': resolve('src/api'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: _modeFLag ? 'styles/[name].[contents:5].css' : 'styles/[name].css',
            chunkFilename: _modeFLag ? 'styles/[id].[contents:5].css' : 'styles/[id].css',
            ignoreOrder: true,
        }),
    ],
};
module.exports = merge.default(webpackBaseConfig, _mergeConfig);
