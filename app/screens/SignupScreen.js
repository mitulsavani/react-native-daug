import React from 'react';
import { StyleSheet, Text, View, Keyboard, Alert} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import IntroScreen from './IntroScreen'

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: "Let's get Started",
    headerStyle: {backgroundColor: '#4C3ADC', borderBottomWidth: 0},
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white', fontSize: 20 }
  };

  constructor(props){
    super(props)

    this.state = {
      screen: null,
      name: '',
      email: '',
      password: ''
    };
  }

  onSignUpButtonPressed = () => {
    const {screen, name, email, password} = this.state
    //Display alert
       if (name != '') {
           Keyboard.dismiss
         console.log("Correct Phrase Entered")
         Alert.alert(
             'Success!',
           'Name: ' + name + '\nEmail: ' + email + '\nPassword ' + password,
            [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
          ],
            { cancelable: false }
        )
        
      } else {
            Keyboard.dismiss
          console.log("Incorrect Email Or Password Entered")
          Alert.alert(
              'Invalid',
            'Please fill all the fields', 
            [
                {text: 'Try Again', onPress: () => this.props.navigation.navigate('Home')},
          ],
            { cancelable: false},
        )
      }
  }

  render() {
    const{ screen, name, email, password} = this.state;

    if(screen === 'IntroScreen')
    {
      return (<IntroScreen/>);
    }
    return (
      <LinearGradient
        colors={['#4C3ADC', '#ff9068' ]}
        start={{x: 1.0, y: 0.0}}
        end={{x:0.0, y: 1.0}}
        locations={[0.1,0.8]}
        style={styles.container}>
            <Input
                  placeholder = 'Name'
                  inputStyle = {{ color: 'white' }}
                  autoCapitalize = "none"
                  autoCorrect = {false}
                  returnKeyType = "next"
                  containerStyle = {styles.inputElementContainer}
                  leftIcon = {
                    <FontAwesome
                      name = 'pencil-square-o'
                      size = {24}
                      color = 'white'
                    />
                  }
            />
            <Input
                  placeholder = 'Email'
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
                  onChangeText={(email) => this.setState({email})}
            />
            <Input
                  placeholder = 'Password'
                  palceholderTextColor="white"
                  secureTextEntry
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
                  onChangeText={(password) => this.setState({password})}
            />
          <View style={styles.ButtonContainer}>
              <Button
                text='Sign Up'
                buttonStyle={{
                  backgroundColor: '#3B8AB8',
                  width: 200,
                  height: 45,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
                icon={
                  <Entypo
                    name='add-user'
                    size={20}
                    color='white'
                  />
                }
                onPress = {() => this.onSignUpButtonPressed()}
              />
          </View>
        </LinearGradient>
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
  inputElementContainer: {
    height: 45,
    marginVertical: 5,
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
  },
  ButtonContainer: {
    marginTop: 40
  },
  LinearGradientStyle: {
    height: 50,
    borderRadius: 10,
    height: 50,
    width: '80%',
  },
});
