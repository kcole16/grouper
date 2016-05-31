export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const ADVANCE_STATE = 'ADVANCE_STATE';
export const SET_SCENE_STATE = 'SET_SCENE_STATE';

import {AsyncStorage} from 'react-native';

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function login(user) {
  return {
    type: LOGIN,
    user: user
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function advanceState() {
  return {
    type: ADVANCE_STATE
  };
}

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions: questions
  };
}

export function setSceneState(sceneState) {
  return {
    type: SET_SCENE_STATE,
    sceneState: sceneState
  };
}

async function saveUser(user) {
  await AsyncStorage.setItem("id", user.id.toString());
  await AsyncStorage.setItem("name", user.name);
}

export function isLoggedIn(user) {
  saveUser(user);
  return dispatch => {
      return dispatch(login(user))
    }
}

function fetchToken(accessToken) {
  let url = "http://api.bespokeweb.nl/users";
  let formData = new FormData();
  formData.append("token", accessToken);
  let obj = {
    method: 'POST',
    body: formData
  };
  return dispatch => {
      fetch(url, obj)
        .then(req => req.json())
        .then(json => dispatch(isLoggedIn(json)))
        .catch(err => console.log(err))
  }
}

function fetchQuestions() {
  let url = "http://api.bespokeweb.nl/questions?count=3&rand=true";
  return dispatch => {
      fetch(url)
        .then(req => req.json())
        .then(json => dispatch(setQuestions(json)))
        .catch(err => console.log(err))
  }
}

function fetchAnswers(answers, userId) {
  let url = "http://api.bespokeweb.nl/answers";
  let formData = new FormData();
  formData.append("answers[1][question_id]", answers[0]['id']);
  formData.append("answers[1][answer]", answers[0]['answer']);
  formData.append("answers[2][question_id]", answers[1]['id']);
  formData.append("answers[2][answer]", answers[1]['answer']);
  formData.append("answers[3][question_id]", answers[2]['id']);
  formData.append("answers[3][answer]", answers[2]['answer']);
  formData.append("user_id", userId);
  let obj = {
    method: 'POST',
    body: formData
  };
  console.log(obj);
  return dispatch => {
      fetch(url, obj)
        .then(req => dispatch(advanceState()))
        .catch(err => console.log(err))
  }
}

function fetchLocation(location, userId) {
  console.log(userId);
  let url = "http://api.bespokeweb.nl/users/"+userId;
  let formData = new FormData();
  formData.append("location[lat]", location.latitude);
  formData.append("location[lng]", location.longitude);
  formData.append("_method", "PUT");
  let obj = {
    method: 'POST',
    body: formData
  };
  return dispatch => {
      fetch(url, obj)
        .then(req => req.json())
        .then(json => dispatch(isLoggedIn(json)))
        .catch(err => console.log(err))
  }
}

async function saveState(state) {
  let saved = AsyncStorage.setItem('sceneState', state.sceneState+1);
}

export function registerUser(accessToken) {
  console.log(accessToken);
  return dispatch => {
    dispatch(fetchToken(accessToken))
  }
}

export function getQuestions() {
  return dispatch => {
    dispatch(fetchQuestions())
  }
}

export function sendAnswers(answers, userId) {
  return dispatch => {
    dispatch(fetchAnswers(answers, userId))
  }
}

export function sendLocation(location, userId) {
  return dispatch => {
    dispatch(fetchLocation(location, userId))
  }
}

export function saveAndAdvance(state) {
  saveState(state);
  return dispatch => {
    dispatch(advanceState())
  }
}