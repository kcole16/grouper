import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: (Dimensions.get('window').width)*0.6,
    height: 100,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, login, logout, increment} = this.props;
    console.log(state);
    if (state.user.isLoggedIn) {
      var user = 'True';
    } else {
      var user = 'False';
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{state.user.token}</Text>
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text>login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
