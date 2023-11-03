import styled from 'styled-components'
import { makeStyles, ListItem as ListItemMaterial } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

export const Wrapper = styled.div`
  min-width: 400px;

  h3 {
    margin: 10px;
  }
`

interface ListItemProps {
  select: boolean
}

export const ListItem = styled(ListItemMaterial)`
  && {
    background-color: ${(props: ListItemProps) =>
      props.select ? '#7f489f' : 'transparent'};
  }
`
