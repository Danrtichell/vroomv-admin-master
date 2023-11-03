import axios from 'api/axios'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

export const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/trips`)
}

export const getPending = (date: string, direction: number): Promise<any> => {
  return axios.get(`${BASE_URL}/trips/pending`, {
    params: {
      date,
      direction
    }
  })
}

export const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/trips/${id}`)
}

export const create = (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/trips`, { data })
}

export const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/trips/${id}`, { data })
}

export const del = (id: string): Promise<any> => {
  return axios.delete(`${BASE_URL}/trips/${id}`)
}

export default {
  getAll,
  getPending,
  getById,
  create,
  update,
  delete: del
}
