const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';

module.exports = {
	devtool: dev ? 'eval-source-map' : false,
	entry: './src/index.js',

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: './assets', to: 'assets' },
		]),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
};
