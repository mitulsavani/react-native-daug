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
      password: '',
      isLoading: false
    };
  }

  async signupButtonPressed() {
    this.setState({ isLoading: true })

    const { name, email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
      'email': email,
      'password': password
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
          'Signed Up!',
          'You have successfully signed up!',
          [
            { text: "Continue", onPress: () => navigate("Home") }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  // onSignUpButtonPressed = () => {
  //   const {screen, name, email, password} = this.state
  //     //Display alert
  //     if (name != '' && password !='' && email!= '') {
  //         Keyboard.dismiss
  //       console.log("Correct Phrase Entered")
  //       Alert.alert(
  //           'Success!',
  //         'Name: ' + name + '\nEmail: ' + email + '\nPassword ' + password,
  //           [
  //               {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
  //         ],
  //           { cancelable: false }
  //       )
        
  //     } else {
  //           Keyboard.dismiss
  //         console.log("Incorrect Email Or Password Entered")
  //         Alert.alert(
  //             'Invalid',
  //           'Please fill all the fields', 
  //           [
  //               {text: 'Try Again', onPress: () => this.props.navigation.navigate('Home')},
  //         ],
  //           { cancelable: false},
  //       )
  //     }
  // }

  render() {
    const{ screen, name, email, password} = this.state;

    if(screen === 'IntroScreen')
    {
      return (<IntroScreen/>);
    }
    return (
      <LinearGradient
        colors={['#4C3ADC', '#ff9068' ]}
        start={{ x: 0.5, y: 0.0 }}
        end={{ x: 0.5, y: 1.0 }}
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
                  onChangeText={(name) => this.setState({name})}
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
                onPress = {() => this.signupButtonPressed()}
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
