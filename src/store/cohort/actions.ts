import { action } from 'typesafe-actions'
import { FilterItemData } from 'types'
import { CohortActionTypes } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setFiltersDragAndDrop = (filterItem: FilterItemData) =>
  action(CohortActionTypes.DRAG_AND_DROP_FILTER, filterItem)
