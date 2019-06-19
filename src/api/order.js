import axios from 'axios'

const base_url = 'http://120.78.205.51:7071'

export function fetchList(query = {}) {
  return axios.post(`${base_url}/xiaobing/order/list?orderBy=` + query.orderBy, query)
}

export function cdelete(data) {
  return axios.delete(`${base_url}/xiaobing/order/${data.id}`)
}

export function create(data) {
  return axios.post(`${base_url}/xiaobing/order`, data)
}

export function update(data) {
  return axios.put(`${base_url}/xiaobing/order`, data)
}

export function handleModify(data) {
  return axios.put(`${base_url}/xiaobing/order`, data)
}
