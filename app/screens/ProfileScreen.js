import React from 'react';
import { StyleSheet, Text, View, Vibration, Image } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import DAUG_Cover from '../../assets/dogCover.jpg';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>

          <View style={styles.daugCoverPic}>
              <Image style={styles.dauglogo} source = {DAUG_Cover} />
          </View>

          <View style={styles.infoContainer}>
              <View style={styles.logs}>
                  <View style = { styles.displayPic } >
                      <Text>display</Text>
                  </View>
                  <View Style = { styles.activity } >
                      <Text>activity</Text>
                  </View>
              </View>

              <View style={styles.bioData}>
                   <View style={styles.Name}>
                    <Text>Bio</Text>
                  </View><View style={styles.status}>
                    <Text>Bio</Text>
                  </View>
              </View>
          
          </View>

          <View style={styles.logOutContainer}>
                <View style={styles.ButtonContainer}>
                  <Button
                    text='LOGOUT'
                    buttonStyle={{
                      backgroundColor: '#3B8AB8',
                      width: 200,
                      height: 45,
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 5
                    }}
                    icon={
                      <MaterialCommunityIcons
                        name='logout'
                        size={24}
                        color='white'
                      />
                    }
                    onPress = {() => this.onSubmitButtonPressed()}
                  />
              </View>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'wheat',
  },

  daugCoverPic: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'pink'
  },

  logOutContainer: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logs: {
    flex: 2,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  bioData: {
    flex: 1.5,
    backgroundColor: 'blue'
  },
  displayPic: {
    flex: 1,
    backgroundColor: 'white',
  },
  activity: {
    flex: 1,
    backgroundColor: 'black'
  },
  dauglogo: {
    width: 400,
    height: 180,
    marginLeft: 25
  },
  name: {
    flex: 1,
    backgroundColor: 'red'
  },
  status: {
    flex: 1,
    backgroundColor: 'wheat'
  }
});
