import { PUSH_NOTIFICATION, POP_NOTIFICATION } from '../constants'

export default function(state = [], { type, payload }) {
  const reducer = {
    [PUSH_NOTIFICATION]: () => {
      console.log(payload);
      return [ ...state, payload ]
    },
    [POP_NOTIFICATION]: () => {
      let newState = [...state];
      newState.pop();
      return newState;
    }
  }[type]

  if (reducer) return reducer()

  return state
}
