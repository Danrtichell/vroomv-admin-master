import axios from 'api/axios'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

export const authenticate = async (email: string, password: string) => {
  const data = { email, password }
  const response = await axios.post(`${BASE_URL}/auth/login`, { data })

  if (response && response.data.type === 'Admin') {
    localStorage.setItem('token', response.data.token)
  } else {
    const err = { message: 'Invalid credentials' }

    throw err
  }
}
