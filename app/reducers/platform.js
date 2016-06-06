
export default function (state = { loading: false, errors: [], list: [] }, action) {
  switch (action.type) {
    case 'PLATFORM_LIST_SUCCESS':
      return {
        selected: action.payload[0].id,
        list: action.payload,
        loading: false,
      }
    case 'PLATFORM_LIST_PENDING':
      return {
        loading: true,
      };
    case 'PLATFORM_ADD':
      return {
        list: [...state.list, action.payload],
        item: action.payload
      }
    case 'PLATFORM_SELECT':
      return {
        list: state.list,
        item: state.item,
        filter: state.filter,
        selected: action.payload,
      }
  }

  return state
}
