const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        assetModuleFilename: 'images/[name][ext]',
        filename: 'scripts/[name].bundle.js',
    },
    devServer: {
        historyApiFallback: true,
        // contentBase: join(__dirname, '../dist'),
        host: '0.0.0.0',
        // inline: true
        port: 8088,
        // watchContentBase: true,
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Joker',
            filename: 'index.html',
            template: resolve(__dirname, '../src/index.dev.html'),
        }),
    ],
};
