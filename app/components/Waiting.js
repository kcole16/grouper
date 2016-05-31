import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight
} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  }
});
