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
import { Edit, DeleteForever } from '@material-ui/icons'
import passengerApi from 'api/passengers'
import SearchBox from 'components/SearchBox'
import { applyFilter } from 'utils/filtering'

const PassengersPage = () => {
  const history = useHistory()
  const [state, setState] = useState({
    drivers: []
  })
  const [search, setSearch] = useState('')

  const getData = async () => {
    const { data: drivers } = await passengerApi.getAll()

    setState({ drivers })
  }

  const handleEdit = (id: string) => {
    history.push(`/passengers/edit/${id}`)
  }

  const handleDelete = async (driver: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(
      `Are you sure you want to delete "${driver.firstName} ${driver.lastName}"?`
    )

    if (yes) {
      await passengerApi.delete(driver.id)
      getData()
    }
  }

  const handleCreate = () => {
    history.push('/passengers/create')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current="Passengers"
        primary="Home"
        leftAction={
          <PrimaryButton
            onClick={handleCreate}
            color="primary"
            variant="contained"
          >
            CREATE NEW PASSENGER
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
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Points</TableCell>
                <TableCell align="left">Contact Number</TableCell>
                <TableCell align="left">Pick-up/Drop-off Location</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applyFilter(state.drivers, search).map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {`${row.firstName} ${row.lastName}`}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.points}</TableCell>
                  <TableCell align="left">{row.contactNumber}</TableCell>
                  <TableCell align="left">
                    {row.location
                      ? `${row.location.zone.name} - ${row.location.name}`
                      : ''}
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

export default PassengersPage
