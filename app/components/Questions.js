import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import t from 'tcomb-form-native';

let Form = t.form.Form;

// here we are: define your domain model

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.getQuestions();
  }

  onPress() {
    // call getValue() to get the values of the form
    const {state, actions} = this.props;
    var value = this.refs.form.getValue();
    var questions = state.user.questions;
    var qs = [];
    for (var q in questions) {
      qs.push(questions[q])
    };
    if (value) { // if validation fails, value will be null
      let answers = {
        0: {
          'answer': value['answer1'],
          'id': qs[0]['id'].toString()
        },
        1: {
          'answer': value['answer2'],
          'id': qs[1]['id'].toString()
        },
        2: {
          'answer': value['answer3'],
          'id': qs[2]['id'].toString()
        }
      };
      actions.sendAnswers(answers, state.user.id);
      actions.saveAndAdvance(state);
    }
  }

  render() {
    const {state, actions} = this.props;
    try {
      var questions = state.user.questions;
      console.log(questions);
      var qs = [];
      for (var q in questions) {
        qs.push(questions[q])
      };
      var options = {
        fields: {
          answer1: {
            label: qs[0]['question']
          },
          answer2: {
            label: qs[1]['question']
          },
          answer3: {
            label: qs[2]['question']
          },
        }
      };
    } catch(err) {
      console.log(err);
      var options = {};
    }

    let Questions = t.struct({
      answer1: t.String,
      answer2: t.String,
      answer3: t.String              // a required string
    });
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Questions}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
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
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
