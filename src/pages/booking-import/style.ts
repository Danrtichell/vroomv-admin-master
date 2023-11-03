import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: auto;

  button {
    margin-top: 30px;
    width: 150px;
  }
`

export const SampleContainer = styled.div`
  text-align: center;
  padding: 10px 0;
`

export const IndefiniteProgress = styled(CircularProgress)`
  margin-bottom: 30px;
`
