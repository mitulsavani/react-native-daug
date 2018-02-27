import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';

export default class IntroScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.dauglogo} source = {require('../Images/daugLogo.png')} />
         </View>
        <View style={styles.joinus}>
            <View style={styles.login}>
            <Button onPress={() => this.changeBackground()}
              title="Login"
              color= 'white' />
            </View>
            <View style={styles.signup}>
            <Button onPress={() => this.changeBackground()}
              title="Sign Up"
              color= 'white'
              size = "30" />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 8,
    width: 375,
    backgroundColor: '#ED8071',
    justifyContent: 'center',
    alignItems: 'center'

  },
  dauglogo: {
    width: 200,
    height: 200,
  },
  joinus: {
    flex: 1,
    flexDirection: 'row',
    width: 375,
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
