import axios from 'axios'

const handleUnauthorized = () => {
  if (window.location.href.toString().indexOf('login') === -1) {
    window.location.href = '/login'
  }
}

const getHeaders = () => {
  const headers = { Authorization: '' }

  const token = localStorage.getItem('token')

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

const get = async (url: string, options: any = {}) => {
  let result

  try {
    const response = await axios.get(url, { headers: getHeaders(), ...options })

    result = response ? response.data : undefined
  } catch (ex) {
    if (ex.response && ex.response.status === 401) {
      handleUnauthorized()
    }
  }

  return result
}

const post = async (url: string, data: any) => {
  let result

  try {
    const response = await axios.post(url, data, { headers: getHeaders() })

    result = response ? response.data : undefined
  } catch (ex) {
    if (ex.response && ex.response.status === 401) {
      handleUnauthorized()
    }
  }

  return result
}

const put = async (url: string, data: any) => {
  let result

  try {
    const response = await axios.put(url, data, { headers: getHeaders() })

    result = response ? response.data : undefined
  } catch (ex) {
    if (ex.response.status === 401) {
      handleUnauthorized()
    }
  }

  return result
}

const del = async (url: string) => {
  let result

  try {
    const response = await axios.delete(url, { headers: getHeaders() })

    result = response ? response.data : undefined
  } catch (ex) {
    if (ex.response.status === 401) {
      handleUnauthorized()
    }
  }

  return result
}

export default { get, post, put, delete: del }
