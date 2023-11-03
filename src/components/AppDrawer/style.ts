import { Drawer as MaterialDrawer } from '@material-ui/core'
import styled from 'styled-components'

export const CustomDrawer = styled(MaterialDrawer)`
  && {
    width: 250px;

    .MuiDrawer-paper {
      position: relative;
    }
  }
`
