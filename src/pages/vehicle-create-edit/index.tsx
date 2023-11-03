import vehicleApi from 'api/vehicle'
import driverApi from 'api/drivers'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { DefaultUrlParams } from 'types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
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
    vehicle: {
      vanNumber: '',
      plateNumber: '',
      mileage: '',
      lat: 0,
      lng: 0,
      driver: ' '
    },
    drivers: []
  })

  const toggleSaving = (saving: boolean) => {
    setState({ ...state, saving })
  }

  const handleSave = async () => {
    if (state.mode !== 'create') {
      toggleSaving(true)
      await vehicleApi.update(urlParams.id, state.vehicle)
      toggleSaving(false)
      alert('done saving')
    } else {
      toggleSaving(true)
      const { data: vehicle } = await vehicleApi.create(state.vehicle)
      toggleSaving(false)

      history.push(`/vehicles`)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      vehicle: {
        ...state.vehicle,
        [field]: evt.target.value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Vehicle'
    }

    return 'Edit Vehicle'
  }

  const getData = async () => {
    const { data: vehicle } = await vehicleApi.getById(urlParams.id)
    const { driver } = vehicle

    setState((currentValue) => ({
      ...currentValue,
      mode: 'edit',
      vehicle: {
        ...vehicle,
        driver: driver ? driver.id : ' '
      }
    }))
  }

  const getDrivers = async () => {
    const { data: drivers } = await driverApi.getAll()

    setState((currentValue) => ({
      ...currentValue,
      drivers
    }))
  }

  useEffect(() => {
    if (urlParams.id) {
      getData()
    }

    getDrivers()
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
              onClick={() => history.push('/vehicles')}
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
              onChange={handleChange('vanNumber')}
              value={state.vehicle.vanNumber}
              id="standard-basic"
              label="Van Number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('plateNumber')}
              value={state.vehicle.plateNumber}
              id="standard-basic"
              label="Plate Number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('mileage')}
              value={state.vehicle.mileage}
              id="standard-basic"
              label="Mileage"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('lat')}
              value={state.vehicle.lat}
              type="number"
              id="standard-basic"
              label="Latitude"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('lng')}
              value={state.vehicle.lng}
              type="number"
              id="standard-basic"
              label="Longitude"
            />
          </FieldWrapper>
          <FieldWrapper>
            <FormControl>
              <InputLabel id="driver">Driver</InputLabel>
              <Select
                onChange={handleChange('driver')}
                value={state.vehicle.driver}
                labelId="driver"
              >
                {state.drivers.map((driver: any) => (
                  <MenuItem value={driver.id}>{prettifyName(driver)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default Page
