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
      isCommented: false,
      isLiked: false
    };
  }

  renderPost(member){
    const {isLiked, isCommented} = this.state;

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
                    {/* leftIcon = {
                      <Entypo
                        name = 'location-pin'
                        size = {24}
                        color = 'white'
                      />
                    } */}
                      <Text style = {{fontSize: 15, fontWeight: 'bold', fontStyle: 'italic' }}> 
                        {member.location} 
                       </Text>
                  </View>
              </View>
          </View>
          <View style = {styles.postImageCaptionContainer} >
              <Text> Image </Text>
          </View>
          <View style = {styles.postLogs} >
              <Text> Logs </Text>
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
  scrollView: {
    flex: 1,
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
    height: 250,
    backgroundColor: 'red'
  },
  postLogs: {
    height: 50,
    backgroundColor: 'lightgreen'
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
  }
});
