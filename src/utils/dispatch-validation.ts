import moment from 'moment'

export const validateSelectedBookings = (bookings: any[]) => {
  const sample = moment(bookings[0].date).format('LLL')
  let failed = false

  bookings.forEach((booking: any) => {
    const compare = moment(booking.date).format('LLL')

    if (!failed) {
      if (compare !== sample) {
        failed = true
      }
    }
  })

  return failed
}
