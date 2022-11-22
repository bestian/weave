const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pwa: {
    workboxOptions: {
      exclude: [/\.gitkeep/],
      skipWaiting: true
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/weave/'
  : '/',
  transpileDependencies: true
})
