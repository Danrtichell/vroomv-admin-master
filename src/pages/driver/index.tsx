import React, { ChangeEvent, useEffect, useState } from 'react'
import NavigationInfo from 'components/NavigationInfo'
import { AppContentWrapper, PrimaryButton } from 'components/shared/style'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
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
import driverApi from 'api/drivers'
import SearchBox from 'components/SearchBox'
import { mapDriverStatus } from 'utils/user'
import { applyFilter } from 'utils/filtering'

const DriverPage = () => {
  const history = useHistory()
  const [state, setState] = useState({
    drivers: []
  })
  const [search, setSearch] = useState('')

  const getData = async () => {
    const { data: drivers } = await driverApi.getAll()

    setState({ drivers })
  }

  const handleEdit = (id: string) => {
    history.push(`/drivers/edit/${id}`)
  }

  const handleDelete = async (driver: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(
      `Are you sure you want to delete "${driver.firstName} ${driver.lastName}"?`
    )

    if (yes) {
      await driverApi.delete(driver.id)
      getData()
    }
  }

  const handleCreate = () => {
    history.push('/drivers/create')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current="Drivers"
        primary="Home"
        leftAction={
          <PrimaryButton
            onClick={handleCreate}
            color="primary"
            variant="contained"
          >
            CREATE NEW DRIVER
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
                <TableCell align="left">Hire Date</TableCell>
                <TableCell align="left">License Number</TableCell>
                <TableCell align="left">License Expiry</TableCell>
                <TableCell align="left">Contact Number</TableCell>
                <TableCell align="left">Emergency Contact Name</TableCell>
                <TableCell align="left">Emergency Contact Number</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applyFilter(state.drivers, search).map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {`${row.firstName} ${row.lastName}`}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row.hireDate).format('L')}
                  </TableCell>
                  <TableCell align="left">{row.licenseNumber}</TableCell>
                  <TableCell align="left">
                    {moment(row.licenseExpiry).format('L')}
                  </TableCell>
                  <TableCell align="left">{row.contactNumber}</TableCell>
                  <TableCell align="left">{row.emergencyContactName}</TableCell>
                  <TableCell align="left">
                    {row.emergencyContactNumber}
                  </TableCell>
                  <TableCell align="left">
                    {mapDriverStatus(row.status)}
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

export default DriverPage
