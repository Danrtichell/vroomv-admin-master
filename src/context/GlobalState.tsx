import React, { useReducer } from 'react'
import Context from './index'
import { modalReducer, setModal } from './modal'

interface Props {
  children: JSX.Element | JSX.Element[] | null
}

const GlobalState = (props: Props) => {
  const { children } = props
  const [modal, setModalDispatch] = useReducer(modalReducer, null)

  return (
    <Context.Provider
      value={{
        modal,
        setModal: setModal(setModalDispatch)
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default GlobalState
