import axios from 'axios'

const base_url = 'http://120.78.205.51:7071'

export function fetchList(query = {}) {
  const urlParmArr = [query.orderBy === '' ? '' : `orderBy=${query.orderBy}`,
    (query.page === undefined || query.limit === undefined) ? '' : `pageNum=${query.page}&pageSize=${query.limit}`].filter((item) => {
    return item.trim().length !== 0
  })
  const urlParm = urlParmArr.join('&')
  return axios.post(`${base_url}/xiaobing/ordertype/list?${urlParm}`, query)
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
