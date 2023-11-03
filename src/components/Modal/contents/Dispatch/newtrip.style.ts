import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const PaperContainer = styled(Paper)`
  margin-top: 10px;
  padding: 10px 0;

  .table-container {
    max-height: 500px;
    overflow-y: auto;
  }
`

export const LabelWrapper = styled.div`
  padding: 10px;
`
