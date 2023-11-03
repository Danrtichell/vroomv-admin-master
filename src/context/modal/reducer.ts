import { KeyExportOptions } from 'crypto'
import { SET_MODAL, Action, ModalData } from './actions'

export const InitialValue: ModalData = {
  title: '',
  modal: null
}

const reducer = (modal = null, action: Action): any => {
  switch (action.type) {
    case SET_MODAL:
      return action.data
    default:
      return InitialValue
  }
}

export default reducer
