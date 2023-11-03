import React from 'react'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox
} from '@material-ui/core'
import { prettifyName } from 'utils/user'
import { resolveDirection } from 'utils/booking'
import { Wrapper, ContentWrapper } from './booking.style'

interface Props {
  bookings: any[]
  selectedBookings: string[]
  onSelectedRowsChanged: (rows: string[]) => void
}

const BookingList = (props: Props) => {
  const { bookings, onSelectedRowsChanged, selectedBookings } = props

  const handlePrimaryCheckboxChanged = (evt: any, value: any) => {
    if (value) {
      onSelectedRowsChanged(bookings)
    } else {
      onSelectedRowsChanged([])
    }
  }

  const handleBookingCheckbox = (booking: any) => (evt: any, value: any) => {
    if (value) {
      onSelectedRowsChanged([...selectedBookings, booking])
    } else {
      onSelectedRowsChanged(
        selectedBookings.filter((it: any) => it.id !== booking.id)
      )
    }
  }

  const isChecked = (id: string): boolean => {
    return (
      selectedBookings.find((booking: any) => booking.id === id) !== undefined
    )
  }

  const isEverythingChecked = () => {
    return bookings.length === selectedBookings.length
  }

  return (
    <Wrapper>
      <h3>Bookings for zone</h3>
      <ContentWrapper>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={isEverythingChecked()}
                  onChange={handlePrimaryCheckboxChanged}
                />
              </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Zone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Direction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox
                    onChange={handleBookingCheckbox(row)}
                    checked={isChecked(row.id)}
                  />
                </TableCell>
                <TableCell>{moment(row.date).format('LLL')}</TableCell>
                <TableCell>{prettifyName(row.passenger)}</TableCell>
                <TableCell>{row.location.zone.name}</TableCell>
                <TableCell>{row.location.name}</TableCell>
                <TableCell>{resolveDirection(row.direction)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContentWrapper>
    </Wrapper>
  )
}

export default BookingList
