import React, { Component } from 'react-native';
import { Provider } from 'react-redux';

import * as reducers from '../reducers';
import Home from './Home';
import Questions from './Questions';
import Login from './Login';
import Waiting from './Waiting';
import {Scene, Router} from 'react-native-router-flux';

import codePush from "react-native-code-push";
import store from '../store/store';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: (optional) GCM Sender ID.
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * IOS ONLY: (optional) default: true
      * - Specified if permissions will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

export default class App extends Component {
  componentDidMount() {
  	codePush.sync();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="login" component={Login} title="Login" initial={true}/>
            <Scene key="home" component={Home} title="Home" />
            <Scene key="questions" component={Questions} title="Questions"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
