import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import './index.less'
import 'amfe-flexible'
import router from './router'
import store from './store'
import dayjs from  'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh-cn'
import { Lazyload } from 'vant';
Vue.use(Vant)
Vue.use(Lazyload)
Vue.config.productionTip = false
// 配置“计算相对时间”的插件
dayjs.extend(relativeTime)
// 配置中文语言包
dayjs.locale(zh)
Vue.filter('dataFormat',dt =>{
  return dayjs().to(dt)
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
