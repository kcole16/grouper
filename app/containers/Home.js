'use strict';

import React, { 
  Component,
  View,
  Text, 
  Navigator,
  AsyncStorage
} from 'react-native';
import {Container, Header, Content, Footer, Title} from 'native-base';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import Login from '../components/Login';
import Next from './Next';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

import State from '../components/State';

var PushNotification = require('react-native-push-notification');

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    this._loadInitialUser();
  }

  componentDidUpdate() {
    this._updateUser();
  }

  next() {
    this.props.navigator.push({
      name: 'Add Account',
      component: Next
    });
  }

  async _loadInitialUser() {
    const { state, actions } = this.props;
    try {
      let id = await AsyncStorage.getItem("id");
      let name = await AsyncStorage.getItem("name");
      let sceneState = await AsyncStorage.getItem("sceneState");
      if (id) {
        let user = {
          name: name,
          id: id,
          sceneState: sceneState
        };
        actions.isLoggedIn(user);
        if (sceneState) {
          actions.setSceneState(sceneState);
        };
        navigator.geolocation.getCurrentPosition(
              (position) => {
                var location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                };
                var userId = user.id;
                actions.sendLocation(location, userId);
              },
              (error) => alert(error.message),
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );
          }
    } catch (error) {
      console.log('AsyncStorge error: ' + error.message);
    }
  }

  async _updateUser() {
    const { state } = this.props;
    if (state.user.id) {
    };
  }

  onLogin(e) {
    let accessToken = e.token;
    const { actions } = this.props;
    actions.getAuth(accessToken);
  }

  render() {
    const { state, actions } = this.props;
    if (state.user.isLoggedIn) {
      console.log("Yes");
      var content = <State 
          state={state}
          actions={actions} />;
    } else {
      var content =  <Login
          onLogin={this.onLogin}
          state={state}
          actions={actions} />
    }
    return (
      <Container>
        <Content>
        {content}
        </Content>
      </Container>
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Home);
