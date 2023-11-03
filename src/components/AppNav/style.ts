import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  exitButton: {
    marginLeft: theme.spacing(2),
    padding: 0
  },
  departmentChip: {
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: '#EA469A',
    color: '#FBFCFD',
    fontFamily: 'Open Sans',
    fontSize: '13px'
  }
}))

export const MainNavItems = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;

  img.logo {
    margin-right: 10px;
  }
`

export const UserName = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  margin: 0 10px;
`
