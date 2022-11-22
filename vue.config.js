const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    i18n: {
      locale: 'zh-TW',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
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
