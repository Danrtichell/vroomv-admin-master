import userApi from 'api'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import VroomLogo from 'assets/images/vroomv.png'
import { Wrapper, FieldWrapper, FieldWrapperRight, ErrorWrapper } from './style'

interface State {
  showError: boolean
  username: string
  password: string
}

type InputFieldTypes = 'username' | 'password'

const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const api = userApi(dispatch)
  const history = useHistory()
  const [state, setState] = useState({
    showError: false,
    username: '',
    password: ''
  } as State)

  const handleTextChange = (field: InputFieldTypes) => (evt: any) =>
    setState({
      ...state,
      [field]: evt.target.value as string
    })

  const handleLogin = async () => {
    try {
      setState({ ...state, showError: false })

      await api.authenticate(state.username, state.password)

      history.push('/')
    } catch (error) {
      setState({ ...state, showError: true })
    }
  }

  const renderError = () => {
    if (state.showError) {
      return <ErrorWrapper>Invalid credentials</ErrorWrapper>
    }

    return null
  }

  return (
    <Wrapper>
      <div>
        <img alt="Logo" src={VroomLogo} />
      </div>
      {renderError()}
      <FieldWrapper>
        <TextField
          fullWidth
          onChange={handleTextChange('username')}
          value={state.username}
          id="username"
          label="Username"
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
          fullWidth
          onChange={handleTextChange('password')}
          value={state.password}
          type="password"
          id="passwd"
          label="Password"
        />
      </FieldWrapper>
      <FieldWrapperRight>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
      </FieldWrapperRight>
    </Wrapper>
  )
}

export default LoginPage
