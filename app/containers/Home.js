'use strict';

import React, { 
  Component,
  View,
  Text, 
  Navigator,
  AsyncStorage
} from 'react-native';
import {Container, Header, Content, Footer, Title} from 'native-base';
import * as light from '../themes/light';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import Login from '../components/Login';
import Next from './Next';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

import {Actions} from 'react-native-router-flux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this._getUserPosition();
  }

  next() {
    this.props.navigator.push({
      name: 'Add Account',
      component: Next
    });
  }
  
   _getUserPosition() {
    const { state, actions } = this.props;
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

  render() {
    const { state, actions } = this.props;
    return (
        <Container theme={light}>
            <Header theme={light}>
                <Title>Header</Title>
            </Header>

            <Content>
              <Text>Awesome! Sit tight and we'll find you a great date!</Text>
            </Content>

            <Footer>
                <Title>Footer</Title>
            </Footer>
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
