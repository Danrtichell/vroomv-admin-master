import React from 'react'
import { resolveDirection } from 'utils/booking'
import moment from 'moment'
import { TableContainer } from 'components/shared/style'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

interface Prop {
  bookings: any[]
}

const TripBookings = (prop: Prop) => {
  const { bookings } = prop

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Zone</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {moment(row.date).format('LLL')}
              </TableCell>
              <TableCell align="right">{row.location.zone.name}</TableCell>
              <TableCell align="right">{row.location.name}</TableCell>
              <TableCell align="right">{`(${resolveDirection(
                row.direction
              )})`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TripBookings
