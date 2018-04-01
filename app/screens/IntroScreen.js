import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Font, LinearGradient } from 'expo';
import DAUG_LOGO from '../../assets/daugLogo.png';

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    title: "",
    header: null
  };

  constructor(props) {
    super(props);
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
              titleStyle = {{fontSize: 20, fontFamily: 'Futura'}}
              buttonStyle = {styles.Button}
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
          <View style={styles.signup}>
            <Button
              title="Sign Up"
              titleStyle = {{fontSize: 20, fontFamily: 'Futura', color: 'white'}}
              buttonStyle = {styles.Button}
              onPress={() => this.props.navigation.navigate('Signup')}
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
    },
  Button: {
    backgroundColor: '#A0545B',
    width: 100,
    height: 20,
    borderRadius: 5
  },
});
