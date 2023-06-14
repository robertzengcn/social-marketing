const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
     port: 4000,
   },
   watch: true,
   watchOptions: {
     aggregateTimeout: 100,
     // poll: 1000,
     ignored: ['node_modules','tmp','dist','doc','.history']
   },
   plugins: [
   new LiveReloadPlugin()
]
 });