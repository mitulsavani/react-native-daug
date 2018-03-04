import React from 'react';
import { StyleSheet, Text, View, Vibration, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import Rocco_Cover from '../../assets/dogCover.jpg';
import Rocco_DisplayPic from '../../assets/Rocco_displayPic.jpg';

export default class ProfileScreen extends React.Component {
  render() {
    return (
    
      <View style={styles.mainContainer}>

          <View style={styles.daugCoverPic}>
              <Image style={styles.daugcover} source = {Rocco_Cover} />
          </View>

          <View style={styles.infoContainer}>
              <View style={styles.logs}>
                  <View style = { styles.displayPic } >
                      <Image style={styles.roccoDisplayPic} source = {Rocco_DisplayPic} />
                  </View>
                  <View style = { styles.activityContainer } >
                          
                          <View style = { styles.postAndFollowContainer} >
                              <View style = {styles.posts} >
                                  <Text style = {{fontWeight: 'bold'}}> 
                                      3 
                                  </Text>
                                  <Text style = {{fontWeight: 'bold'}}>
                                      Post 
                                  </Text>
                              </View>
                              <View style = {styles.followers} >
                                  <Text style = {{fontWeight: 'bold'}}> 
                                      501 
                                  </Text>
                                  <Text style = {{fontWeight: 'bold'}}> 
                                      Followers 
                                  </Text>
                              </View>
                              <View style = {styles.following} >
                                  <Text style = {{fontWeight: 'bold'}}> 
                                      99 
                                  </Text>
                                  <Text style = {{fontWeight: 'bold'}}> 
                                      Following 
                                  </Text>
                              </View>

                          </View>

                          <View style = { styles.editProfileContainer} >
                                <View style={styles.editButton}>
                                    <Button
                                      text='Edit Profile'
                                      textStyle={{ fontSize: 12, color: 'black'}}
                                      buttonStyle={{
                                        backgroundColor: 'white',
                                        width: 100,
                                        height: 20,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        borderRadius: 5
                                      }}
                                      icon={
                                        <MaterialCommunityIcons
                                          name='account-edit'
                                          size={20}
                                          color='black'
                                        />
                                      }
                                      onPress = {() => this.onSubmitButtonPressed()}
                                    />
                                </View>
                          </View>
                  </View>
              </View>

              
              <View style = { styles.bioData } >
                  <View style = { styles.name } >
                          <Text style = {{fontSize: 25, fontWeight: 'bold'}}>
                              Rocco
                          </Text>
                  </View>
                  <View style = { styles.status } >
                          <Text style = {{fontSize: 15, fontStyle: 'italic'}}>
                              I am small, inconent, and lovable dog 🐶
                          </Text>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#aaaaaa'
  },
  displayPic: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  activityContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  daugcover: {
    width: 400,
    height: 180,
    marginLeft: 25
  },
  name: {
    flex: 1.5,
    backgroundColor: 'white',
    marginLeft: 15,
    justifyContent: 'center'
  },
  status: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 15
  },
  roccoDisplayPic: {
    height:80,
    width: 80,
    borderRadius: 40,
    marginTop: -20
  },
  postAndFollowContainer: {
    flex: 1.5,
    flexDirection: 'row',
  },
  editProfileContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  posts :{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  following: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
