import {
  ENTRY_LIST_SUCCESS,
  ENTRY_LIST_PENDING,
  SCHEMA_ITEM_ADD,
  ENTRY_FILTER,
  ENTRY_SELECT,
  ENTRY_REMOVE,
  UPDATE_ENTRY,
} from '../constants';

import { LOCATION_CHANGE } from 'react-router-redux';

const SCHEMA_EDIT_REGEX = /\/edit\/([^/]+)/;

export default function (state = {}, action) {
  let { loading, errors, list, selected } = Object.assign({ loading: false, errors: [], list: [] }, state);

  switch (action.type) {
    case LOCATION_CHANGE:
      if (!SCHEMA_EDIT_REGEX.test(action.payload.pathname)) break;
      let id = SCHEMA_EDIT_REGEX.exec(action.payload.pathname)[1];
      return Object.assign({}, state, { selected: id });
    case ENTRY_LIST_SUCCESS:
      return {
        selected,
        list: action.payload,
        loading: false,
      }
    case ENTRY_LIST_PENDING:
      return {
        selected,
        loading: true,
      };
    case ENTRY_REMOVE:
      let newList = state.list.filter(({ id }) => action.payload !== id);
      return {
        selected: newList[0].id,
        list: newList,
      }
    case SCHEMA_ITEM_ADD:
      return {
        list: [...state.list, action.payload],
        selected: action.payload.id,
      }
    case ENTRY_FILTER:
      let filter = action.payload;
      return {
        list,
        selected,
        filter,
      }
    case UPDATE_ENTRY:
      let updateEntryList = [].concat(state.list);
      let idx = updateEntryList.findIndex((item) => item.id === selected);
      let newEntry = Object.assign({}, updateEntryList[idx], action.payload);
      newEntry.modified = true;
      updateEntryList.splice(idx, 1, newEntry);
      return {
        list: updateEntryList,
        filter: state.filter,
        selected: state.selected,
      }
  }

  return state
}
