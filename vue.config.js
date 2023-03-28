const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 7000,
    client: {
      webSocketURL: 'ws://0.0.0.0:7000/ws',
    },
  },
  runtimeCompiler: true,
})
