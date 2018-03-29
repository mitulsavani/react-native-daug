import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, NativeModules, Platform, TouchableHighlight, Alert } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { Icon } from 'react-native-elements';
import {Font} from 'expo';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import {SOCIAL_FEED_MOCK_DATA} from '../utils/constant';
const { StatusBarManager } = NativeModules;

export default class SocialFeedScreen extends React.Component { 
  static navigationOptions = ({ navigation }) => ({
    title: 'Daug',
    headerTintColor: '#C83E70',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa',},
  });
  
  
  constructor(props){
    super(props);

    this.state = {
      screen: '',
      commented: false,
      liked: false,
      fontLoaded: false,
      isFeedLoading: false,
      posts: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Comfortaa': require('../../assets/fonts/Comfortaa.ttf'),
      'ComfortaaBold': require('../../assets/fonts/ComfortaaBold.ttf')
    });

    this.setState({ fontLoaded: true });
    this.getFeed()
  }
  

  async getFeed() {
    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/feed`, {
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
          isFeedLoading: false,
          posts: responseJSON,
        })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isFeedLoading: false, response: error })

      console.log(error)

      Alert.alert('Unable to get the feed. Please try again later')
    }
  }
  
  _renderProfileImage(image) {
    if(image) {
      return (
        <Image style={styles.avatar} 
          source = {{uri: image}}
        />
      )
    }
  }

  _renderPostImage(image) {
    if(image) {
      return (
        <Image style={styles.postImage} 
          resizeMode="cover"
          source = {{uri: image}}
        />
      )
    }
  }
  
  _renderPostDescription(description) {
    if(description) {
      return (
        <Text style = {{marginLeft: 10, marginTop: 10, fontFamily: 'Comfortaa'}}> 
          {description}
        </Text>
      )
    }
  }


  renderPost(item) {
    const {liked, commented, isFeedLoading, post, user} = this.state;

    return(
      <View style = {styles.postContainer}>
          <View style = {styles.postHeader}>
              <TouchableOpacity style = {styles.displayImageContainer} onPress={() => this.setState({ screen: 'ProfileScreen', selectedIndex: item.id })} >
                {this._renderProfileImage(item.user.profile_image)}
              </TouchableOpacity>
              
              <View style = {styles.nameAndImageContainer} >
                  <View style = {styles.avatarName} >
                      <Text style = {{fontSize: 17, fontFamily: 'ComfortaaBold', }}> 
                        {item.user.name} 
                      </Text>
                  </View>
                  <View style = {styles.location} >
                      <Text style = {{ color: '#3B3C40', fontSize: 12, fontFamily: 'Comfortaa', fontStyle: 'italic' }}> 
                        {item.location} 
                      </Text>
                  </View>
              </View>
          </View>
          <View style = {styles.postImageCaptionContainer} >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PostDetails')}>
                {this._renderPostImage(item.image)}
              </TouchableOpacity>
              {this._renderPostDescription(item.description )}
          </View>
          
          <View style = {styles.postLogs} >
              <View style = {styles.postDate} >
                  <Text style = {{fontSize: 11, color: '#4C4B4B', fontFamily: 'Comfortaa'}}> 2hr </Text>
              </View>
              <View style = {styles.postActionView} >
                  <Icon
                  name={commented ? "ios-chatbubbles" : "ios-chatbubbles-outline"}
                  color={commented ? 'black' : null} type="ionicon" size={25}
                  onPress={() => this.setState({ commented: !commented })}
                  />
                  <Text style={styles.postActionText}>10</Text>
              </View>
              <View style={[styles.postActionView, {marginRight: 20}]}>
                  <Icon
                    name={liked ? "ios-heart" : "ios-heart-outline"}
                    color={liked ? 'red' : null} type="ionicon" size={25}
                    onPress={() => this.setState({ liked: !liked })}
                  />
                  <Text style={styles.postActionText}>200</Text>
              </View>
          </View>
      </View>
    )
  }

  render() {
    const { isFeedLoading, fontLoaded, posts } = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
        <View style={styles.createPostContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePost')}>
              <Text style={styles.createPostLabel}>Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePost')}>
            <Icon
                name='picture'
                type='simple-line-icon'
                size={20}
                iconStyle={styles.photoPostIcon}
              />
            </TouchableOpacity>
          </View>
          { (this.state.fontLoaded && !isFeedLoading) &&
            <View style = {styles.mainContent} >
                <FlatList style={styles.list} 
                  keyExtractor = {(item, index) => index}
                  extraData = {this.state}
                  data = {posts}
                  renderItem={({item}) => this.renderPost(item)}
                />
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT,
  },

  list: {
    backgroundColor: 'white'
  },

  mainContent:{
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  postContainer: {
      borderBottomWidth: 1,
      borderColor: '#aaaaaa'
  },
  postHeader: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
  },
  postImageCaptionContainer: {
    backgroundColor: '#f9f9f9'
  },
  postLogs: {
    height: 50,
    flexDirection: 'row',
  },
  displayImageContainer: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  nameAndImageContainer: {
    flex: 9,
    
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 10
  },
  avatarName: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 5
  },
  location: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 5
  },
  postImage: {
    width: '100%',
    height: 250,
  },
  postDate: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 20,
  },
  postActionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  postActionText: {
    marginLeft: 10,
    color: '#44484B',
    fontSize: 15,
    fontFamily: 'Comfortaa'
  },

  createPostContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fcfcfd',
    borderBottomWidth: 0.3,
    borderBottomColor: '#aaaaaa',
  },

  createPostLabel:{
    color: '#2F80ED',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginLeft: 20,
  },

  photoPostIcon: {
    marginRight: 20,
    color: '#ff99cc',
  }
  
});
