import axios from 'api/axios'
import { BookingDirection } from 'enums'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/bookings`)
}

const getPending = (
  locationId: string,
  date: string,
  direction: BookingDirection
): Promise<any> => {
  return axios.get(`${BASE_URL}/bookings/pending`, {
    params: {
      locationId,
      date,
      direction
    }
  })
}

const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/bookings/${id}`)
}

const create = (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/bookings`, { data })
}

const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/bookings/${id}`, { data })
}

const del = (id: string): Promise<any> => {
  return axios.delete(`${BASE_URL}/bookings/${id}`)
}

export default {
  getAll,
  getPending,
  getById,
  create,
  update,
  delete: del
}
