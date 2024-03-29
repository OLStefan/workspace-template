const path = require('path');
const nodeExternals = require('webpack-node-externals');

// Config to build Express server and associated server-side code bundle
module.exports = {
	mode: 'production',
	target: 'node',
	entry: './src/server.ts',
	externals: [nodeExternals()], // Ignore node_modules
	output: {
		path: path.resolve(__dirname, '.next-server'),
		filename: 'server.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.webpack.json',
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
};
