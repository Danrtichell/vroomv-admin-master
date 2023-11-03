import React from 'react'
import { AppBar, Toolbar, Chip, IconButton } from '@material-ui/core'
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon
} from '@material-ui/icons'
import { MainNavItems, UserName, useStyles } from './style'

const AppNav = (): JSX.Element => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <MainNavItems />
        <Chip
          className={classes.departmentChip}
          color="secondary"
          label="Admin"
        />
        <UserName>John Doe</UserName>
        <IconButton
          edge="start"
          className={classes.exitButton}
          color="inherit"
          aria-label="menu"
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default AppNav
