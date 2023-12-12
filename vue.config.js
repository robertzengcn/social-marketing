module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
    //target:'electron-renderer',
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      // nodeIntegration:true,
      // removeElectronJunk: false
      // Or, for multiple preload files:
      //preload: { preload: 'src/preload.js' }
    }
  }
}
