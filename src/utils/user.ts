import { DriverStatus } from 'enums'

export const prettifyName = (user: any) => {
  if (!user || !user.firstName) {
    return ''
  }

  return `${user.firstName} ${user.lastName}`
}

export const mapDriverStatus = (status: number) => {
  switch (status) {
    case DriverStatus.OnDuty:
      return 'On Duty'
    case DriverStatus.OffDuty:
      return 'Off Duty'
    case DriverStatus.IndefiniteLeave:
      return 'Indefinite Leave'
    case DriverStatus.Terminated:
      return 'Terminated'
    default:
      return 'Unknown'
  }
}
