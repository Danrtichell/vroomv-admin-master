import React from 'react'
import { useHistory } from 'react-router-dom'
import { ListItemText, List, ListItem, ListItemIcon } from '@material-ui/core'
import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Dashboard,
  AirlineSeatReclineExtra,
  AccessibilityNew,
  Room,
  LocalTaxi,
  MenuBook,
  GolfCourse,
  Business as BusinessIcon,
  ImportExport
} from '@material-ui/icons'
import { CustomDrawer } from './style'

const Links = [
  {
    label: 'Dashboard',
    link: '/',
    icon: <Dashboard />
  },
  {
    label: 'Claimables',
    link: '/claimables',
    icon: <BusinessIcon />
  },
  {
    label: 'Company',
    link: '/company',
    icon: <BusinessIcon />
  },
  {
    label: 'Drivers',
    link: '/drivers',
    icon: <AirlineSeatReclineExtra />
  },
  {
    label: 'Passengers',
    link: '/passengers',
    icon: <AccessibilityNew />
  },
  {
    label: 'Zones',
    link: '/zones',
    icon: <Room />
  },

  {
    label: 'Vehicles',
    link: '/vehicles',
    icon: <LocalTaxi />
  },
  {
    label: 'Bookings',
    link: '/bookings',
    icon: <MenuBook />
  },
  {
    label: 'Dispatch',
    link: '/dispatch',
    icon: <GolfCourse />
  },
  {
    label: 'Imports',
    link: '/import',
    icon: <ImportExport />
  }
]

const AppDrawer = () => {
  const history = useHistory()

  const handleClick = (link: string) => {
    history.push(link)
  }

  return (
    <CustomDrawer variant="permanent" anchor="left">
      <List>
        {Links.map((link, index) => (
          <ListItem
            onClick={() => handleClick(link.link)}
            button
            key={link.label}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </CustomDrawer>
  )
}

export default AppDrawer
