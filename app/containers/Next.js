'use strict';

import React, { 
  Component,
  View,
  Text, 
  Navigator,
  AsyncStorage
} from 'react-native';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class Next extends Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
  }

  back() {
    this.props.navigator.pop();
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View>
        <Text onPress={this.back}>Next</Text>
        <Counter
          state={state}
          {...actions} />
      </View>
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Next);
