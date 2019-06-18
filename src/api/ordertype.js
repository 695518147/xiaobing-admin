import axios from 'axios'

const base_url = 'http://localhost:7071'

export function fetchList(query = {}) {
  return axios.post(`${base_url}/xiaobing/ordertype/list?orderBy=` + query.orderBy, query)
}

export function cdeleteArticle(data) {
  return axios.delete(`${base_url}/xiaobing/ordertype/${data.id}`)
}

export function createArticle(data) {
  return axios.post(`${base_url}/xiaobing/ordertype`, data)
}

export function updateArticle(data) {
  return axios.put(`${base_url}/xiaobing/ordertype`, data)
}

export function handleModifyStatus(data) {
  return axios.put(`${base_url}/xiaobing/ordertype`, data)
}
