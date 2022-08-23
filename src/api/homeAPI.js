import request from '@/utils/request'
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}

export const getArtListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: id,
      timestamp: time,
    }
  })
}

// 将文章设置为不感兴趣（形参 id 是文章的 id）
export const dislikeArticleAPI = id => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}

export const reportArticleAPI = (target, type) => {
  return request.post('/v1_0/article/reports', {
    target, // 文章的 Id
    type // 举报的类型
  })
}


// 获取所有频道数据的 API
export const getAllChannelAPI = () => {
  return request.get('/v1_0/channels')
}

export const updateUserChannelAPI = channels =>{
  return request.put('/v1_0/user/channels',{
    channels
  })
}