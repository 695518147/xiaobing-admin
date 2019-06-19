import request from '@/utils/request'
import { setToken } from '@/utils/auth'
const base_url = 'http://120.78.205.51:7071'

export function login(data) {
  setToken('admin-token')
  return request.post(`${base_url}/xiaobing/login`, data)
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
