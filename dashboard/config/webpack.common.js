const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: require.resolve('ts-loader'),
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
