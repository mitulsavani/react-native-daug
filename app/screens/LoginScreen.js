import React from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

import SocialFeedScreen from './SocialFeedScreen';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
    headerStyle: {backgroundColor: '#4C3ADC', borderBottomWidth: 0},
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white', fontSize: 20 }
  };
  
  constructor(props){
    super(props);

    this.state = {
      screen: null,
      email: '',
      password: '' 
    };
  }

  onSubmitButtonPressed = () => {
    const { screen,email, password } = this.state
    if (email !== '' && password !== '') {
      Keyboard.dismiss();
    
      if (email === 'mitul@gmail.com' && password === 'savani') {
        Alert.alert(
          'Success',
          'Email: mitul@gmail.com\nPassword is "savani"',
        );
        this.props.navigation.navigate('Home')
      } else {
        Alert.alert(
          'Failure',
          'Email is mitul@gmail.com, and password is "savani".',
        );
      }
    }
  }



  render() {
    const{ screen, email, password} = this.state;

    if(screen === 'SocialFeedScreen')
    {
      return <SocialFeedScreen/>;
    }
    return (
      <LinearGradient
        colors={['#4C3ADC', '#ff9068']}
        start={{ x: 0.5, y: 0.0 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0.1,0.8]}
        style={styles.mainContent}>
          <Input
                placeholder = 'Email'
                //TODO: Font probably goes down here
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
              text='Login'
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
                  name='login'
                  size={24}
                  color='white'
                />
              }
              onPress = {() => this.onSubmitButtonPressed(email,password)}
            />
        </View>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
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
  }
});
