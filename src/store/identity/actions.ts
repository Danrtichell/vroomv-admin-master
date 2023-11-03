import { action } from 'typesafe-actions'
import { Identity, IdentityActionTypes } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setUser = (user: Identity) =>
  action(IdentityActionTypes.SET_USER, user)
