import React from 'react'
import { Helmet } from 'react-helmet-async'
import AppHelmet from '../../AppHelmet'
import { AuthLayoutWrapper, Container } from './style'

type Props = {
  title: string
  children: JSX.Element
}

const AuthLayout = ({ title, children }: Props): JSX.Element => {
  return (
    <AuthLayoutWrapper>
      <AppHelmet />
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>{children}</Container>
    </AuthLayoutWrapper>
  )
}

export default AuthLayout
