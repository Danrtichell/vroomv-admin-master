import eligibleEmployeeApi from 'api/eligibleEmployee'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CompanyUrlParams } from 'types'
import { TextField } from '@material-ui/core'
import {
  ActionButtonsWrapper,
  AppContentWrapper,
  PrimaryButton
} from 'components/shared/style'
import NavigationInfo from 'components/NavigationInfo'
import { FieldWrapper, FormWrapper } from './style'

const EligibleEmployeeCreateEditPage = () => {
  const history = useHistory()
  const urlParams: CompanyUrlParams = useParams()
  const eligibleEmployeeUrl = `/company/${urlParams.id}/eligible-employee`
  const [state, setState] = useState({
    mode: 'create',
    saving: false,
    eligibleEmployee: {
      email: '',
      company: urlParams.id
    }
  })

  const toggleSaving = (saving: boolean) => {
    setState({ ...state, saving })
  }

  const handleSave = async () => {
    if (state.mode !== 'create') {
      toggleSaving(true)
      await eligibleEmployeeApi.update(
        urlParams.eligibleEmployeeId,
        state.eligibleEmployee
      )
      toggleSaving(false)
      alert('done saving')
    } else {
      toggleSaving(true)
      await eligibleEmployeeApi.create(state.eligibleEmployee)
      toggleSaving(false)

      history.push(eligibleEmployeeUrl)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      eligibleEmployee: {
        ...state.eligibleEmployee,
        [field]: evt.target.value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Eligible Employee'
    }

    return 'Edit Eligible Employee'
  }

  const getData = async () => {
    const { data: eligibleEmployeeData } = await eligibleEmployeeApi.getById(
      urlParams.eligibleEmployeeId
    )

    setState({
      ...state,
      mode: 'edit',
      eligibleEmployee: eligibleEmployeeData
    })
  }

  useEffect(() => {
    if (urlParams.eligibleEmployeeId) {
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
              onClick={() => history.push(eligibleEmployeeUrl)}
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
              onChange={handleChange('email')}
              value={state.eligibleEmployee.email}
              id="standard-basic"
              label="Email"
            />
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default EligibleEmployeeCreateEditPage
