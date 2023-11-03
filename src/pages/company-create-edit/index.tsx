import companyApi from 'api/company'
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

const CompanyCreateEditPage = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [state, setState] = useState({
    mode: 'create',
    company: {
      name: '',
      address: ''
    }
  })

  const handleSave = async () => {
    if (state.mode !== 'create') {
      await companyApi.update(urlParams.id, state.company)
      alert('done saving')
    } else {
      await companyApi.create(state.company)

      history.push(`/company`)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      company: {
        ...state.company,
        [field]: evt.target.value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Company'
    }

    return 'Edit Company'
  }

  const getData = async () => {
    const { data: company } = await companyApi.getById(urlParams.id)

    setState({
      ...state,
      mode: 'edit',
      company
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
              onClick={() => history.push('/company')}
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
              value={state.company.name}
              id="standard-basic"
              label="Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('address')}
              value={state.company.address}
              id="standard-basic"
              label="Address"
            />
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default CompanyCreateEditPage
