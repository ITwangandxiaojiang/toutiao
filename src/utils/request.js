import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'
const instance = axios.create({
  baseURL: 'http://www.liulongbin.top:8000'
})
instance.interceptors.request.use(
  config => {
    const tokenStr = store.state.initState.tokenInfo.token
    if (tokenStr) {
      // 3. 添加身份认证字段
      config.headers.Authorization = `Bearer ${tokenStr}`
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  response => {
    // 隐藏 loading 效果
    Toast.clear()
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance