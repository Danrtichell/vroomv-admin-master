import axios from 'api/axios'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

export const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/vehicles`)
}

export const getAllWithBookings = (date: string): Promise<any> => {
  return axios.get(`${BASE_URL}/vehicles/bookings`, {
    params: {
      date
    }
  })
}

export const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/vehicles/${id}`)
}

export const create = (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/vehicles`, { data })
}

export const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/vehicles/${id}`, { data })
}

export const del = (id: string): Promise<any> => {
  return axios.delete(`${BASE_URL}/vehicles/${id}`)
}

export default {
  getAll,
  getAllWithBookings,
  getById,
  create,
  update,
  delete: del
}
