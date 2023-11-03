import React, { useContext } from 'react'
import Context from 'context'
import { Wrapper, ModalDialog, Title } from './style'

const Modal = () => {
  const { modal } = useContext(Context)

  if (!modal || !modal.modal) {
    return null
  }

  return (
    <ModalDialog open>
      <Title>{modal.title}</Title>
      <Wrapper>{modal.modal}</Wrapper>
    </ModalDialog>
  )
}

export default Modal
