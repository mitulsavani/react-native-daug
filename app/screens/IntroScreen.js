import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import {Font} from 'expo';
import DAUG_LOGO from '../../assets/daugLogo.png';
import {Comfortaa} from '../../assets/fonts/Comfortaa.ttf';

import LoginScreen from './LoginScreen'
import SignUpScreen from './SignupScreen'

export default class IntroScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: null
    };
  }


  LoginButtonPressed =()=> {
    this.setState({ screen: 'LoginScreen' })
  }
  SignUpButtonContainer =()=> {
    this.setState({ screen: 'SignUpScreen' })
  }

  render() {
    const { screen } = this.state

    if (screen === 'LoginScreen') {
      return <LoginScreen />;
    } else if (screen === 'SignUpScreen') {
      return <SignUpScreen />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.dauglogo} source = {DAUG_LOGO} />
         </View>
        <View style={styles.joinus}>
          <View style={styles.login}>
          <Button 
            title="Login"
            color= 'white'
            onPress={() => this.LoginButtonPressed()}
          />
          </View>
          <View style={styles.signup}>
          <Button onPress={() => this.SignUpButtonContainer()}
            title="Sign Up"
            color= 'white'
            size = "30"
          />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 8,
    backgroundColor: '#ED8071',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dauglogo: {
    width: 150,
    height: 150,
  },
  joinus: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#A0545B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signup:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
