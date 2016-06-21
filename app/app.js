import React from 'react' // eslint-disable-line no-unused-vars;
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import muiTheme from './services/Theme';
import App from './components/App.jsx';
import { authenticated } from './lib/auth0';
import Login from './containers/Login.jsx';

import Editor from './containers/EntryEditor';
import Preview from './containers/GraphiQL';
import MockEditor from './containers/MockEditor';
import DefinitionEditor from './containers/DefinitionEditor';
import ResolveEditor from './containers/ResolveEditor';
import reducers from './reducers';

import { configureStore } from './lib/store';
import './global.css'

// Redux Middleware
import thunk from 'redux-thunk';

// Needed for onTouchTap
injectTapEventPlugin()

const middleware = [
  thunk,
  routerMiddleware(browserHistory),
];

/* eslint-disable react/display-name */ // This is not a react component
export default (initialState) => {
  const store = configureStore(reducers, initialState, middleware)
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Provider store={store}>
      <Router history={history}>
        <Redirect from="/" to="/edit" />
        <Route path="/" component={App}>
          <Route path="login" component={Login} onEnter={authenticated} />
          <Route path="preview" component={Preview} onEnter={authenticated} />
          <Route path="edit" component={Editor} onEnter={authenticated} onChange={authenticated}>
            <Route path=":id/resolve" component={ResolveEditor} />
            <Route path=":id/mock" component={MockEditor} />
            <Route path=":id" component={DefinitionEditor} />
            <IndexRoute component={DefinitionEditor} />
          </Route>
        </Route>
      </Router>
    </Provider>
  )
}
