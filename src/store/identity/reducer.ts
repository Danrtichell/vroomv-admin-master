import { useRouteMatch } from 'react-router-dom'
import { Reducer } from 'redux'
import { Identity, IdentityActionTypes, UserTypes } from './types'

export const initialState: Identity = {
  id: '',
  name: '',
  type: UserTypes.standard,
  userModules: [],
  dashboards: []
}

const reducer: Reducer<Identity> = (state = initialState, action) => {
  switch (action.type) {
    case IdentityActionTypes.SET_USER: {
      return { ...action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as identityReducer }
