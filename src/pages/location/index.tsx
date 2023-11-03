import React, { useEffect, useState } from 'react'
import NavigationInfo from 'components/NavigationInfo'
import {
  AppContentWrapper,
  ActionButtonsWrapper,
  PrimaryButton
} from 'components/shared/style'
import { useHistory, useParams } from 'react-router-dom'
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  IconButton
} from '@material-ui/core'
import { Edit, DeleteForever, LocationCity } from '@material-ui/icons'
import zonesApi from 'api/zones'
import locationsApi from 'api/locations'
import SearchBox from 'components/SearchBox'
import { DefaultUrlParams } from 'types'

const LocationPage = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [state, setState] = useState({
    locations: []
  })

  const getData = async () => {
    const { data: locations } = await zonesApi.getLocationsByZoneId(
      urlParams.id
    )

    setState({ locations })
  }

  const handleEdit = (id: string) => {
    history.push(`/zones/${urlParams.id}/locations/${id}/edit`)
  }

  const handleDelete = async (location: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(`Are you sure you want to delete "${location.name}"?`)

    if (yes) {
      await locationsApi.delete(location.id)
      getData()
    }
  }

  const handleCreate = () => {
    history.push(`/zones/${urlParams.id}/locations/create`)
  }

  const handleGoBack = () => {
    history.push('/zones')
  }

  const getTitle = () => {
    if (history.location.state) {
      const locationState: any = history.location.state

      return `Locations for ${locationState.name}`
    }

    return 'Locations'
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current={getTitle()}
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              onClick={handleCreate}
              color="primary"
              variant="contained"
            >
              CREATE NEW LOCATION
            </PrimaryButton>
            <PrimaryButton
              onClick={handleGoBack}
              color="secondary"
              variant="contained"
            >
              BACK
            </PrimaryButton>
          </ActionButtonsWrapper>
        }
      />
      <AppContentWrapper>
        <SearchBox />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Lat</TableCell>
                <TableCell align="left">Long</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.locations.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.lat}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.long}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)}>
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppContentWrapper>
    </div>
  )
}

export default LocationPage
