'use strict';

import React, { 
  Component,
  View
} from 'react-native';

import Home from '../containers/Home';
import Questions from './Questions';
import Waiting from './Waiting';

export default class Scene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {state, actions} = this.props;
    switch (state.user.sceneState) {
      case 0:
        var scene = <Questions state={state} actions={actions} />
        break;
      case 1:
        var scene = <Waiting state={state} actions={actions} />
        break;
      // case 1:
      //   var scene = <Questions state={state} actions={actions} />
      //   break;
      // case 2:
      //   var scene = <Questions state={state} actions={actions} />
      //   break;
    };
    return (
      <View>
      {scene}
      </View>
    );
  }
}
