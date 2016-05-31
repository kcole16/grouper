import {
  INCREMENT,
  DECREMENT
} from '../actions/index';
import * as initialState from '../store/initialState';

export default function counter(state = initialState.counter, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
