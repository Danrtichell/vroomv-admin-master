import { Reducer } from 'redux'
import { CohortState, CohortActionTypes } from './types'

export const initialState: CohortState = {
  filtersDragAndDrop: []
}

const reducer: Reducer<CohortState> = (state = initialState, action) => {
  switch (action.type) {
    case CohortActionTypes.DRAG_AND_DROP_FILTER: {
      return {
        ...state,
        filtersDragAndDrop: [...state.filtersDragAndDrop, action.payload]
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as cohortReducer }
