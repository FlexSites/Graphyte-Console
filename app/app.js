import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import muiTheme from './services/Theme';
import App from './components/App.jsx';

import reducers from './reducers'

import { configureStore } from './lib/store'
import './global.css'

// Redux Middleware
import thunk from 'redux-thunk'

// Needed for onTouchTap
injectTapEventPlugin()

const middleware = [
  thunk,
  routerMiddleware(browserHistory)
];

/* eslint-disable react/display-name */ // This is not a react component
export default (initialState) => {
  const store = configureStore(reducers, initialState, middleware)
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
