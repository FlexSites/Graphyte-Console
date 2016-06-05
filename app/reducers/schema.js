
export default function (state = { loading: false, errors: [], list: [] }, action) {
  switch (action.type) {
    case 'ENTRY_LIST_SUCCESS':
      return {
        selected: action.payload[0].id,
        list: action.payload,
        loading: false,
      }
    case 'ENTRY_LIST_PENDING':
      return {
        loading: true,
      };
    case 'SCHEMA_ITEM_ADD':
      return {
        list: [...state.list, action.payload],
        item: action.payload
      }
    case 'ENTRY_FILTER':
      let filter = action.payload;
      let list = state.list.filter(entry => entry.type === filter);
      console.log({
        list: state.list,
        selected: list[0].id || state.selected,
        filter,
      })
      return {
        list: state.list,
        selected: list[0].id || state.selected,
        filter,
      }
    case 'ENTRY_SELECT':
      return {
        list: state.list,
        item: state.item,
        filter: state.filter,
        selected: action.payload,
      }
  }

  return state
}
