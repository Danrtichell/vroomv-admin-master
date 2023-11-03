import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const FormWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 10px;
  width: 50%;
  min-width: 500px;
  margin: auto;
`

export const FieldWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 10px 0;
`
