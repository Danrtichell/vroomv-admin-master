import React from 'react'
import { InitialValue as modalInitialValue } from 'context/modal/reducer'

export default React.createContext({
  modal: modalInitialValue,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModal: (title: string, modal: JSX.Element | JSX.Element[] | null) => {}
})
