import axios from 'api/axios'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

export const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/claimables`)
}

export const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/claimables/${id}`)
}

export const create = (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/claimables`, { data })
}

export const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/claimables/${id}`, { data })
}

export const del = (id: string): Promise<any> => {
  return axios.delete(`${BASE_URL}/claimables/${id}`)
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: del
}
