import { routerReducer } from 'react-router-redux'

import { combineReducers } from '../lib/store'

// Reducers
import schema from './schema'
import auth from './auth';

export default combineReducers({
  routing: routerReducer,
  schema,
  auth,
})
