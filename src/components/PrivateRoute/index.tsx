import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getJWT } from '../../utils/auth'
import { RouteModel } from '../../types'

type Props = {
  route: RouteModel
  children: JSX.Element
}

const PrivateRoute = ({ route, children }: Props): JSX.Element => (
  <Route
    path={route.path}
    render={({ match, location }) => {
      const token = getJWT()
      return token ? (
        React.cloneElement(children, { match })
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      )
    }}
  />
)

export default PrivateRoute
