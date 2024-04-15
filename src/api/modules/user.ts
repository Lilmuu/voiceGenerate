import http from '../http'

export const getSmsCode = (data:Recordable) => {
  return http({
    url: 'login_sms_code',
    method: 'post',
    data
  })
}

export const login = (data:Recordable) => {
  return http({
    url: 'login',
    method: 'post',
    data
  })
}