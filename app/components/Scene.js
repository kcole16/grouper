'use strict';

import React, { 
  Component, 
  Navigator 
} from 'react-native';
import Home from '../containers/Home';

function renderScene(route, navigator) {
  return <route.component route={route} navigator={navigator}/>;
};

export default class Scene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
          initialRoute={{name: 'Home Page', component: Home}}
          renderScene={renderScene}/>
    );
  }
}
