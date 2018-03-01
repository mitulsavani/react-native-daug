import React from 'react';
import { StyleSheet, Text, TextInput, View,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

export default class LoginScreen extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {
      text: ''
    };
  }


  render() {
    return (
      <View style={styles.container}>
          <Input
                placeholder = 'Email'
                palceholderTextColor="pink"
                inputStyle = {{ color: 'white' }}
                autoCapitalize = "none"
                autoCorrect = {false}
                keyboardType = "email-address"
                returnKeyType = "next"
                containerStyle = {styles.inputElementContainer}
                leftIcon = {
                  <MaterialCommunityIcons
                    name = 'email-outline'
                    size = {24}
                    color = 'white'
                  />
                }
          />
          <Input
                placeholder = 'Password'
                palceholderTextColor="white"
                secureTextEntry
                selectTextOnFocus
                inputStyle = {{ color: 'white' }}
                autoCapitalize = "none"
                autoCorrect = {false}
                keyboardType = "email-address"
                returnKeyType = "next"
                containerStyle = {styles.inputElementContainer}
                leftIcon = {
                  <SimpleLineIcons
                    name = 'lock'
                    size = {24}
                    color = 'white'
                  />
                }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ED8071',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: 50,
    fontSize: 25,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    color: 'white',
    shadowOpacity: 0.5
  },
  inputElementContainer: {
    height: 45,
    marginVertical: 5
  }
});
