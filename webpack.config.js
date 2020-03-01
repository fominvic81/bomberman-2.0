const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
