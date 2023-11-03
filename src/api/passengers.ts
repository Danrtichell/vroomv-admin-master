import axios from 'api/axios'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/passengers`)
}

const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/passengers/${id}`)
}

const create = (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/passengers`, { data })
}

const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/passengers/${id}`, { data })
}

const del = (id: string): Promise<any> => {
  return axios.delete(`${BASE_URL}/passengers/${id}`)
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: del
}
