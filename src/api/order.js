import axios from 'axios'

const base_url = 'http://120.78.205.51:7071'

export function fetchList(query = {}) {
  const urlParmArr = [query.orderBy === '' ? '' : `orderBy=${query.orderBy}`,
    (query.page === undefined || query.limit === undefined) ? '' : `pageNum=${query.page}&pageSize=${query.limit}`].filter((item) => {
    return item.trim().length !== 0
  })
  const urlParm = urlParmArr.join('&')
  return axios.post(`${base_url}/xiaobing/order/list?${urlParm}`, query)
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
