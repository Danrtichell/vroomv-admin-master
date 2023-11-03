import React from 'react'

import NotFoundStyleWrapper from './style'

const NotFound = (): JSX.Element => {
  return (
    <NotFoundStyleWrapper>
      <h1>404</h1>
      <h3>Looks like you got lost</h3>
      <p>The page you are looking for doesn't exist or has been moved.</p>
    </NotFoundStyleWrapper>
  )
}

export default NotFound
