import { Paper, List, ListItem as ListItemMaterial } from '@material-ui/core'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 900px;

  .name-input {
    width: 300px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;

  button {
    width: 150px;
    height: 48px;
    margin-left: 10px;
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

export const NestedList = styled(List)`
  && {
    padding-left: 40px;

    li {
      background-color: transparent;

      &:hover {
        background-color: transparent;
      }
    }
  }
`

export const MessageWrapper = styled.div`
  padding: 0 10px;
  text-align: center;
  color: green;
`

export const VehicleBookingInfoContainer = styled.div`
  display: flex;
`

export const InfoSpan = styled.span`
  margin-left: 10px;
`

export const Heading = styled.h3`
  color: #000000;
  font-family: Roboto;
`

export const ScrollableList = styled(List)`
  max-height: 600px;
  overflow-y: auto;
`

export const PaperContainer = styled(Paper)`
  margin-top: 10px;
  padding: 10px 0;
`
