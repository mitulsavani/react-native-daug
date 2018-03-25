import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Keyboard, SafeAreaView, Alert, ScrollView } from 'react-native';
import Rocco_DisplayPic from '../../assets/Rocco_displayPic.jpg';
import { Input, Button, Header } from 'react-native-elements';

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            name: '',
            bio: '',
            email: '',
            profile_image: ''
        };
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
            let response = await fetch(`https://daug-app.herokuapp.com/api/users/9`, {
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
                    'Success!',
                    'Your profile is updated!',
                    [
                        { text: "Continue", onPress: () => this.props.navigation.goBack() }
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
                        style={styles.roccoDisplayPic}
                        source={Rocco_DisplayPic}
                        resizeMode='cover'
                    />
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, marginTop: 10, color: '#62B7E1', fontFamily: 'Futura' }}>
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

    roccoDisplayPic: {
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
        color: '#C83E70'
    }
});