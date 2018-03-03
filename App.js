import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './app/screens/LoginScreen';
import IntroScreen from './app/screens/IntroSreen';
import ProfileScreen from './app/screens/ProfileScreen';
import SignupScreen from './app/screens/SignupScreen';
import SocialFeedScreen from './app/screens/SocialFeedScreen';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      screen: 'signup'
    }
  }


  render() {

    const {screen} = this.state

    if(screen === 'signup'){
      return <SignupScreen/>
    }
    else 
    {
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
