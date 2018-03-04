import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';


import {SOCIAL_FEED_MOCK_DATA} from '../utils/constant';

export default class SocialFeedScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      screen: '',
      commented: false,
      liked: false,
      //fontLoaded:false
    };
  }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     'Comfortaa': require('../../assets/fonts/Comfortaa.ttf')
  //   });

  //   this.setState({ fontLoaded: true });
  // }

  renderPost(member){
    const {liked, commented} = this.state;

    return(
      <View style = {styles.postContainer} key={member}>
          <View style = {styles.postHeader} >
              <View style = {styles.displayImageContainer} >
                  <Image source={{ url: member.image }} style={styles.avatar} />              
              </View>
              
              <View style = {styles.nameAndImageContainer} >
                  <View style = {styles.avatarName} >
                      <Text style = {{fontSize: 20, fontWeight: 'bold', }}> 
                        {member.name} 
                       </Text>
                  </View>
                  <View style = {styles.location} >
                      <Text style = {{ color: '#3B3C40', fontSize: 15, fontWeight: 'bold', fontStyle: 'italic' }}> 
                        {member.location} 
                       </Text>
                  </View>
              </View>
          </View>
          <View style = {styles.postImageCaptionContainer} >
              <Image source={{ url: member.post.image }} style={styles.postImage} resizeMode="cover" />
              <Text style = {{marginLeft: 10, marginTop: 10}}> 
                  {member.post.caption}
              </Text>
          </View>
          
          <View style = {styles.postLogs} >
              <View style = {styles.postDate} >
                  <Text style = {{fontSize: 11, color: '#4C4B4B'}}> {member.post.date} </Text>
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
    return (
      <ScrollView>
              <FlatList style={styles.list} 
                keyExtractor = {(item, index) => index}
                extraData = {this.state}
                data = {SOCIAL_FEED_MOCK_DATA}
                renderItem = {({ item }) => this.renderPost(item)}
              />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  }
  
});
