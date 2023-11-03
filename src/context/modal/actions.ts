export interface ModalData {
  title: string
  modal: JSX.Element | JSX.Element[] | null
}

export interface Action {
  type: string
  data: ModalData
}

export const SET_MODAL = 'SET_MODAL'

export const setModal = (dispatch: React.Dispatch<any>) => {
  return (title: string, modal: JSX.Element | JSX.Element[] | null): void => {
    dispatch({
      type: SET_MODAL,
      data: {
        modal,
        title
      }
    })
  }
}
