import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    TextInput, 
    Alert, 
    ImageEditor, 
    DeviceEventEmitter  
} from 'react-native';
import { Header, Button } from 'react-native-elements';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Font, ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';

import { getUserId, ENV_URL } from '../utils/helpers';

export default class CreatePost extends React.Component {

constructor(props) {
    super(props);

    const { member } = props.navigation.state.params
    this.state = {
        newPostContent: '',
        isLoading: false,
        fontLoaded: false,
        member,
        image: null
    };
}

async componentDidMount() {
    await Font.loadAsync({
        'Comfortaa': require('../../assets/fonts/Comfortaa.ttf'),
    });
    getUserId()
        .then(res => this.setState({ userId: res }))
        .catch(err => { console.log(err); alert("An error occurred")});

    this.setState({ fontLoaded: true });

}
async sharePressed() {
    this.setState({ isLoading: true })

    const { newPostContent,isLoading, image } = this.state
    const { navigate } = this.props.navigation

    var details = {};

    if(image !== null)
    {
        details.image = image
    }
    if(newPostContent !== null && newPostContent.length > 0)
    {
        details.description = newPostContent
    }

    var formBody = [];

    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);

        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
        let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userId}/posts`, {
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
            'Post Created',
            '',
            [
                {
                    text: "Dismiss", onPress: () => {
                        DeviceEventEmitter.emit('new_post_created', {})
                        this.props.navigation.goBack()
                    }
                }
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

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (result.cancelled) {
            console.log('Profile Image cancelled');
            return;
        }

        let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(result.uri,
                {
                    offset: { x: 0, y: 0 },
                    size: { width: result.width, height: result.height },
                    displaySize: { width: result.width, height: result.height },
                    resizeMode: 'contain',
                },
                (uri) => resolve(uri),
                () => reject(),
            );
        });


        const file = {
            uri: resizedUri,
            name: `user_${this.state.userId}_post_${new Date().getTime()}.png`,
            type: "image/png"
        }

        const options = {
            keyPrefix: "uploads/",
            bucket: "daug",
            region: "us-east-1",
            accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
            secretKey: "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",
            successActionStatus: 201
        }

        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");

            console.log(response.body);
            console.log(response.body.postResponse.location)
            console.log(response.body.postResponse.location)
            this.setState({ image: response.body.postResponse.location });
            console.log(response.body.postResponse.location)
        });
    };

    render() {
        const { newPostContent, image, member } = this.state
        const { goBack } = this.props.navigation
        return (
            <View style={styles.container}>
                <Header
                    placement='center'
                    leftComponent={
                        <TouchableOpacity onPress={() => goBack()}>
                            <Text style={styles.headerButton} > Cancel </Text>
                        </TouchableOpacity>
                    }
                    centerComponent={{
                        text: 'Create Post',
                        style: {
                            color: '#C83E70', 
                            fontSize: 20,
                            fontWeight: 'bold',
                            fontFamily: 'Comfortaa'
                        }
                    }}
                    rightComponent={
                        <TouchableOpacity onPress={() => this.sharePressed()}>
                            <Text style={styles.headerButton} > Share </Text>
                        </TouchableOpacity>
                    }
                    outerContainerStyles={{ backgroundColor: '#FAFAFA' }}

                />
                <View style={styles.infoContainer}>
                    <View style={styles.authorpicture}>
                        <TouchableOpacity activeOpacity={0.8} >
                            <Image 
                            style={styles.roccoDisplayPic} 
                            source={{uri: member && member.profile_image || ''}} 
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.authorInfo}>
                        <View style={styles.authorName}>
                            <Text style={{ fontSize: 20, color: '#4045A8', fontWeight: 'bold', fontFamily: 'Comfortaa' }}>
                                { member && member.name}
                            </Text>
                        </View>
                        <View style={styles.location}>
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
                <View style={styles.postPara}>
                    <TextInput
                        style={styles.content}
                        multiline
                        placeholder="What's on your mind?"
                        placeholderTextColor="grey"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        onChangeText={(newPostContent) => this.setState({ newPostContent })}
                    />
                </View>
                <View style={styles.createPostImageContainer}>
                    {this.state.image ?
                        <Image source={{ uri: image }} style={styles.postImage} resizeMode="cover" /> :
                        <View style={styles.createAddPostImageContainer}>
                            <Text style={styles.orLabel}>OR</Text>
                            <TouchableOpacity style={styles.cameraIconView} onPress={() => this.pickImage()}>
                                <SimpleLineIcons
                                    name='camera'
                                    style={{ color: 'grey' }}
                                    size={42}
                                />
                            </TouchableOpacity>
                        </View>
                    }
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
    height:200,
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
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa'
},
createPostImageContainer: {
    display: 'flex'
},
postImage: {
    width: '100%',
    height: 250
},
createAddPostImageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 200
},
orLabel: {
    flex: 1,
    color: 'grey',
    fontSize: 26,
    marginTop: 40,
    fontFamily: 'Comfortaa',
    fontWeight: 'bold'
},
cameraIconView: {
    flex: 1,
},

});