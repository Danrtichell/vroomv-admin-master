import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import { JwtToken } from '../types'

const cookies = new Cookies()

export const getJWT = (): string | undefined => {
  const accessToken = cookies.get('accessToken')
  const decodeToken: JwtToken = jwtDecode(accessToken) as JwtToken
  const { exp: tokenExpiration } = decodeToken

  if (accessToken && tokenExpiration > Date.now() / 1000) {
    return accessToken
  }

  cookies.remove('accessToken', { path: '/' })

  return undefined
}

export const setTokens = (jwt: string, ref: string): void => {
  cookies.set('accessToken', jwt, { httpOnly: false, path: '/' })
  cookies.set('refreshToken', ref, { httpOnly: false, path: '/' })
}

export const removeTokens = (): void => {
  cookies.remove('accessToken', { path: '/' })
  cookies.remove('refreshToken', { path: '/' })
}

export const getCurrentUserId = (): string | undefined => {
  const accessToken = cookies.get('accessToken')
  if (accessToken) {
    const { exp, sub } = jwtDecode(accessToken) as JwtToken
    if (exp > Date.now() / 1000) {
      return sub
    }
    cookies.remove('accessToken', { path: '/' })
    return undefined
  }
  return undefined
}
