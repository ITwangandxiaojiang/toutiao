import request from '@/utils/request.js'

export const loginAPI = data =>{
  return request.post('/v1_0/authorizations',data)
}