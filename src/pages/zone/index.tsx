import React, { ChangeEvent, useEffect, useState } from 'react'
import NavigationInfo from 'components/NavigationInfo'
import { AppContentWrapper, PrimaryButton } from 'components/shared/style'
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
import { Edit, DeleteForever, LocationCity } from '@material-ui/icons'
import zonesApi from 'api/zones'
import SearchBox from 'components/SearchBox'
import { applyFilter } from 'utils/filtering'

const ZonePage = () => {
  const history = useHistory()
  const [state, setState] = useState({
    zones: []
  })
  const [search, setSearch] = useState('')

  const getData = async () => {
    const { data: zones } = await zonesApi.getAll()

    setState({ zones })
  }

  const handleEdit = (zone: any) => {
    history.push(`/zones/edit/${zone.id}`, {
      name: zone.name
    })
  }

  const handleDelete = async (driver: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(
      `Are you sure you want to delete "${driver.firstName} ${driver.lastName}"?`
    )

    if (yes) {
      await zonesApi.delete(driver.id)
      getData()
    }
  }

  const handleViewLocations = (location: any) => {
    history.push(`/zones/${location.id}/locations`, location)
  }

  const handleCreate = () => {
    history.push('/zones/create')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current="Zones"
        primary="Home"
        leftAction={
          <PrimaryButton
            onClick={handleCreate}
            color="primary"
            variant="contained"
          >
            CREATE NEW ZONE
          </PrimaryButton>
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
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applyFilter(state.zones, search).map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewLocations(row)}>
                      <LocationCity />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(row)}>
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

export default ZonePage
