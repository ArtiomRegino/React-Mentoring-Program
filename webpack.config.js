const path = require('path');
const sourcePath = path.join(__dirname, './src');
const jsSourcePath = path.join(__dirname, './src/js');
const buildPath = path.join(__dirname, './build');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const IsProduction = process.argv.indexOf('--env.prod') !== -1;
const IsDevelopment = process.argv.indexOf('--env.dev') !== -1;

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
          path.resolve(__dirname, 'node_modules'),
          jsSourcePath,
        ],
    },
    devServer: {
        open: true
    },
    output: {
        path: buildPath,
        publicPath: '',
        filename: `app-[hash].js`,
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                  'babel-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader:"file-loader",
                query:{
                  name:'[name]-[sha1:hash:7].[ext]',
                  outputPath: 'assets/images/'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
                template: path.join(sourcePath, 'index.html'),
                path: buildPath,
                filename: 'index.html',
        })
    ]
};