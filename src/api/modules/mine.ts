import http from '../http'

interface reqPage {
  page: number
  page_size: number
}
// 查询音频列表
const queryAudioList = (data: { user_id: number }) => {
  return http.post('/query_audio_list', data)
}
// 登录
const login = (data: { phone: string; password: string }) => {
  return http.post('/login', data)
}
// 消费记录
const consumptionList = (data: reqPage) => {
  return http.post('/expense', data)
}
export default {
  queryAudioList,
  login,
  consumptionList
}
