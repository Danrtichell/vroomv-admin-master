import React from 'react'
import moment from 'moment'
import { getLastBookingDate, resolveDirection } from 'utils/booking'
import {
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  Radio
} from '@material-ui/core'
import { PaperContainer } from './triplist.style'
import TripBookings from './TripBookings'

interface Prop {
  trips: any
  setSelectedTrip: any
  selectedTrip: any
  isSaving: any
}

const TripList = (prop: Prop) => {
  const { trips, setSelectedTrip, selectedTrip, isSaving } = prop

  const getRows = () =>
    trips.map((trip: any) => ({
      id: trip.id,
      plateNumber: trip.vehicle.plateNumber,
      vanNumber: trip.vehicle.vanNumber,
      bookingDate: moment(trip.bookings[0].date).format('LLL'),
      lastBookingDate: moment(getLastBookingDate(trip.bookings)).format('LLL'),
      object: trip
    }))

  return (
    <PaperContainer>
      <TableContainer className="table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Plate Number</TableCell>
              <TableCell>Van No.</TableCell>
              <TableCell>Earliest Pick-up</TableCell>
              <TableCell>Latest Pick-up</TableCell>
              <TableCell>Bookings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows().map((row: any) => (
              <TableRow
                hover
                role="checkbox"
                aria-checked={row.id === selectedTrip}
                selected={row.id === selectedTrip}
                key={row.id}
                onClick={() => setSelectedTrip(row.id)}
              >
                <TableCell>
                  <Radio
                    checked={row.id === selectedTrip}
                    onChange={(evt: any) => setSelectedTrip(evt.target.value)}
                    value={row.id}
                  />
                </TableCell>
                <TableCell>{row.plateNumber}</TableCell>
                <TableCell>{row.vanNumber}</TableCell>
                <TableCell>{row.bookingDate}</TableCell>
                <TableCell>{row.lastBookingDate}</TableCell>
                <TableCell>
                  <TripBookings bookings={row.object.bookings} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperContainer>
  )
}

export default TripList
