import axios from 'api/axios'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/drivers`)
}

const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/drivers/${id}`)
}

const create = (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/drivers`, { data })
}

const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/drivers/${id}`, { data })
}

const del = (id: string): Promise<any> => {
  return axios.delete(`${BASE_URL}/drivers/${id}`)
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: del
}
