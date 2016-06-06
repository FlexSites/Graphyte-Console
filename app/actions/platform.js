import { createAction } from 'redux-actions';
import Platform from '../services/Platform';

import {
  PLATFORM_LIST_PENDING,
  PLATFORM_LIST_SUCCESS,
  PLATFORM_LIST_ERROR,
  PLATFORM_SELECT,
} from '../constants';

export const platformListPending = createAction(PLATFORM_LIST_PENDING);
export const platformListSuccess = createAction(PLATFORM_LIST_SUCCESS);
export const platformListError = createAction(PLATFORM_LIST_ERROR);


export const platformSelect = createAction(PLATFORM_SELECT);

export const fetchPlatformList = () => (dispatch) => {
  dispatch(platformListPending())
  Platform.list()
    .then((data) => dispatch(platformListSuccess(data)))
    .catch((ex) => dispatch(platformListError(ex)))
}
