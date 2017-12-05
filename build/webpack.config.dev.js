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
							less: 'vue-style-loader!css-loader!less-loader'
						}
					}
				},
				{
					test: /\.js$/i,
					loader: 'babel-loader?' + JSON.stringify(babelOptions),
					exclude: /node_modules/
				},
				{
					test: /\.less$/i,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'less-loader'	}
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
			disableHostCheck: true,

			// uncomment the following lines to enable proxy

			proxy: {
				'/api': {
					target: 'https://api.sorocaba.sp.gov.br/pub-consulta/api',
					changeOrigin: true,
					pathRewrite: {'^/api' : ''},
					logLevel: 'error'
				}
			}
		}
	};
};