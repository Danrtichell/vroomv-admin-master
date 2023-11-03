import React from 'react'
import { List, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { useStyles, Wrapper, ListItem } from './zonelist.style'

interface Prop {
  zones: any[]
  activeZone: string
  onActiveZoneChanged: (zone: any) => void
}

const ZoneList = (prop: Prop) => {
  const { zones = [], activeZone, onActiveZoneChanged } = prop
  const classes = useStyles()

  return (
    <Wrapper>
      <h3>Zones</h3>
      <List className={classes.root}>
        {zones.map((zone: any) => (
          <ListItem
            onClick={() => onActiveZoneChanged(zone.id)}
            select={activeZone === zone.id}
            key={zone.id}
            button
          >
            <ListItemText>{zone.name}</ListItemText>
            <ListItemSecondaryAction>({zone.count})</ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )
}

export default ZoneList
