import React from 'react'
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
import { resolveDirection } from 'utils/booking'
import { Wrapper } from './selected-bookings.style'

interface Prop {
  bookings: any[]
}

const SelectedBookings = (prop: Prop) => {
  const { bookings } = prop

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Zone</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">Direction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking: any) => (
              <TableRow>
                <TableCell align="left">
                  {moment(booking.date).format('LLL')}
                </TableCell>
                <TableCell align="left">{booking.location.zone.name}</TableCell>
                <TableCell align="left">{booking.location.name}</TableCell>
                <TableCell align="left">
                  {resolveDirection(booking.direction)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default SelectedBookings
