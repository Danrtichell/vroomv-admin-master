import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const PaperWrapper = styled(Paper)`
  padding: 10px;
`

export const ProcessingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

export const SmallBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  max-width: 500px;
  margin: auto;
`

export const SmallBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;

  span {
    font-size: 20pt;
  }
`
