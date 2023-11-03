import passengerApi from 'api/passengers'
import zonesApi from 'api/zones'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { DefaultUrlParams } from 'types'
import {
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core'
import {
  ActionButtonsWrapper,
  AppContentWrapper,
  PrimaryButton
} from 'components/shared/style'
import NavigationInfo from 'components/NavigationInfo'
import { FieldWrapper, FormWrapper } from './style'

const PassengerCreateEditPage = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [state, setState] = useState({
    mode: 'create',
    zones: [],
    locations: [],
    zone: ' ',
    passenger: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      password: '',
      location: ' ',
      points: 0
    }
  })

  const handleSave = async () => {
    if (state.mode !== 'create') {
      await passengerApi.update(urlParams.id, state.passenger)
      alert('done saving')
    } else {
      const { data: passenger } = await passengerApi.create(state.passenger)

      history.push(`/passengers`)
    }
  }

  const handleZoneChanged = (field: string) => async (evt: any) => {
    const { data: locations } = await zonesApi.getLocationsByZoneId(
      evt.target.value
    )

    setState({
      ...state,
      [field]: evt.target.value,
      locations
    })
  }
  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      passenger: {
        ...state.passenger,
        [field]: evt.target.value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Passenger'
    }

    return 'Edit Passenger'
  }

  const getData = async () => {
    const { data: passenger } = await passengerApi.getById(urlParams.id)
    const { data: zones } = await zonesApi.getAll()
    const { location } = passenger
    let locations = []

    if (location) {
      const { data: locationValues } = await zonesApi.getLocationsByZoneId(
        location.zone.id
      )

      locations = locationValues
    }

    setState({
      ...state,
      mode: 'edit',
      zones,
      locations,
      zone: location ? location.zone.id : ' ',
      passenger: {
        ...passenger,
        location: location ? location.id : ' '
      }
    })
  }

  const getDataForCreate = async () => {
    const { data: zones } = await zonesApi.getAll()

    setState({
      ...state,
      mode: 'create',
      zones
    })
  }

  useEffect(() => {
    if (urlParams.id) {
      getData()
    } else {
      getDataForCreate()
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
              onClick={() => history.push('/passengers')}
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
            <TextField
              fullWidth
              onChange={handleChange('firstName')}
              value={state.passenger.firstName}
              id="standard-basic"
              label="First Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('lastName')}
              value={state.passenger.lastName}
              id="standard-basic"
              label="Last Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('email')}
              value={state.passenger.email}
              id="standard-basic"
              label="Email"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('points')}
              value={state.passenger.points}
              id="standard-basic"
              label="Rewards Points"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('contactNumber')}
              value={state.passenger.contactNumber}
              id="standard-basic"
              label="Contact Number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              type="password"
              disabled={state.mode !== 'create'}
              onChange={handleChange('password')}
              value={state.passenger.password}
              id="standard-basic"
              label="Password"
            />
          </FieldWrapper>
          <FieldWrapper>
            <FormControl>
              <InputLabel id="zone">Zone</InputLabel>
              <Select
                onChange={handleZoneChanged('zone')}
                value={state.zone}
                labelId="zone"
              >
                {state.zones.map((zone: any) => (
                  <MenuItem value={zone.id}>{zone.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FieldWrapper>
          <FieldWrapper>
            <FormControl>
              <InputLabel id="location">Location</InputLabel>
              <Select
                onChange={handleChange('location')}
                value={state.passenger.location}
                labelId="location"
              >
                {state.locations.map((location: any) => (
                  <MenuItem value={location.id}>{location.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default PassengerCreateEditPage
