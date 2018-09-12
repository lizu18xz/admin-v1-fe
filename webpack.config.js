const path                    = require('path');
const webpack                 =require('webpack')
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const ExtractTextPlugin    =  require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/dist/',
        filename: 'js/app.js'
    },

    //别名的配置
    resolve:{
        alias:{
            page:path.resolve(__dirname,'src/page'),
            component:path.resolve(__dirname,'src/component'),
            util:path.resolve(__dirname,'src/util'),
            service:path.resolve(__dirname,'src/service'),
        }
    },

    module:{
        rules: [
            //jsx文件的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            //css文件处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            //sass文件
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            //图片
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit : 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            //字体图标
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit : 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin("css/[name].css")
    ],

    devServer: {
        port: 8086,
        //404找不到 访问此处
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy : {
            '/manager/user':{
                target: 'http://localhost:8081',
                changeOrigin: true
            },
            '/manager/jobGroup':{
                target: 'http://localhost:8081',
                changeOrigin: true
            },
            '/manager/job':{
                target: 'http://localhost:8081',
                changeOrigin: true
            }
        }
    }

};