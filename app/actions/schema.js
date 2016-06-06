import { createAction } from 'redux-actions'

import Schema from '../services/Schema'
import {
  ENTRY_LIST_PENDING,
  ENTRY_LIST_SUCCESS,
  ENTRY_LIST_ERROR,
  SCHEMA_ITEM_PENDING,
  SCHEMA_ITEM_SUCCESS,
  SCHEMA_ITEM_ERROR,
  SCHEMA_ITEM_ADD,
  SCHEMA_SAVE_PENDING,
  SCHEMA_SAVE_SUCCESS,
  SCHEMA_SAVE_ERROR
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

export const schemaSavePending = createAction(SCHEMA_SAVE_PENDING)
export const schemaSaveSuccess = createAction(SCHEMA_SAVE_SUCCESS)
export const schemaSaveError = createAction(SCHEMA_SAVE_ERROR)

export const entrySelect = createAction('ENTRY_SELECT');
export const entryFilter = createAction('ENTRY_FILTER');


export const fetchEntryList = () => (dispatch) => {
  dispatch(schemaListPending())
  Schema.list()
    .then((data) => dispatch(schemaListSuccess(data)))
    .catch((ex) => dispatch(schemaListError(ex)))
}

export const saveEntry = (entry) => (dispatch) => {
  dispatch(schemaSavePending(entry))
  Schema.update(entry)
    .then((data) => dispatch(schemaSaveSuccess(data)))
    .catch((ex) => dispatch(schemaSaveError(ex)))
}
