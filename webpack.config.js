
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitChunks = require('webpack/lib/optimize/SplitChunksPlugin');
const package = require('./package.json')

module.exports = {
	mode: 'development',
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].bundle.js'
  },
  node: {
    fs: "empty"
  },
	watch: true,
	resolve: { extensions: [".js", ".ts"] },
	devServer: {
			contentBase: path.join(__dirname, "./dist/"),
			port: 9000
	},
	module : {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
				// loader: 'less-loader',
			}
		]
	},
	optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
	plugins: [
		new HtmlWebpackPlugin({
				hash: true,
				template: './src/index.html',
				chunks: ['vendor', 'shared', 'app'],
				path: path.join(__dirname, "./dist/"),
				filename: 'index.html' 
		}),
	]
		
};
