// the 'require' parameter is in the context of front-cli, not the application
module.exports = require => {
	let path = require('path');
	let webpack = require('webpack');
	let HtmlWebpackPlugin = require('html-webpack-plugin');
	let babelOptions = {
		presets: [
			[require.resolve('babel-preset-env'), {
				targets: {
					browsers: ['ie >= 11']
				},
				modules: false,
				useBuiltIns: true,
				loose: true,
				debug: false
			}]
		],
		plugins: ['syntax-dynamic-import']
	};

	return {
		entry: {
			application: [
				'webpack-dev-server/client?{{host}}:{{port}}',
				'webpack/hot/only-dev-server',
				path.resolve(__dirname, '../application/main.js')
			]
		},

		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: '[name].js',
			chunkFilename: '[name].js'
		},

		module: {
			rules: [
				{
					test: /\.vue$/i,
					loader: 'vue-loader',
					options: {
						loaders: {
							js: 'babel-loader?' + JSON.stringify(babelOptions),
							scss: 'vue-style-loader!css-loader!sass-loader?precision=10',
							sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax&precision=10'
						}
					}
				},
				{
					test: /\.js$/i,
					loader: 'babel-loader?' + JSON.stringify(babelOptions),
					exclude: /node_modules/
				},
				{
					test: /\.sass$/i,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'sass-loader?indentedSyntax=sass&precision=10'	}
					]
				},
				{
					test: /\.scss$/i,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'sass-loader?precision=10'	}
					]
				},
				{
					test: /\.css$/i,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' }
					]
				},
				{
					test: /\.(eot|woff2?|ttf|svg|png|jpg|gif|bmp)(\?.*)*$/i,
					loader: 'file-loader',
					options: {
						name: 'assets/img/[name].[ext]'
					}
				}
			]
		},

		resolve: {
			modules: [
				path.resolve(__dirname, '../'),
				path.resolve(__dirname, '../application'),
				path.resolve(__dirname, '../node_modules')
			],
			extensions: ['.js', '.vue']
		},

		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'application',
				children: true,
				minChunks: 2
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'libs',
				minChunks({ context }) {
					return context && context.indexOf('node_modules') >= 0;
				}
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				favicon: 'favicon.ico'
			})
		],

		devtool: '#module-eval-source-map',

		devServer: {
			hot: true,
			quiet: true,
			clientLogLevel: 'error',
			overlay: true,

			// uncomment the following lines to enable proxy

			// proxy: {
			// 	'/api': {
			// 		target: 'http://PROXY_URL',
			// 		changeOrigin: true,
			// 		pathRewrite: {'^/api' : ''},
			// 		logLevel: 'error'
			// 	}
			// }
		}
	};
};