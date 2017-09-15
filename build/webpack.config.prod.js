let pkg = require('../package.json');

// the 'require' parameter is in the context of front-cli, not the application
module.exports = require => {
	let path = require('path');
	let fs = require('fs-extra');
	let webpack = require('webpack');
	let ExtractTextPlugin = require('extract-text-webpack-plugin');
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

	fs.copySync(path.resolve(__dirname, '../config.js'), path.resolve(__dirname, '../dist/config.js'));

	return {
		entry: {
			application: [path.resolve(__dirname, '../application/main.js')]
		},

		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: 'js/[name]-[chunkhash].js',
			chunkFilename: 'js/[name]-[chunkhash].js'
		},

		module: {
			rules: [
				{
					test: /\.vue$/i,
					loader: 'vue-loader',
					options: {
						loaders: {
							js: 'babel-loader?' + JSON.stringify(babelOptions),
							css: ExtractTextPlugin.extract({
								use: {
									loader: 'css-loader',
									options: {
										sourceMap: true,
										minimize: true
									}
								},
								publicPath: '../'
							})
						}
					}
				},
				{
					test: /\.(js|vue)$/i,
					loader: 'eslint-loader',
					enforce: 'pre',
					exclude: /node_modules/,
					options: {
						fix: true
					}
				},
				{
					test: /\.js$/i,
					loader: 'babel-loader?' + JSON.stringify(babelOptions),
					exclude: /node_modules/
				},
				{
					test: /\.css$/i,
					loader: ExtractTextPlugin.extract({
						use: {
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true
							}
						},
						publicPath: '../'
					})
				},
				{
					test: /\.(eot|woff2?|ttf|svg|png|jpg|gif|bmp)(\?.*)*$/i,
					loader: 'file-loader',
					options: {
						name: 'img/[name]-[hash].[ext]'
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
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
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
			new webpack.optimize.CommonsChunkPlugin({
				name: 'manifest',
				minChunks: Infinity
			}),
			new webpack.optimize.UglifyJsPlugin({
				output: { comments: false },
				sourceMap: true
			}),
			new ExtractTextPlugin({
				filename: 'css/application-[chunkhash].css',
				allChunks: true
			}),
			new webpack.BannerPlugin({
				banner: [
					`${pkg.name} ${pkg.version} - ${pkg.description}`,
					'\nDevelopers:\n',
					pkg.authors.map(a => `\t\t${a}`).join('\n')
				].join('\n'),
				entryOnly: false
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				favicon: 'favicon.ico'
			})
		],

		devtool: '#source-map'
	};
};