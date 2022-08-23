import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'
import Search from "@/views/Search/Search.vue"
import SearchResult from '@/views/SearchResult/SearchResult.vue'
import ArticleDetail from '@/views/ArticleDetail/ArticleDetail.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/', component: Main, children: [
      { path: '', component: Home, name: 'home' },
      { path: '/user', component: User, name: 'user' }
    ]
  },
  { path: '/search', component: Search, name: 'search' },
  { path: '/search/:kw', component: SearchResult, name: 'search-result', props: true },
  { path: '/article/:id', component: ArticleDetail, name: 'art-detail', props: true }
]
const router = new VueRouter({
  routes
})


export default router
