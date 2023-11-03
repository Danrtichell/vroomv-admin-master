import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 10px;

  h3 {
    margin: 10px;
  }
`
export const ContentWrapper = styled(Paper)`
  && {
    display: flex;
    flex: 1;
    height: 100%;
    box-shadow: none;
    padding: 10px;
  }
`
