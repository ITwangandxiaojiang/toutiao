import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/', component: Main, children: [
      { path: '', component: Home, name: 'home' },
      { path: '/user', component: User, name: 'user' }
    ]
  }
]
const router = new VueRouter({
  routes
})


export default router
