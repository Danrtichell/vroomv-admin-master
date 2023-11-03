import { LayoutType, ErrorType } from '../enums'

export type RouteModel = {
  title: string
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
  isSecure: boolean
  layout: LayoutType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

export type TextInputModel = {
  id: string
  value?: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  errorType?: ErrorType
  maxValue?: number
  postfix?: string
  maxLength?: number
  decimals?: number
}

export type JwtToken = {
  iat: number
  exp: number
  sub: string
}

export type FilterItemData = {
  id: number
  title: string
  numOfFilter: number
  backgroundColor?: string
  presets?: string
}

export type DefaultUrlParams = {
  id: string
}

export type ZoneUrlParams = {
  id: string
  locationId: string
}

export type CompanyUrlParams = {
  id: string
  eligibleEmployeeId: string
}
