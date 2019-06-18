import axios from 'axios'

const base_url = 'http://localhost:7071'

export function fetchList(query = {}) {
  debugger
  return axios.post( `${base_url}/xiaobing/order/list?orderBy=` + query.orderBy, query)
}

export function cdelete(data) {
  debugger
  return axios.delete(`${base_url}/xiaobing/order/${data.id}`)
}

export function create(data) {
  debugger
  return axios.post(`${base_url}/xiaobing/order`, data)
}

export function update(data) {
  debugger
  return axios.put(`${base_url}/xiaobing/order`, data)
}

export function handleModify(data) {
  debugger
  return axios.put(`${base_url}/xiaobing/order`, data)
}
