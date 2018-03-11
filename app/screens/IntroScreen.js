import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Font, LinearGradient } from 'expo';
import DAUG_LOGO from '../../assets/daugLogo.png';
import { Comfortaa } from '../../assets/fonts/Comfortaa.ttf';

import LoginScreen from './LoginScreen'
import SignUpScreen from './SignupScreen'

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    title: "",
    header: null

  };

  constructor(props) {
    super(props);

    this.state = {
      screen: null
    };
  }

  async componentDidMount() {
    this.pingServer()
  }

  async pingServer() {
    // Check server status
    // Simple GET request to /api
    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api`, {
        method: 'GET'
      });
      const responseJSON = await response.json();


      if (response.status === 200) {
        console.log(responseJSON.message);
        console.log('Server up and running!');
      } else {
        const error = responseJSON.message

        console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }
 

  render() {
    const { screen } = this.state

    if (screen === 'LoginScreen') {
      return <LoginScreen />;
    } else if (screen === 'SignUpScreen') {
      return <SignUpScreen />;
    }

    return (
      <LinearGradient
        colors={['#4C3ADC', '#ff9068']}
        start={{ x: 0.5, y: 0.0 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0.1, 0.8]}
        style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.dauglogo} source={DAUG_LOGO} />
        </View>

        <View style={styles.joinus}>
          <View style={styles.login}>
            <Button
              title="Login"
              color='black'
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
          <View style={styles.signup}>
            <Button onPress={() => this.props.navigation.navigate('Signup')}
              title="Sign Up"
              
              color='black'
              size="30"
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 8,
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
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
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
