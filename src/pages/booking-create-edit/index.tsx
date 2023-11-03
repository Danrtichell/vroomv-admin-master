import bookingApi from 'api/booking'
import locationApi from 'api/locations'
import passengerApi from 'api/passengers'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { DefaultUrlParams } from 'types'
import { TextField, Select } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
import {
  ActionButtonsWrapper,
  AppContentWrapper,
  PrimaryButton
} from 'components/shared/style'
import NavigationInfo from 'components/NavigationInfo'
import { prettifyName } from 'utils/user'
import { FieldWrapper, FormWrapper } from './style'

const Page = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [state, setState] = useState({
    mode: 'create',
    saving: false,
    locations: [],
    passengers: [],
    booking: {
      location: {
        id: null
      },
      passenger: {
        id: null
      },
      date: new Date(),
      direction: 1,
      status: 1
    }
  })

  const toggleSaving = (saving: boolean) => {
    setState({ ...state, saving })
  }

  const handleSave = async () => {
    if (state.mode !== 'create') {
      toggleSaving(true)
      await bookingApi.update(urlParams.id, state.booking)
      toggleSaving(false)
      alert('done saving')
    } else {
      toggleSaving(true)
      const { data: vehicle } = await bookingApi.create(state.booking)
      toggleSaving(false)

      history.push(`/bookings`)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      booking: {
        ...state.booking,
        [field]: field !== 'date' ? evt.target.value : evt
      }
    })
  }

  const handleAutocompleteChange = (field: string) => (evt: any, val: any) => {
    setState({
      ...state,
      booking: {
        ...state.booking,
        [field]: val
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Booking'
    }

    return 'Edit Booking'
  }

  const getOptionLabel = (data: any) => {
    return data.name ? data.name : ''
  }

  const getData = async () => {
    const { data: booking } = await bookingApi.getById(urlParams.id)
    const { data: locations } = await locationApi.getAll()
    const { data: passengers } = await passengerApi.getAll()

    setState({
      ...state,
      mode: 'edit',
      booking,
      locations,
      passengers
    })
  }

  const getDataForCreate = async () => {
    const { data: locations } = await locationApi.getAll()
    const { data: passengers } = await passengerApi.getAll()

    setState({
      ...state,
      locations,
      passengers
    })
  }

  useEffect(() => {
    getDataForCreate()

    if (urlParams.id) {
      getData()
    }
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current={getTitle()}
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              onClick={() => history.push('/bookings')}
              color="secondary"
              variant="contained"
            >
              CANCEL
            </PrimaryButton>
            <PrimaryButton
              onClick={handleSave}
              color="primary"
              variant="contained"
            >
              SAVE
            </PrimaryButton>
          </ActionButtonsWrapper>
        }
      />
      <AppContentWrapper>
        <FormWrapper>
          <FieldWrapper>
            <Autocomplete
              id="passenger-autocomplete"
              disabled={state.mode === 'edit'}
              value={state.booking.passenger}
              onChange={handleAutocompleteChange('passenger')}
              options={state.passengers}
              getOptionLabel={prettifyName}
              style={{ width: 300 }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Search passenger"
                  variant="outlined"
                />
              )}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Autocomplete
              id="locations-autocomplete"
              value={state.booking.location}
              onChange={handleAutocompleteChange('location')}
              options={state.locations}
              getOptionLabel={getOptionLabel}
              style={{ width: 300 }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Search location"
                  variant="outlined"
                />
              )}
            />
          </FieldWrapper>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FieldWrapper>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="MM/dd/yyyy"
                value={state.booking.date}
                onChange={handleChange('date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </FieldWrapper>
            <FieldWrapper>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time"
                value={state.booking.date}
                onChange={handleChange('date')}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </FieldWrapper>
          </MuiPickersUtilsProvider>
          <FieldWrapper>
            <Select
              native
              value={state.booking.direction}
              onChange={handleChange('direction')}
              inputProps={{
                name: 'direction',
                id: 'direction-dropdown'
              }}
            >
              <option value={1}>Office</option>
              <option value={2}>Home</option>
            </Select>
          </FieldWrapper>
          <FieldWrapper>
            <Select
              native
              value={state.booking.status}
              onChange={handleChange('status')}
              inputProps={{
                name: 'status',
                id: 'status-dropdown'
              }}
            >
              <option value={1}>Pending</option>
              <option value={2}>Cancelled</option>
              <option value={3}>In Transit</option>
              <option value={4}>Complete</option>
            </Select>
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default Page
