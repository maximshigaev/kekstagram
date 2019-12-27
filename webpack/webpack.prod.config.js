const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config.js");
const prodWebpackConfig = merge(baseWebpackConfig, {
	mode: "production",
	devtool: "cheap-module-eval-source-map",
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: "[file].map"
		})
	]
});

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig);
});
