import React from 'react'
import { Provider } from 'react-redux'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import muiTheme from './services/Theme';
import App from './components/App.jsx';
import { authenticated } from './lib/auth0';
import Login from './containers/Login.jsx';

import Editor from './components/Editor.jsx';

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
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="login" component={Login} onEnter={authenticated} />
          <IndexRoute component={Editor} onEnter={authenticated} onChange={authenticated} />
        </Route>
      </Router>
    </Provider>
  )
}
