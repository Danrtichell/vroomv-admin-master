import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider as ThemeProviderStyled } from 'styled-components'
import {
  createMuiTheme,
  ThemeProvider as ThemeProviderMaterial
} from '@material-ui/core'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LayoutContainer from 'containers/LayoutContainer'
import App from './App'
import AppWrapper from './App.style'
import { themes } from './constants'
import routes from './routes'
import configureStore from './configureStore'
import reportWebVitals from './reportWebVitals'
import 'assets/styles/app.scss'

const initialState = window.INITIAL_REDUX_STATE
const store = configureStore(initialState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <DndProvider backend={HTML5Backend}>
          <LayoutContainer>
            {({ theme }) => {
              const selectedTheme = themes[theme]
              const materialTheme = createMuiTheme(selectedTheme.material.theme)
              return (
                <ThemeProviderStyled theme={selectedTheme.styled.theme}>
                  <ThemeProviderMaterial theme={materialTheme}>
                    <AppWrapper>
                      <App routes={routes} />
                    </AppWrapper>
                  </ThemeProviderMaterial>
                </ThemeProviderStyled>
              )
            }}
          </LayoutContainer>
        </DndProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
