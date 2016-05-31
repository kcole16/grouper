import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import Home from './Home';
import Next from './Next';
import {Scene, Router} from 'react-native-router-flux';

import codePush from "react-native-code-push";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  componentDidMount() {
  	codePush.sync();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="home" component={Home} title="Home" initial={true}/>
            <Scene key="next" component={Next} title="Next"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
