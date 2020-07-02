const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, '../backend/src/main/resources/static'),
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(jsx|js)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: {
                  loader: 'html-loader',
                },
            },
            {
                test: /.s[ac]ss$/,
                use: [ { loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '../backend/src/main/resources/static'),
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html',
          favicon: './public/favicon.png'
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false,
        })
      ]
}