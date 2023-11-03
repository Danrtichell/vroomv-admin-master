import React from 'react'
import NavigationInfo from 'components/NavigationInfo'
import { AppContentWrapper } from 'components/shared/style'

const DashboardPage = () => {
  return (
    <div>
      <NavigationInfo backLink="/" current="Dashboard" primary="" />
      <AppContentWrapper>Coming soon...</AppContentWrapper>
    </div>
  )
}

export default DashboardPage
