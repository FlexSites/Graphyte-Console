import { createAction } from 'redux-actions'

import { pushNotification } from './notifications';

import Schema from '../services/Schema'
import {
  ENTRY_LIST_PENDING,
  ENTRY_LIST_SUCCESS,
  ENTRY_LIST_ERROR,
  SCHEMA_ITEM_PENDING,
  SCHEMA_ITEM_SUCCESS,
  SCHEMA_ITEM_ERROR,
  SCHEMA_ITEM_ADD,
  PUSH_NOTIFICATION,
  SCHEMA_SAVE_SUCCESS,
  SCHEMA_SAVE_ERROR,
  ENTRY_FILTER,
  ENTRY_SELECT,
  ENTRY_REMOVE,
  UPDATE_ENTRY,
} from '../constants'

export const schemaListPending = createAction(ENTRY_LIST_PENDING)
export const schemaListSuccess = (data) => {
  return {
    type: ENTRY_LIST_SUCCESS,
    payload: data,
  }
}
export const schemaListError = createAction(ENTRY_LIST_ERROR)

export const schemaItemPending = createAction(SCHEMA_ITEM_PENDING)
export const schemaItemSuccess = createAction(SCHEMA_ITEM_SUCCESS)
export const schemaItemError = createAction(SCHEMA_ITEM_ERROR)
export const schemaItemAdd = createAction(SCHEMA_ITEM_ADD)

export const schemaSavePending = createAction(
  PUSH_NOTIFICATION,
  (entry) => ({
    timeout: 1000,
    message: `Saving "${entry.name}"`
  })
);
export const schemaSaveSuccess = createAction(
  PUSH_NOTIFICATION,
  (entry) => ({
    timeout: 1000,
    message: `Successfully saved "${entry.name}"`
  })
);
export const schemaSaveError = createAction(
  PUSH_NOTIFICATION,
  (entry, ex) => ({
    type: 'error',
    message: `Error saving "${entry.name}"`
  })
);


export const schemaRemovePending = createAction(
  PUSH_NOTIFICATION,
  (entry) => ({
    timeout: 1000,
    message: `Removing "${entry.name}"`
  })
);
export const schemaRemoveSuccess = createAction(
  PUSH_NOTIFICATION,
  (entry) => ({
    timeout: 1000,
    message: `Successfully removed "${entry.name}"`
  })
);
export const schemaRemoveError = createAction(
  PUSH_NOTIFICATION,
  (entry, ex) => ({
    type: 'error',
    message: `Error removing "${entry.name}"`
  })
);

export const entrySelect = createAction(ENTRY_SELECT);
export const entryFilter = createAction(ENTRY_FILTER);


export const fetchEntryList = () => (dispatch) => {
  dispatch(schemaListPending())
  Schema.list()
    .then((data) => dispatch(schemaListSuccess(data)))
    .catch((ex) => dispatch(schemaListError(ex)))
}

export const updateEntry = createAction(UPDATE_ENTRY);

export const persistEntry = (entry) => (dispatch) => {
  delete entry.modified;
  dispatch(schemaSavePending(entry))
  Schema.update(entry)
    .then((data) => dispatch(schemaSaveSuccess(data)))
    .catch((ex) => dispatch(schemaSaveError(entry, ex)))
}

export const removeEntry = (entry) => (dispatch) => {
  dispatch({ type: ENTRY_REMOVE, payload: entry.id });
  dispatch(schemaRemovePending(entry));
  Schema.remove(entry.id)
    .then((data) => dispatch(schemaRemoveSuccess(entry)))
    .catch((ex) => dispatch(schemaRemoveError(entry, ex)))
}
