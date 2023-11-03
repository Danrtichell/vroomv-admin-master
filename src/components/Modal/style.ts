import styled from 'styled-components'
import { Dialog, DialogTitle } from '@material-ui/core'

export const ModalDialog = styled(Dialog)`
  && {
    padding: 10px;

    .MuiDialog-container {
      .MuiDialog-paper {
        background: #f8faff;
        overflow: visible;
        max-width: unset;
      }
    }
  }
`

export const Title = styled(DialogTitle)`
  && {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.15px;
    color: #04235c;
    padding: 24px 24px 0 24px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  min-width: 400px;
  padding: 24px;
`
