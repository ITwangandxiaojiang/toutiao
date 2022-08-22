import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
