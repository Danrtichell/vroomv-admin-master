import claimableApi from 'api/claimable'
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
    claimable: {
      name: '',
      description: '',
      image: '',
      count: 0,
      price: 0
    }
  })

  const toggleSaving = (saving: boolean) => {
    setState({ ...state, saving })
  }

  const handleSave = async () => {
    if (state.mode !== 'create') {
      toggleSaving(true)
      await claimableApi.update(urlParams.id, state.claimable)
      toggleSaving(false)
      alert('done saving')
    } else {
      toggleSaving(true)
      const { data: claimable } = await claimableApi.create(state.claimable)
      toggleSaving(false)

      history.push(`/claimables`)
    }
  }

  const handleChange = (field: string) => (evt: any) => {
    setState({
      ...state,
      claimable: {
        ...state.claimable,
        [field]: evt.target.value
      }
    })
  }

  const getTitle = () => {
    if (state.mode === 'create') {
      return 'Create Claimable'
    }

    return 'Edit Claimable'
  }

  const getData = async () => {
    const { data: claimable } = await claimableApi.getById(urlParams.id)

    setState((currentValue) => ({
      ...currentValue,
      mode: 'edit',
      claimable: {
        ...claimable
      }
    }))
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
              onClick={() => history.push('/claimables')}
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
              value={state.claimable.name}
              id="standard-basic"
              label="Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('description')}
              value={state.claimable.description}
              id="standard-basic"
              label="Description"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('price')}
              value={state.claimable.price}
              id="standard-basic"
              label="Price"
              type="number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('count')}
              value={state.claimable.count}
              id="standard-basic"
              label="Count"
              type="number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              onChange={handleChange('image')}
              value={state.claimable.image}
              id="standard-basic"
              label="Image"
            />
          </FieldWrapper>
        </FormWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default Page
