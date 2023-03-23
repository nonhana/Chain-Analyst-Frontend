const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 9000,
    client: {
      webSocketURL: 'ws://0.0.0.0:9000/ws',
    },
  },
  runtimeCompiler: true,
})
