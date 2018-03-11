import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import LoginScreen from './app/screens/LoginScreen';
import IntroScreen from './app/screens/IntroScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import SignupScreen from './app/screens/SignupScreen';
import SocialFeedScreen from './app/screens/SocialFeedScreen';
import CreatePost from './app/screens/CreatePost';
import EditProfile from './app/screens/EditProfile';
import PostDetails from './app/screens/PostDetails';
import RootNavigator from './app/navigation/RootNavigator'

export default class App extends React.Component {

  render() 
  {
      return (
        <RootNavigator/>
      )
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
