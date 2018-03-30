import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Vibration, 
  Image, 
  ScrollView,
  Dimensions,
  DeviceEventEmitter,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { Font } from 'expo';
import { onSignOut, ENV_URL, getUserId } from '../utils/helpers';

const DEVICE_WIDTH = Dimensions.get('window').width;

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

    const userId = props.navigation.state.params && props.navigation.state.params.userId
    const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow

    this.state = {
      fontLoaded: false,
      isProfileLoading: false,
      userId: userId || null,
      user: null,
      isHeaderShow: isHeaderShow || false
    };
  }


  async componentDidMount() {
    await Font.loadAsync({
      'Comfortaa': require('../../assets/fonts/Comfortaa.ttf'),
      'ComfortaaBold': require('../../assets/fonts/ComfortaaBold.ttf')
    });

    this.setState({ fontLoaded: true });
    const{ userId } = this.state;

    if(userId === null)
    {
      getUserId()
        .then(res => {
          this.setState({userId: res})
          this.state.user === null && this.fetchUser()
        })
        .catch(err => {
          alert("An error occurred")
        });  
    }
    else {
      this.fetchUser()

      getUserId()
        .then(res => {
          this.setState({ post_detail_home_user_id: res })
        })
        .catch(err => {
          alert("An error occurred")
        });
    }
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('user_profile_updated', (e) => {
      this.fetchUser()
    })
  }

  async fetchUser() {
    this.setState({ isProfileLoading: true });

    try {
      let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}`, {
        method: 'GET'
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON);

        this.setState({ user: responseJSON, isProfileLoading: false })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log("failed" + error);
      }
    } catch (error) {
      console.log("failed" + error);
    }
  }

  _renderProfileBanner(image) {
    if (image) {
      return (
        <Image
          style={styles.coverImage}
          source={{ uri: image }}
          resizeMethod='cover'
        />
      )
    }
    else {
      return (
        <View
          style={styles.defaultCoverImage}
        />
      )
    }
  }

  _renderProfileImage(image) {
    if (image) {
      return (
        <Image
          style={styles.displayPic}
          source={{ uri: image }}
        />
      )
    }
  }

  _renderProfileName(name) {
    if (name) {
      return (
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          {name}
        </Text>
      )
    }
  }

  _renderProfileBio(bio) {
    if (bio) {
      return (
        <Text style={{ fontSize: 15, fontStyle: 'italic' }}>
          {bio}
        </Text>
      )
    }
  }

  loadingView() {
    return(
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  contentView()
  {
    const { user, isHeaderShow } = this.state;
    const { navigate } = this.props.navigation;
    
    return (
      <ScrollView style={{ backgroundColor: '#fff' }} >
        <View style={styles.mainContainer}>
          <View style={styles.userCoverPic}>
            <Image
            style={styles.coverImage}
            source={{ uri: user && user.banner_image || '' }}
            resizeMethod='cover'
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.logs}>
              <View style={styles.displayPicContainer} >
                {this._renderProfileImage(user && user.profile_image)}
              </View>
              <View style={styles.activityContainer} >
                <View style={styles.postAndFollowContainer} >
                  <View style={styles.posts} >
                    <Text style={{ fontWeight: 'bold' }}>
                      {user && user.posts.length}
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      Post
                    </Text>
                  </View>
                  <View style={styles.followers} >
                    <Text style={{ fontWeight: 'bold' }}>
                      501
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      Followers
                    </Text>
                  </View>
                  <View style={styles.following} >
                    <Text style={{ fontWeight: 'bold' }}>
                      99
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      Following
                    </Text>
                  </View>
                </View>

                <View style={styles.editProfileContainer} >
                  <View style={styles.editButton}>
                    <Button
                      title='Edit'
                      titleStyle={{ fontSize: 13, color: 'black' }}
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
                      onPress={() => this.props.navigation.navigate('EditProfile')}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bioData} >
              <View style={styles.name} >
                {this._renderProfileName(user && user.name)}
              </View>
              <View style={styles.status} >
                {this._renderProfileBio(user && user.bio)}
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
              onPress={() => this.props.navigation.navigate('Intro')}
            />

          </View>

        </View>
      </ScrollView> 
    )
  }
  render() {
    const { isProfileLoading, user, fontLoaded, isHeaderShow } = this.state;
    const { navigate } = this.props.navigation;

    return (
      this.state.fontLoaded && ( isProfileLoading || user === null ? this.loadingView() : this.contentView() )
      
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  userCoverPic: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },

  infoContainer: {
    height: 100,
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
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: -20
  },
  postAndFollowContainer: {
    flex: 2,
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
  posts: {
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
