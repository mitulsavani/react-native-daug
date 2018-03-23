import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,Alert } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Rocco_DisplayPic from '../../assets/Rocco_displayPic.jpg';

export default class CreatePost extends React.Component {

constructor(props) {
    super(props);

    this.state = {
        newPostContent: '',
        isLoading: false
    };
}
async sharePressed() {
    this.setState({ isLoading: true })

    const { newPostContent,isLoading } = this.state
    const { navigate } = this.props.navigation

    var details = {
        'description': newPostContent,
    };

    var formBody = [];

    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);

        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
        let response = await fetch(`https://daug-app.herokuapp.com/api/users/7/posts`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
        });   

        let responseJSON = null

    if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
            'Signed Up!',
            'You have successfully signed up!',
            [
                { text: "Continue", onPress: () => navigate("SocialFeed") }
            ],
            { cancelable: false }
        )
        } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
        }
    } catch (error) {
        this.setState({ isLoading: false, response: error })

        console.log(error)

        Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
}
render() {
    const{newPostContent} = this.state
    return (
    <View style={styles.container}>
        <Header
            placement = 'center'
            leftComponent = {
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text style = {styles.headerButton} > Cancel </Text>
                </TouchableOpacity>
            }
            centerComponent = {{
                text: 'Create Post',
                style: {
                color: '#C83E70', fontSize: 20,
                fontWeight: 'bold',
                }
            }}   
            rightComponent = {
                <TouchableOpacity onPress={() => this.sharePressed()}>
                    <Text style = {styles.headerButton} > Share </Text>
                </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#FAFAFA' }}
            
        />
            <View style = {styles.infoContainer}>
                <View style = {styles.authorpicture}>
                    <Image style={styles.roccoDisplayPic} source = {Rocco_DisplayPic} />
                </View>
                <View style = {styles.authorInfo}>
                    <View style = {styles.authorName}>
                        <Text style = {{fontSize: 20, color: '#4045A8', fontWeight: 'bold', fontFamily: 'Futura'  }}> 
                            Rocco
                        </Text>
                    </View>
                    <View style = {styles.location}>
                    <TouchableOpacity style={styles.locationContainer}>
                        <SimpleLineIcons
                            name="location-pin"
                            size={12}
                        />
                        <Text style={styles.locationName}>Add Location</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style = {styles.postPara}>
                <TextInput
                    style={styles.content}
                    multiline
                    placeholder="What's on your mind?"
                    placeholderTextColor="grey"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    onChangeText={(newPostContent) => this.setState({newPostContent})}
                />
            </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    //flex: 1,
    justifyContent: 'center',
    marginTop: 30
},

infoContainer: {
    height: 80,
    backgroundColor: '#EFEFF5', 
    flexDirection: 'row',
    marginTop: 30
},

postPara: {
    height: 300,
    backgroundColor: 'white',

},

authorpicture: {
    flex: 2,
},
authorInfo :{
    flex: 7,
    
},
roccoDisplayPic :{
    height:80,
    width: 80,
    borderRadius: 40,
},
authorName: {
    flex: 1.5,
    marginLeft: 10,
    justifyContent: 'center'
},
location : {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
},
locationContainer: {
    flex: 1,
    flexDirection: 'row',
},
locationName: {
    marginLeft: 4,
    fontSize: 13,
    fontFamily: 'Futura'
},
content: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Futura'
},
headerButton: {
    color: '#C83E70',
    fontSize: 20,
    fontWeight: 'bold',
}

});