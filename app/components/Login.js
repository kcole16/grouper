import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

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

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    return (
      <View style={{
          flex: 1, marginTop: 200, alignItems: "center", justifyContent: "center" }}>
        <LoginButton
          readPermissions={["public_profile", "email", "user_friends"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    actions.registerUser(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}
