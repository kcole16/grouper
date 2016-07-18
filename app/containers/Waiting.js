import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import {bindActionCreators} from 'redux';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

export default class Waiting extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {actions} = this.props;
    // actions.getLocation();
  }

  render() {
    const {state, actions} = this.props;
    return (
      <View style={styles.container}>
        <Text >Magic!</Text>
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
)(Waiting);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  }
});
