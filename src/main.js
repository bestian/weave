import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import i18n from './i18n'
import Vue2ColorPicker from 'vue2-color-picker'

Vue.use(Vue2ColorPicker)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
