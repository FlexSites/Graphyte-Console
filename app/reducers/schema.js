import {
  ENTRY_LIST_SUCCESS,
  ENTRY_LIST_PENDING,
  SCHEMA_ITEM_ADD,
  ENTRY_FILTER,
  ENTRY_SELECT,
  ENTRY_REMOVE,
} from '../constants';

export default function (state = { loading: false, errors: [], list: [] }, action) {
  switch (action.type) {
    case ENTRY_LIST_SUCCESS:
      return {
        selected: action.payload[0].id,
        list: action.payload,
        loading: false,
      }
    case ENTRY_LIST_PENDING:
      return {
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
      let list = state.list.filter(entry => entry.type === filter);
      return {
        list: state.list,
        selected: list[0].id || state.selected,
        filter,
      }
    case ENTRY_SELECT:
      return {
        list: state.list,
        item: state.item,
        filter: state.filter,
        selected: action.payload,
      }
  }

  return state
}
