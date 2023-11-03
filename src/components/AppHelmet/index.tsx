import React from 'react'
import { Helmet } from 'react-helmet-async'

const AppHelmet = (): JSX.Element => {
  const titleTemplate = 'VROOMv'
  const defaultTitle = 'VROOMv'

  return (
    <Helmet
      titleTemplate={`%s - ${titleTemplate}`}
      defaultTitle={defaultTitle}
    />
  )
}

export default AppHelmet
