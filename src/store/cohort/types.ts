import { FilterItemData } from 'types'

export enum CohortActionTypes {
  DRAG_AND_DROP_FILTER = '@@cohort/DRAG_AND_DROP_FILTER'
}

export interface CohortState {
  filtersDragAndDrop: FilterItemData[]
}
