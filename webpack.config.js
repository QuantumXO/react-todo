const webpack = require('webpack');
const path = require('path');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './app/client/index.jsx'
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: isDevelopment ? '/' : './',
        filename: 'bundle.js'
    },
    cache: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'app/client/styles/_basic.sass'),
                    path.resolve(__dirname, 'app/client/containers'),
                    path.resolve(__dirname, 'app/client/components'),
                ],
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: isProduction,
                            //url: isProduction,
                            //import: isProduction,
                            //importLoaders: isProduction ? 2 : 0
                        }
                    },
                    /*'resolve-url-loader',*/
                    {
                        loader: "postcss-loader",
                        options: {
                            //exec: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },

                    { loader: 'sass-loader' },
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 30000,
                        name: 'fonts/[name].[ext]',
                    },
                },
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name][hash].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 70
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                    }
                },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        plugins: [
            new DirectoryNamedWebpackPlugin()
        ]
    },
    devtool: 'source-map',
    optimization: isProduction ? {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false,
                        warnings: false,
                        unused: true,
                        drop_console: true,
                        unsafe: true,
                        loops: true
                    },
                    output: {
                        beautify: false,
                    }
                },
            }),
        ],
    } : {},
    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new HardSourceWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css'
        }),
       /* new ExtractTextPlugin('_header.css'),*/
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './app/client/index.html',
            inject: "body"
        }),
    ],
    devServer: {
        contentBase: './dist',
        port: 3000,
        inline: true,
        hot: true
    }
};
isProduction ? module.exports.plugins.push(
    new CleanWebpackPlugin('dist', {} )
) : '';
