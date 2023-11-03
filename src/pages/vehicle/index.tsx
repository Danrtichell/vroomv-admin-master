import React, { ChangeEvent, useEffect, useState } from 'react'
import moment from 'moment'
import NavigationInfo from 'components/NavigationInfo'
import {
  AppContentWrapper,
  ActionButtonsWrapper,
  PrimaryButton
} from 'components/shared/style'
import { useHistory } from 'react-router-dom'
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
import { Edit, DeleteForever } from '@material-ui/icons'
import vehicleApi from 'api/vehicle'
import SearchBox from 'components/SearchBox'
import { applyFilter } from 'utils/filtering'
import { prettifyName } from 'utils/user'

const Page = () => {
  const history = useHistory()
  const [state, setState] = useState({
    vehicles: []
  })
  const [search, setSearch] = useState('')

  const getData = async () => {
    const { data: vehicles } = await vehicleApi.getAll()

    setState({ vehicles })
  }

  const handleEdit = (id: string) => {
    history.push(`/vehicles/edit/${id}`)
  }

  const handleDelete = async (vehicle: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(
      `Are you sure you want to delete "${vehicle.plateNumber}"?`
    )

    if (yes) {
      await vehicleApi.delete(vehicle.id)
      getData()
    }
  }

  const handleCreate = () => {
    history.push('/vehicles/create')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current="Vehicles"
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              onClick={handleCreate}
              color="primary"
              variant="contained"
            >
              CREATE NEW VEHICLE
            </PrimaryButton>
            <PrimaryButton
              onClick={() => history.push('/vehicles/map')}
              color="secondary"
              variant="contained"
            >
              VIEW MAP
            </PrimaryButton>
          </ActionButtonsWrapper>
        }
      />
      <AppContentWrapper>
        <SearchBox
          value={search}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setSearch(evt.target.value)
          }
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Van No.</TableCell>
                <TableCell align="left">Plate No.</TableCell>
                <TableCell align="left">Mileage</TableCell>
                <TableCell align="left">Latitude</TableCell>
                <TableCell align="left">Longitude</TableCell>
                <TableCell align="left">Last Updated Coordinates</TableCell>
                <TableCell align="left">Driver</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applyFilter(state.vehicles, search).map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.vanNumber}
                  </TableCell>
                  <TableCell scope="row">{row.plateNumber}</TableCell>
                  <TableCell align="left">{row.mileage}</TableCell>
                  <TableCell align="left">{row.lat}</TableCell>
                  <TableCell align="left">{row.lng}</TableCell>
                  <TableCell align="left">
                    {moment(new Date(row.lastUpdatedCoords)).format('LLL')}
                  </TableCell>
                  <TableCell align="left">
                    {row.driver ? prettifyName(row.driver) : ''}
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

export default Page
