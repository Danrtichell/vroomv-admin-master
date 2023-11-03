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
import { DriverStatus } from 'enums'
import { mapDriverStatus } from 'utils/user'
import { FieldWrapper, FormWrapper } from './style'

const DriverCreateEditPage = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [state, setState] = useState({
    mode: 'create',
    driver: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      licenseNumber: '',
      contactNumber: '',
      address: '',
      hireDate: new Date(),
      licenseExpiry: new Date(),
      emergencyContactName: '',
      emergencyContactNumber: '',
      status: 1
    }
  })

  const handleSave = async () => {
    if (state.mode !== 'create') {
      await driverApi.update(urlParams.id, state.driver)
      alert('done saving')
    } else {
      const { data: driver } = await driverApi.create(state.driver)

      history.push(`/drivers`)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      driver: {
        ...state.driver,
        [field]: evt.target.value
      }
    })
  }

  const handleDateChange = (field: string) => (value: any) => {
    setState({
      ...state,
      driver: {
        ...state.driver,
        [field]: value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Driver'
    }

    return 'Edit Driver'
  }

  const getData = async () => {
    const { data: driver } = await driverApi.getById(urlParams.id)

    setState({
      ...state,
      mode: 'edit',
      driver
    })
  }

  useEffect(() => {
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
              onClick={() => history.push('/drivers')}
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
              value={state.driver.firstName}
              id="standard-basic"
              label="First Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('lastName')}
              value={state.driver.lastName}
              id="standard-basic"
              label="Last Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              disabled={state.mode !== 'create'}
              onChange={handleChange('email')}
              value={state.driver.email}
              id="standard-basic"
              label="Email"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              type="password"
              disabled={state.mode !== 'create'}
              onChange={handleChange('password')}
              value={state.driver.password}
              id="standard-basic"
              label="Password"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('licenseNumber')}
              value={state.driver.licenseNumber}
              id="standard-basic"
              label="License Number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="license-expiry"
                label="License Expiry"
                value={state.driver.licenseExpiry}
                onChange={handleDateChange('licenseExpiry')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('contactNumber')}
              value={state.driver.contactNumber}
              id="standard-basic"
              label="Contact Number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="hire-date"
                label="Hire Date"
                value={state.driver.hireDate}
                onChange={handleDateChange('hireDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('address')}
              value={state.driver.address}
              id="standard-basic"
              label="Address"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('emergencyContactName')}
              value={state.driver.emergencyContactName}
              id="contact-name"
              label="Emergency Contact Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('emergencyContactNumber')}
              value={state.driver.emergencyContactNumber}
              id="contact-name"
              label="Emergency Contact Number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <FormControl>
              <InputLabel id="status">Status</InputLabel>
              <Select
                onChange={handleChange('status')}
                value={state.driver.status}
                labelId="status"
              >
                {Object.keys(DriverStatus)
                  .filter((val: string) => /\d/.test(val))
                  .map((val: string) => (
                    <MenuItem value={val}>
                      {mapDriverStatus(parseInt(val, 10))}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default DriverCreateEditPage
