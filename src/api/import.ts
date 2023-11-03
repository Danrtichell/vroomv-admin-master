import axios from 'api/axios'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

const getAll = (): Promise<any> => {
  return axios.get(`${BASE_URL}/import`)
}

const getById = (id: string): Promise<any> => {
  return axios.get(`${BASE_URL}/import/${id}`)
}

const update = (id: string, data: any): Promise<any> => {
  return axios.put(`${BASE_URL}/import/${id}`, { data })
}

const upload = (form: FormData): Promise<any> => {
  return axios.post(`${BASE_URL}/import/csv`, form)
}

const acceptBatch = (id: string): Promise<any> => {
  return axios.post(`${BASE_URL}/import/accept/${id}`, null)
}

const abortBatch = (id: string): Promise<any> => {
  return axios.post(`${BASE_URL}/import/abort/${id}`, null)
}

const getFailedBookingImports = (): Promise<any> => {
  return axios.get(`${BASE_URL}/import/failures`)
}

export default {
  acceptBatch,
  abortBatch,
  getAll,
  getById,
  getFailedBookingImports,
  update,
  upload
}
