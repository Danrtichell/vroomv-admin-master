import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { getJWT } from './utils/auth'
import { LayoutType } from './enums'
import { RouteModel } from './types'

import {
  DashboardLayout,
  AuthLayout,
  PrivateRoute,
  NotFound
} from './components'

type Props = {
  routes: RouteModel[]
}

const App = ({ routes }: Props): JSX.Element => {
  const wrapComponent = (route: RouteModel): JSX.Element => {
    const Wrapper =
      route.layout === LayoutType.Dashboard ? DashboardLayout : AuthLayout
    return (
      <Wrapper title={route.title}>
        <route.component />
      </Wrapper>
    )
  }

  return (
    <Router>
      <Switch>
        {routes.map((route) =>
          route.isSecure ? (
            <PrivateRoute route={route}>{wrapComponent(route)}</PrivateRoute>
          ) : (
            <Route
              key={route.path}
              path={route.path}
              render={() => wrapComponent(route)}
            />
          )
        )}

        <Route exact path="/" render={() => <Redirect to={routes[0].path} />} />

        <Route
          render={() => {
            const token = getJWT()
            if (token) {
              return (
                <DashboardLayout title="Not found">
                  <NotFound />
                </DashboardLayout>
              )
            }
            return <Redirect to="/" />
          }}
        />
      </Switch>
    </Router>
  )
}

export default App
