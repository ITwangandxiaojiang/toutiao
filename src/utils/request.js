import axios from 'axios'
const instance = axios.create({
  baseURL:'http://www.liulongbin.top:8000'
})
export default instance