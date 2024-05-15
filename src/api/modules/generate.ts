import http from '../http'

export const chatLivemsg = (data:Recordable) => {
  return http({
    url: 'chat_livemeg',
    method: 'post',
    data
  })
}

export const chat_live = (data:Recordable) => {
  return http({
    url: 'chat_live',
    method: 'post',
    data
  })
}

export const chatReplymsg = (data:Recordable) => {
  return http({
    url: 'chat_replymeg',
    method: 'post',
    data
  })
}

export const chatCopymsg = (data:Recordable) => {
  return http({
    url: 'chat_copymeg',
    method: 'post',
    data
  })
}

export const saveAudio = (data:Recordable) => {
  return http({
    url: 'query',
    method: 'post',
    data
  })
}

export const queryScript = (data:Recordable) => {
  return http({
    url: 'script_query',
    method: 'post',
    data
  })
}

export const queryTone = (data:Recordable) => {
  return http({
    url: 'query_tone',
    method: 'post',
    data
  })
}

export const replyQuery = (data:Recordable) => {
  return http({
    url: 'reply_query',
    method: 'post',
    data
  })
}

export const delUser = () => {
  return http({
    url: '/del_user',
    method: 'post'
  })
}