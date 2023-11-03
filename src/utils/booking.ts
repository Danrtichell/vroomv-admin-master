import { BookingDirection } from 'enums'

export const resolveStatus = (status: number) => {
  let result = ''

  switch (status) {
    case 2:
      result = 'Cancelled'
      break
    case 3:
      result = 'In Transit'
      break
    case 4:
      result = 'Complete'
      break
    default:
      result = 'Pending'
  }

  return result
}

export const resolveDirection = (direction: number) => {
  if (direction === 2) {
    return 'Home'
  }

  return 'Office'
}

export const resolveDirectionStr = (direction: string) => {
  if (direction === 'home') {
    return BookingDirection.HOME
  }

  return BookingDirection.OFFICE
}

export const getLastBookingDate = (bookings: any[]) => {
  const last = bookings.length - 1

  return bookings[last].date
}
