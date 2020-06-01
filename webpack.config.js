const path = require('path');

module.exports = {
    mode: 'development',
    entry: './frontend/app.js',
    output: {
        path: path.resolve(__dirname, 'backend/src/main/resources/static'),
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
                test: /.s[ac]ss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        open: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'build/frontend'),
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    }
}