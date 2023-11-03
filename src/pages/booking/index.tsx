import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import NavigationInfo from 'components/NavigationInfo'
import {
  AppContentWrapper,
  PrimaryButton,
  ActionButtonsWrapper
} from 'components/shared/style'
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
import { Edit, DeleteForever, Schedule } from '@material-ui/icons'
import bookingApi from 'api/booking'
import SearchBox from 'components/SearchBox'
import Context from 'context'
import DispatchModal from 'components/Modal/contents/Dispatch'
import { prettifyName } from 'utils/user'
import { resolveStatus } from 'utils/booking'
import { BookingDirection } from 'enums'
import { applyFilter } from 'utils/filtering'

const Page = () => {
  const history = useHistory()
  const context = useContext(Context)
  const [state, setState] = useState({
    bookings: []
  })
  const [search, setSearch] = useState('')

  const getData = async () => {
    const { data: bookings } = await bookingApi.getAll()

    setState({ bookings })
  }

  const handleEdit = (id: string) => {
    history.push(`/bookings/edit/${id}`)
  }

  const handleDelete = async (booking: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(
      `Are you sure you want to delete "${booking.plateNumber}"?`
    )

    if (yes) {
      await bookingApi.delete(booking.id)
      getData()
    }
  }

  const handleCreate = () => {
    history.push('/bookings/create')
  }

  const handleImportCsv = () => {
    history.push('/bookings-import')
  }

  const handleSetDispatch = (booking: any) => {
    context.setModal(
      'Assign to vehicle',
      <DispatchModal bookings={[booking.object]} />
    )
  }

  const getRowLocationName = (row: any) => {
    let locationName = ''

    if (row.location) {
      locationName = row.location.name
    }

    return locationName
  }

  const getPickup = (row: any) => {
    return row.direction === BookingDirection.OFFICE
      ? getRowLocationName(row)
      : 'Office'
  }

  const getDropOff = (row: any) => {
    return row.direction === BookingDirection.OFFICE
      ? 'Office'
      : getRowLocationName(row)
  }

  const getRows = () =>
    state.bookings.map((row: any) => ({
      id: row.id,
      date: moment(row.date).format('LLL'),
      passenger: prettifyName(row.passenger),
      pickUp: getPickup(row),
      dropOff: getDropOff(row),
      vanNumber: row.trip ? row.trip.vehicle.vanNumber : 'Unassigned',
      plateNumber: row.trip ? row.trip.vehicle.plateNumber : 'Unassigned',
      status: resolveStatus(row.status),
      object: row
    }))

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current="Bookings"
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              onClick={handleCreate}
              color="primary"
              variant="contained"
            >
              CREATE NEW BOOKING
            </PrimaryButton>
            <PrimaryButton
              onClick={handleImportCsv}
              color="secondary"
              variant="contained"
            >
              IMPORT CSV
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
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Passenger</TableCell>
                <TableCell align="left">Pick Up (From)</TableCell>
                <TableCell align="left">Drop-off (To)</TableCell>
                <TableCell align="left">Van Number</TableCell>
                <TableCell align="left">Plate Number</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applyFilter(getRows(), search).map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="left">{row.passenger}</TableCell>
                  <TableCell align="left">{row.pickUp}</TableCell>
                  <TableCell align="left">{row.dropOff}</TableCell>
                  {/* <TableCell align="left">{row.location.name}</TableCell> */}
                  <TableCell align="left">{row.vanNumber}</TableCell>
                  <TableCell align="left">{row.plateNumber}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleSetDispatch(row)}>
                      <Schedule />
                    </IconButton>
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
