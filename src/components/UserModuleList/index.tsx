import { Box, Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ModuleListContainer, ModuleListItem } from './style'

const UserModuleList = (props: Props) => {
  const history = useHistory()
  const { list } = props

  const handleNavigate = (link: string) => {
    history.push(link)
  }

  return (
    <ModuleListContainer>
      {list.map((item) => (
        <ModuleListItem key={`item-${item.name}`}>
          <img alt="item-logo" src={item.image} />
          <Box className="item-name">{item.name}</Box>
          <Button
            onClick={() => handleNavigate(item.link)}
            size="small"
            variant="contained"
            color="primary"
          >
            Open
          </Button>
        </ModuleListItem>
      ))}
    </ModuleListContainer>
  )
}

interface Props {
  list: any[]
}

export default UserModuleList
