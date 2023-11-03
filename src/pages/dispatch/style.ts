import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

export const Wrapper = styled.div`
  .direction-filter {
    margin-left: 20px;

    .MuiFormGroup-root {
      display: flex;
      flex-direction: row;
    }
  }
`

export const EmptyBooking = styled.div`
  text-align: center;
  font-size: 20pt;
  padding: 0 20px;
  margin-top: 30px;
`

export const IndefiniteProgress = styled(CircularProgress)`
  width: 50px;
  height: 50px;
  margin-left: 50px;
`
