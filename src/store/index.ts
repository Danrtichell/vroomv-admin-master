import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import { LayoutState, layoutReducer } from './layout'
import { Identity, identityReducer } from './identity'
import { CohortState, cohortReducer } from './cohort'

// The top-level state object
export interface ApplicationState {
  layout: LayoutState
  identity: Identity
  cohort: CohortState
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRootReducer = () =>
  combineReducers({
    layout: layoutReducer,
    identity: identityReducer,
    cohort: cohortReducer
  })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* rootSaga() {
  yield all([])
}
