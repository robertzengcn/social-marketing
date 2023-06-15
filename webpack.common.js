// var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// var ManifestPlugin = require("webpack-manifest-plugin");
//var WebpackAssetsManifest = require('webpack-assets-manifest');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// var HtmlWebpackPlugin = require("html-webpack-plugin");
// var LiveReloadPlugin = require("webpack-livereload-plugin");
var webpack = require("webpack");
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: {
    run:'./run.ts',
    index:'./index.ts'
  },
  stats: 'minimal',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // devtool: "inline-source-map",
  output: {
    path: __dirname + "/dist/", //打包后的文件存放的地方
    filename: "./[name].js", //打包后输出文件的文件名  
    // sourceMapFilename: "[file].map", // Default
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  
  plugins: [
    
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
  })
  ],


};
