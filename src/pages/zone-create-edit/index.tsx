import zonesApi from 'api/zones'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { DefaultUrlParams } from 'types'
import { TextField } from '@material-ui/core'
import {
  ActionButtonsWrapper,
  AppContentWrapper,
  PrimaryButton
} from 'components/shared/style'
import NavigationInfo from 'components/NavigationInfo'
import { FieldWrapper, FormWrapper } from './style'

const ZoneCreateEditPage = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [state, setState] = useState({
    mode: 'create',
    zone: {
      name: ''
    }
  })

  const handleSave = async () => {
    if (state.mode !== 'create') {
      await zonesApi.update(urlParams.id, state.zone)
      alert('done saving')
    } else {
      await zonesApi.create(state.zone)

      history.push(`/zones`)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      zone: {
        ...state.zone,
        [field]: evt.target.value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Zone'
    }

    return 'Edit Zone'
  }

  const getData = async () => {
    const { data: zone } = await zonesApi.getById(urlParams.id)

    setState({
      ...state,
      mode: 'edit',
      zone
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
              onClick={() => history.push('/zones')}
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
              onChange={handleChange('name')}
              value={state.zone.name}
              id="standard-basic"
              label="Name"
            />
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default ZoneCreateEditPage
