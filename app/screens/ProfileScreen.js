import React from 'react';
import { StyleSheet, Text, View, Vibration, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { Font } from 'expo';
import Rocco_Cover from '../../assets/dogCover.jpg';
import Rocco_DisplayPic from '../../assets/Rocco_displayPic.jpg';

import IntroScreen from './IntroScreen'

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerVisible: navigation.state.params ? navigation.state.params.isHeaderShow : false,
      title: 'Profile',
      headerTintColor: '#C83E70',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: '#FAFAFA',
      },
    }
  }
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      isProfileLoading: false,
      profile: null,
      user: 6
    };
  }


  async componentDidMount() {
    await Font.loadAsync({
      'Comfortaa': require('../../assets/fonts/Comfortaa.ttf'),
      'ComfortaaBold': require('../../assets/fonts/ComfortaaBold.ttf')
    });

    this.setState({ fontLoaded: true });

    this.fetchUser()
  }

  componentDidMount(){
    this.fetchUser()
  }

  async fetchUser() {

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/9`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

      let responseJSON = null
      
      if (response.status === 200) {

        responseJSON = await response.json();
        console.log(responseJSON)
        this.setState({
          isProfileLoading: false,
          profile: responseJSON,
        })
      }
      else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get your profile info', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isProfileLoading: false, response: error })

      console.log(error)

      Alert.alert('Unable to get the profile info. Please try again later')
    }
  }

  _renderProfileBanner(image) {
    if(image) {
      return (
        <Image 
          style = {styles.coverImage}
          source = {{ uri: image }}
        />
      )
    }
    else {
      return (
        <View
          style = {styles.defaultCoverImage}
        />
      )
    }
  }

  _renderProfileImage(image) {
    if(image) {
      return (
        <Image
        style={styles.displayPic}
        source={{ uri: image }}
      />      
      )
    }
  }

  _renderProfileName(name) {
    if(name) {
      return (
        <Text style = {{fontSize: 25, fontWeight: 'bold'}}>
          {name}
        </Text>
      )
    }
  }

  _renderProfileBio(bio) {
    if(bio) {
      return (
        <Text style = {{fontSize: 15, fontStyle: 'italic'}}>
          {bio}
        </Text>
      )
    }
  }


  render() {
    const { isProfileLoading, profile, user } = this.state;

    return (
    
    <ScrollView style = {{backgroundColor: '#fff'}} >
    { !isProfileLoading &&
      <View style={styles.mainContainer}>
          <View style={styles.userCoverPic}>
            {this._renderProfileBanner(profile && profile.banner_image)}
          </View>

          <View style={styles.infoContainer}>
              <View style={styles.logs}>
                  <View style = { styles.displayPicContainer } >
                      {this._renderProfileImage(profile && profile.profile_image)}
                  </View>
                  <View style = { styles.activityContainer } > 
                        <View style = { styles.postAndFollowContainer} >
                            <View style = {styles.posts} >
                                <Text style = {{fontWeight: 'bold'}}> 
                                    {profile && profile.posts.length}
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
                                    title='Edit'
                                    titleStyle={{ fontSize: 13, color: 'black'}}
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
                                    onPress = {() => this.props.navigation.navigate('EditProfile')}
                                  />
                              </View>
                        </View>
                  </View>
              </View>
              <View style = { styles.bioData } >
                  <View style = { styles.name } >
                      {this._renderProfileName(profile && profile.name)}
                  </View>
                  <View style = { styles.status } >
                      {this._renderProfileBio(profile && profile.bio)}
                  </View>
              </View>
          </View>

          <View style={styles.logOutContainer}>
                
                  <Button
                    title='LOGOUT'
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
                    onPress = {() => this.props.navigation.navigate('Intro')}
                  />
              
          </View>

      </View>
    }
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },

  userCoverPic: {
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
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
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
  displayPicContainer: {
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
    marginLeft: 15,
    justifyContent: 'center'
  },
  status: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15
  },
  displayPic: {
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
  },

  coverImage: {
    height: 200,
    width: '100%'
  },
  defaultCoverImage: {
    height: 200,
    width: '100%',
    backgroundColor: '#e1e8f2'
  }
});
