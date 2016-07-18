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
import LoginButton from '../components/Login';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

import {Actions} from 'react-native-router-flux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    this._loadInitialUser();
  }

 _loadInitialUser() {
  const { state, actions } = this.props;
  if (state.user.isLoggedIn) {
      actions.isLoggedIn(state.user);
      Actions.questions();
    }
  }

  onLogin(e) {
    let accessToken = e.token;
    const { actions } = this.props;
    actions.getAuth(accessToken);
    Actions.questions();
  }

  render() {
    const { state, actions } = this.props;
    return (
      <Container>
        <Content>
          <LoginButton
            onLogin={this.onLogin}
            state={state}
            actions={actions} />        
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
)(Login);
