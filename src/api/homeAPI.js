import request from '@/utils/request'
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}

export const getArtListAPI = (id,time)=>{
  return request.get('/v1_0/articles',{
    params:{
      channel_id: id,
      timestamp: time,
    }
  })
}