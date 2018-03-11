import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class PostDetails extends React.Component {
render() {
    return (
    <View style={styles.mainContainer}>
        <Text>PostDetails</Text>
    </View>
    );
}
}

const styles = StyleSheet.create({
mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});