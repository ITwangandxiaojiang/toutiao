import request from '@/utils/request'

export const getArticleDetailAPI = id => {
  return request.get(`/v1_0/articles/${id}`)
}

// 关注用户的 API（形参中的 userId 是文字作者的 id）
export const followUserAPI = userId => {
  return request.post('/v1_0/user/followings', {
    target: userId
  })
}

// 取消关注用户的 API
export const unfollowUserAPI = userId => {
  return request.delete(`/v1_0/user/followings/${userId}`)
}

export const addLikeAPI = artId =>{
  return request.post('/v1_0/article/likings',{
    target:artId
  })
}

export const delLikeAPI = artId =>{
  return request.delete(`/v1_0/article/likings/${artId}`)
}