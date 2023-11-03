import locationsApi from 'api/locations'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { DefaultUrlParams, ZoneUrlParams } from 'types'
import { TextField } from '@material-ui/core'
import {
  ActionButtonsWrapper,
  AppContentWrapper,
  PrimaryButton
} from 'components/shared/style'
import NavigationInfo from 'components/NavigationInfo'
import { FieldWrapper, FormWrapper } from './style'

const LocationCreateEditPage = () => {
  const history = useHistory()
  const urlParams: ZoneUrlParams = useParams()
  const locationsUrl = `/zones/${urlParams.id}/locations`
  const [state, setState] = useState({
    mode: 'create',
    saving: false,
    location: {
      name: '',
      lat: 0,
      long: 0,
      zone: urlParams.id
    }
  })

  const toggleSaving = (saving: boolean) => {
    setState({ ...state, saving })
  }

  const handleSave = async () => {
    if (state.mode !== 'create') {
      toggleSaving(true)
      await locationsApi.update(urlParams.locationId, state.location)
      toggleSaving(false)
      alert('done saving')
    } else {
      toggleSaving(true)
      await locationsApi.create(state.location)
      toggleSaving(false)

      history.push(locationsUrl)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      location: {
        ...state.location,
        [field]: evt.target.value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Location'
    }

    return 'Edit Location'
  }

  const getData = async () => {
    const { data: location } = await locationsApi.getById(urlParams.locationId)

    setState({
      ...state,
      mode: 'edit',
      location
    })
  }

  useEffect(() => {
    if (urlParams.locationId) {
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
              onClick={() => history.push(locationsUrl)}
              color="secondary"
              variant="contained"
            >
              CANCEL
            </PrimaryButton>
            <PrimaryButton
              onClick={handleSave}
              color="primary"
              variant="contained"
              disabled={state.saving}
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
              onChange={handleChange('name')}
              value={state.location.name}
              id="standard-basic"
              label="Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('lat')}
              value={state.location.lat}
              id="standard-basic"
              label="Latitude"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('long')}
              value={state.location.long}
              id="standard-basic"
              label="Longitude"
            />
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default LocationCreateEditPage
