export enum UserTypes {
  standard = 'standard',
  admin = 'admin'
}

export enum IdentityActionTypes {
  SET_USER = '@@identity/SET_USER'
}

export interface UserModule {
  name: string
  image: string
  link: string
}

export interface Dashboard {
  name: string
  description: string
  views: number
}

export interface Identity {
  id: string
  name: string
  type: UserTypes
  userModules: UserModule[]
  dashboards: Dashboard[]
}
