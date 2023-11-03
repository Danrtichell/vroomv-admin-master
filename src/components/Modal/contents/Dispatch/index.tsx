import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import bookingApi from 'api/booking'
import tripApi from 'api/trip'
import Context from 'context'
import { Button, Paper, Tabs, Tab } from '@material-ui/core'
import { ActionsWrapper, Heading, MessageWrapper, Wrapper } from './style'
import SelectedBookings from './SelectedBookings'
import TripList from './TripList'
import NewTrip from './NewTrip'

interface Prop {
  bookings: any[]
  onComplete?: () => void
}

const Dispatch = (prop: Prop) => {
  const { bookings, onComplete } = prop
  const [trips, setTrips] = useState([] as any[])
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null as null | string)
  const [isSaving, toggleSaving] = useState(false)
  const [tripSource, setTripSource] = useState(0)
  const { setModal } = useContext(Context)
  const bookingDate = bookings[0].date

  const cannotSave = () => {
    if (isSaving) {
      return true
    }

    if (tripSource === 0) {
      return selectedTrip === null
    }

    if (tripSource === 1) {
      return selectedVehicle === null
    }

    return false
  }

  const handleClose = () => {
    setModal('', null)
  }

  const handleSave = async () => {
    toggleSaving(true)
    let trip = selectedTrip

    if (tripSource === 1) {
      const {
        data: { entity }
      } = await tripApi.create({
        date: bookingDate,
        vehicle: selectedVehicle
      })

      trip = entity.id
    }

    const requests = bookings.map((booking: any) => {
      return bookingApi.update(booking.id, {
        ...booking,
        trip
      })
    })

    await Promise.all(requests)

    if (onComplete) {
      onComplete()
    }

    handleClose()
  }

  const getData = async () => {
    const { data: tripsData } = await tripApi.getPending(
      moment(bookingDate).utc().format('L'),
      bookings[0].direction
    )

    setTrips(tripsData)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper>
      {isSaving ? (
        <MessageWrapper>Saving, please wait...</MessageWrapper>
      ) : null}
      <Heading>You have selected the following bookings:</Heading>
      <SelectedBookings bookings={bookings} />
      <Paper>
        <Tabs
          value={tripSource}
          onChange={(evt: any, val: any) => setTripSource(val)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Existing Trip" color="primary" fullWidth />
          <Tab label="Create a New Trip" fullWidth />
        </Tabs>
      </Paper>
      {tripSource === 0 ? (
        <TripList
          selectedTrip={selectedTrip}
          setSelectedTrip={setSelectedTrip}
          isSaving={isSaving}
          trips={trips}
        />
      ) : (
        <NewTrip
          selectedVehicle={selectedVehicle}
          onVehicleSelected={(id: string) => setSelectedVehicle(id)}
        />
      )}
      <ActionsWrapper>
        <Button disabled={isSaving} onClick={handleClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={cannotSave()}
          color="primary"
          variant="contained"
        >
          Assign
        </Button>
      </ActionsWrapper>
    </Wrapper>
  )
}

export default Dispatch
