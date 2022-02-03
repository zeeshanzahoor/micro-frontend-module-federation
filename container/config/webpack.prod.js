const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const path = require('path')


const devConfig = {
	output: {
        path: path.resolve(__dirname, '../../dist'),
		publicPath: '/',
		clean: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: 'marketing@http://localhost:3000/marketing/remoteEntry.js',
				auth: 'auth@http://localhost:3000/auth/remoteEntry.js',
				dashboard: 'dashboard@http://localhost:3000/dashboard/remoteEntry.js',
			},
			shared: packageJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, devConfig);

