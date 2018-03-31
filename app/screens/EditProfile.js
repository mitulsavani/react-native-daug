import React from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    Keyboard, 
    SafeAreaView, 
    Alert, 
    ScrollView,
    ImageEditor,
    DeviceEventEmitter 
} from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';
import { Font, ImagePicker } from 'expo';

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        const { user } = props.navigation.state.params

        this.state = {
            isLoading: false,
            fontLoaded: false,
            ...user
        };
    }

    async componentDidMount(){
        await Font.loadAsync({
            'Comfortaa': require('../../assets/fonts/Comfortaa.ttf'),
        });
        this.setState({fontLoaded: true})
    }

    async submitProfile() {
        this.setState({ isLoading: true })

        const { name, bio, profile_image } = this.state

        var details = {
            'name': name,
            'bio': bio,
            'profile_image': profile_image
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);

            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        try {

            let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            });

            let responseJSON = null

            if (response.status === 200) {
                responseJSON = await response.json();

                console.log(responseJSON)

                this.setState({ isLoading: false })

                Alert.alert(
                    'Profile updated!',
                    '',
                    [
                        { text: "Dismiss", onPress: () => {
                        DeviceEventEmitter.emit('user_profile_updated', {})
                        this.props.navigation.goBack()
                        }}
                    ],
                    { cancelable: false }
                )
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log(responseJSON)

                this.setState({ isLoading: false, errors: responseJSON.errors })

                Alert.alert('Unable to update profile!', `${error}`)
            }
        } catch (error) {
            this.setState({ isLoading: false, response: error })

            Alert.alert('Unable to update profile!', `${error}`)
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
            name: `user_${this.state.id}_profile_image_${new Date().getTime()}.png`,
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

            this.setState({ profile_image: response.body.postResponse.location });
        });
    };
    


    render() {

        const { name, bio, email, profile_image } = this.state
        return (
            <View style={styles.maincontainer}>
                <SafeAreaView style={{ backgroundColor: '#FAFAFA', }}>
                    <Header
                        placement='center'
                        leftComponent={
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Text style={styles.navBar}>Cancel</Text>
                            </TouchableOpacity>
                        }
                        centerComponent={{
                            text: 'Edit Profile',
                            style: {
                                color: '#C83E70', fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: 'Comfortaa'
                            }
                        }}
                        rightComponent={
                            <TouchableOpacity onPress={this.submitProfile.bind(this)}>
                                <Text style={styles.navBar}>Done</Text>
                            </TouchableOpacity>
                        }
                        outerContainerStyles={{ backgroundColor: '#FAFAFA' }}
                    />
                </SafeAreaView>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.DisplayPic}
                        source={{uri: profile_image || ''}}
                        resizeMode='cover'
                    />
                    <TouchableOpacity onPress={ () => this.pickImage() }>
                        <Text style={{ fontSize: 20, marginTop: 10, color: '#62B7E1', fontFamily: 'Comfortaa' }}>
                            Change Photo
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={{ color: '#737373' }}>Name</Text>
                    <Input
                        placeHolder={this.state.name}
                        placeHolderTextColor='blace'
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="done"
                        value={name}
                        onChangeText={(name) => this.setState({ name })}
                        containerStyle={styles.inputElementsContainer}
                    />
                    
                </View>
                <View style={styles.bioContainer}>
                    <Text style={{ color: '#737373' }}>Bio</Text>
                    <Input
                        placeHolder={this.state.bio}
                        placeHolderTextColor='black'
                        style={styles.inputStyle}
                        autoCapitalize="sentences"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="done"
                        value={bio}
                        onChangeText={(bio) => this.setState({ bio })}
                        containerStyle={styles.inputElementsContainer}
                    />
                    
                </View>
                <View style={styles.privateContainer}>
                    <Text style={{ color: '#737373', marginLeft: 5 }}>Personal Information</Text>
                </View>
                <View style={styles.emailContainer}>
                    <Text style={{ color: '#737373' }}>Email</Text>
                    <Input
                        placeHolder={this.state.email}
                        placeHolderTextColor='black'
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="done"
                        value={email}
                        onChangeText={(email) => this.setState({ email })}
                        containerStyle={styles.inputElementsContainer}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {

        backgroundColor: '#EFEFF5',
        justifyContent: 'center',
    },

    imageContainer: {
        height: 300,
        backgroundColor: '#EFEFF5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    nameContainer: {
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },

    bioContainer: {
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },

    privateContainer: {
        height: 50,
        backgroundColor: '#EFEFF5',
        justifyContent: 'center'
    },

    emailContainer: {
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },

    DisplayPic: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    inputStyle: {
        width: '100%',
        borderColor: '#aaaaaa',
        fontSize: 18,
        color: 'black',
    },
    inputElementsContainer: {
        width: '100%',
        borderColor: '#aaaaaa',
    },
    navBar: {
        fontSize: 16,
        color: '#C83E70',
        fontFamily: 'Comfortaa'
    }
});