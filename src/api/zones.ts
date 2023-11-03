import axios from 'api/axios'
import { BookingDirection } from 'enums'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/zones`)
}

const getAllWithBookingCount = (
  date: string,
  direction: BookingDirection
): Promise<any> => {
  return axios.get(`${BASE_URL}/zones/bookings`, {
    params: {
      date,
      direction
    }
  })
}

const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/zones/${id}`)
}

const getLocationsByZoneId = (zoneId: string): Promise<any> => {
  return axios.get(`${BASE_URL}/zones/${zoneId}/locations`)
}

export const create = (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/zones`, { data })
}

export const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/zones/${id}`, { data })
}

export const del = (id: string): Promise<any> => {
  return axios.delete(`${BASE_URL}/zones/${id}`)
}

export default {
  getAll,
  getAllWithBookingCount,
  getById,
  getLocationsByZoneId,
  create,
  update,
  delete: del
}
