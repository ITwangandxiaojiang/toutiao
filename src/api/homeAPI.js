import request from '@/utils/request'
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}