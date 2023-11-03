import React from 'react'
import AppNav from 'components/AppNav'
import { Container } from '@material-ui/core'
import { Helmet } from 'react-helmet-async'
import AppFooter from 'components/AppFooter'
import AppDrawer from 'components/AppDrawer'
import AppHelmet from 'components/AppHelmet'
import Modal from 'components/Modal'
import GlobalState from 'context/GlobalState'
import { useStyles, DashboardLayoutWrapper, AppContent } from './style'

type Props = {
  title: string
  children: JSX.Element
}

const DashboardLayout = ({ title, children }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <GlobalState>
      <DashboardLayoutWrapper>
        <Modal />
        <AppHelmet />
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <AppNav />
        <Container className={classes.container}>
          <AppDrawer />
          <AppContent>{children}</AppContent>
        </Container>
        <AppFooter />
      </DashboardLayoutWrapper>
    </GlobalState>
  )
}

export default DashboardLayout
