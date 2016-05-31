import {
  LOGIN,
  LOGOUT,
  SET_QUESTIONS,
  ADVANCE_STATE, 
  SET_SCENE_STATE
} from '../actions/index';
import * as initialState from '../store/initialState';

export default function counter(state = initialState.user, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        id: action.user.id,
        name: action.user.name,
        email: action.user.email,
        sceneState: 0
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      };
    case ADVANCE_STATE:
      return {
        ...state,
        sceneState: state.sceneState + 1
      };
    case SET_SCENE_STATE:
      return {
        ...state,
        sceneState: action.sceneState
      };
    default:
      return state;
  }
}