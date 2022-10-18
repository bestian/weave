import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Vue2ColorPicker from 'vue2-color-picker'

Vue.use(Vue2ColorPicker)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
