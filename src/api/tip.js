import axios from 'axios'

const base_url = 'http://localhost:7071'

export function fetchList(query = {}) {
  return axios.post(`${base_url}/xiaobing/tip/list?orderBy=` + query.orderBy, query)
}

export function cdelete(data) {
  return axios.delete(`${base_url}/xiaobing/tip/${data.tipId}`)
}

export function create(data) {
  return axios.post(`${base_url}/xiaobing/tip`, data)
}

export function update(data) {
  return axios.put(`${base_url}/xiaobing/tip`, data)
}

export function handleModify(data) {
  return axios.put(`${base_url}/xiaobing/tip`, data)
}
