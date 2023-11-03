import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  container: {
    flex: '1 0 auto',
    backgroundColor: '#F8FAFF',
    maxWidth: 'none !important',
    padding: 0,
    display: 'flex'
  }
}))

export const DashboardLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const AppContent = styled.div`
  flex: 1 0 auto;
`
