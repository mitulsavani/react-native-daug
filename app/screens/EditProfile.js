import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import Rocco_DisplayPic from '../../assets/Rocco_displayPic.jpg';
import { Input, Button } from 'react-native-elements';

export default class EditProfile extends React.Component {
constructor(props)  {
    super(props)

    this.state = {
        name: 'Rocco',
        bio: 'Tell me more about you...',
        email: 'rocco@daug.com'
    };
}




render() {

    const { name, bio, email} = this.state
    return (
        <View style={styles.maincontainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.roccoDisplayPic} source = {Rocco_DisplayPic} />
                <TouchableOpacity>
                    <Text style = {{fontSize: 20, marginTop: 10, color: '#62B7E1', fontFamily: 'Futura'}}> 
                        Change Photo 
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
                <Text style={{color: '#737373'}}>Name</Text>
                <Input
                    placeHolder = 'Tell me more about you'
                    placeHolderTextColor = 'blace'
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="done"
                    value={name}
                    onChangeText={(name) => this.setState({name})}
                    containerStyle = {styles.inputElementsContainer}
                />

            </View>
            <View style={styles.bioContainer}>
                <Text style={{color: '#737373'}}>Bio</Text>
                <Input
                    placeHolder = 'Tell me more about you'
                    placeHolderTextColor = 'black'
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="done"
                    value={bio}
                    onChangeText={(bio) => this.setState({bio})}
                    containerStyle = {styles.inputElementsContainer}
                />

            </View>
            <View style={styles.privateContainer}>
                <Text style={{color: '#737373', marginLeft: 5}}>Personal Information</Text>
            </View>
            <View style={styles.emailContainer}>
            <Text style={{color: '#737373'}}>Bio</Text>
                <Input
                    placeHolder = 'Tell me more about you'
                    placeHolderTextColor = 'black'
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="done"
                    value={email}
                    onChangeText={(email) => this.setState({email})}
                    containerStyle = {styles.inputElementsContainer}
                />

            </View>
        </View>
        
    );
}
}

const styles = StyleSheet.create({
maincontainer: {
    //flex: 1,
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
    height:150,
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



});