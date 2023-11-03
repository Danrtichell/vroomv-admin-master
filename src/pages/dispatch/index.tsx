import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import NavigationInfo from 'components/NavigationInfo'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core'
import zonesApi from 'api/zones'
import bookingsApi from 'api/booking'
import {
  ActionButtonsWrapper,
  FlexWrapper,
  PrimaryButton,
  PaperFlexWrapper,
  AppContentWrapper
} from 'components/shared/style'
import DispatchModal from 'components/Modal/contents/Dispatch'
import Context from 'context'
import { resolveDirectionStr } from 'utils/booking'
import { validateSelectedBookings } from 'utils/dispatch-validation'
import { trimTime } from 'utils/filtering'
import ZoneList from './ZoneList'
import BookingList from './BookingList'
import { EmptyBooking, IndefiniteProgress, Wrapper } from './style'

const DispatchPage = () => {
  const context = useContext(Context)
  const [isLoading, toggleLoading] = useState(false)
  const [zones, setZones] = useState([] as any[])
  const [direction, setDirection] = useState('home')
  const [activeZone, setActiveZone] = useState('')
  const [bookings, setBookings] = useState([])
  const [dateFilter, setDateFilter] = useState(new Date())
  const [selectedBookings, setSelectedBookings] = useState([] as string[])

  const getZones = async (date: Date, selectedDirection: string) => {
    toggleLoading(true)

    const { data } = await zonesApi.getAllWithBookingCount(
      date.toISOString(),
      resolveDirectionStr(selectedDirection)
    )

    setZones(data)
    toggleLoading(false)

    return data
  }

  const getBookings = async (
    locationId: string,
    date: Date,
    selectedDirection: string
  ) => {
    toggleLoading(true)
    setBookings([])

    const { data } = await bookingsApi.getPending(
      locationId,
      date.toISOString(),
      resolveDirectionStr(selectedDirection)
    )

    setBookings(data)
    toggleLoading(false)
  }

  const handleSelectedBookings = (bookingIds: string[]) => {
    setSelectedBookings(bookingIds)
  }

  const handleAssignmentComplete = () => {
    const convertedDate = trimTime(new Date(dateFilter))
    getZones(convertedDate, direction)
    getBookings(activeZone, convertedDate, direction)
  }

  const handleShowAssignModal = () => {
    const validationFailed = validateSelectedBookings(selectedBookings)

    if (validationFailed) {
      alert('Please select bookings with the same schedule.')
    } else {
      context.setModal(
        'Assign to vehicle',
        <DispatchModal
          onComplete={handleAssignmentComplete}
          bookings={selectedBookings}
        />
      )
    }
  }

  const handleZoneChange = (locationId: string) => {
    const convertedDate = trimTime(new Date(dateFilter))
    setActiveZone(locationId)
    getBookings(locationId, convertedDate, direction)
  }

  const handleDateChanged = async (date: any) => {
    const convertedDate = trimTime(new Date(date))
    setDateFilter(date)
    const zoneData = await getZones(convertedDate, direction)

    if (zoneData && zoneData.length) {
      getBookings(zoneData[0].id, convertedDate, direction)
    }
  }

  const handleDirectionChanged = async (evt: any) => {
    const selectedDirection = evt.target.value

    setDirection(selectedDirection)
    const convertedDate = trimTime(new Date(dateFilter))
    const zoneData = await getZones(convertedDate, selectedDirection)

    if (zoneData && zoneData.length) {
      getBookings(zoneData[0].id, convertedDate, selectedDirection)
    }
  }

  useEffect(() => {
    const convertedDate = trimTime(new Date(dateFilter))
    getZones(convertedDate, direction)
  }, [])

  useEffect(() => {
    if (activeZone === '' && zones.length) {
      handleZoneChange(zones[0].id)
    }
  }, [zones])

  return (
    <Wrapper>
      <NavigationInfo
        backLink="/"
        current="Dispatch"
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              disabled={selectedBookings.length <= 0}
              color="secondary"
              variant="contained"
              onClick={handleShowAssignModal}
            >
              ASSIGN
            </PrimaryButton>
          </ActionButtonsWrapper>
        }
      />
      <AppContentWrapper>
        <PaperFlexWrapper>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth={false}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select Day"
              value={dateFilter}
              onChange={handleDateChanged}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl className="direction-filter" component="fieldset">
            <FormLabel component="legend">Destination</FormLabel>
            <RadioGroup
              aria-label="direction"
              name="direction-input"
              value={direction}
              onChange={handleDirectionChanged}
            >
              <FormControlLabel value="home" control={<Radio />} label="Home" />
              <FormControlLabel
                value="office"
                control={<Radio />}
                label="Office"
              />
            </RadioGroup>
          </FormControl>
          {isLoading ? <IndefiniteProgress /> : null}
        </PaperFlexWrapper>
        {zones.length ? (
          <FlexWrapper>
            <ZoneList
              onActiveZoneChanged={handleZoneChange}
              activeZone={activeZone}
              zones={zones}
            />
            <BookingList
              selectedBookings={selectedBookings}
              onSelectedRowsChanged={handleSelectedBookings}
              bookings={bookings}
            />
          </FlexWrapper>
        ) : (
          <EmptyBooking>No bookings on the specified day</EmptyBooking>
        )}
      </AppContentWrapper>
    </Wrapper>
  )
}

export default DispatchPage
