import http from '../http'

interface reqPage {
  page: number
  page_size: number
}
// 查询音频列表
const queryAudioList = (data: reqPage) => {
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

// 重置记录
const rechargeList = (data: reqPage) => {
  return http.post('/recharge', data)
}
// 查询剩余积分
const queryIntegral = () => {
  return http.post('/integral_query')
}
export default {
  queryAudioList,
  login,
  consumptionList,
  rechargeList,
  queryIntegral
}
