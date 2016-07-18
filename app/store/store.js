import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { persistStore, autoRehydrate } from 'redux-persist';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';

import * as reducers from '../reducers';

// Uncomment to clear local storage of redux state.
// AsyncStorage.clear();

const middleware = applyMiddleware(thunk);
const reducer = combineReducers(reducers);
const store = autoRehydrate()(createStore)(reducer, middleware);
persistStore(store, { storage: AsyncStorage });

export default store;
