import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { Font } from 'expo';

import { Button, Icon, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ENV_URL, timeSince, getUserId } from '../utils/helpers';

export default class PostScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Post',
        headerTintColor: '#C83E70',
        headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Comfortaa',
            fontWeight: 'bold',
        }
    });

    constructor(props) {
        super(props);

        const postId = props.navigation.state.params && props.navigation.state.params.postId

        this.state = {
            fontLoaded: false,
            postId: postId || null,
            member: null,
            liked: false,
            comment: null
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Comfortaa': require('../../assets/fonts/Comfortaa.ttf'),
            'ComfortaaBold': require('../../assets/fonts/ComfortaaBold.ttf')
        });

        const { postId } = this.state

        if (postId === null) {
            Alert.alert(
                'Unable to display Post!',
                'Please try again later',
                [
                    {
                        text: "OK", onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }
                ],
                { cancelable: false }
            )
        } else {
            this.fetchPost()
        }

        getUserId()
            .then(res => {
                this.setState({ userId: res })
                this.fetchUser()
            })
            .catch(err => {
                alert("An error occurred")
            });

        this.setState({ fontLoaded: true });
    }

    async fetchPost() {
        this.setState({ isLoading: true });
        const { postId } = this.state

        try {
            const response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}`, {
                method: 'GET'
            });
            const responseJSON = await response.json();

            if (response.status === 200) {
                console.log(responseJSON);

                this.setState({ member: responseJSON, isLoading: false })
            } else {
                const error = responseJSON.message

                console.log("failed" + error);
            }
        } catch (error) {
            console.log("failed" + error);
        }
    }

    async fetchUser() {
        this.setState({ isLoading: true });

        try {
            let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userId}`, {
                method: 'GET'
            });

            let responseJSON = null

            if (response.status === 200) {
                responseJSON = await response.json();

                console.log(responseJSON);

                this.setState({ user: responseJSON, isLoading: false })
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log("failed" + error);
            }
        } catch (error) {
            console.log("failed" + error);
        }
    }

    displayComment(comment, index) {
        const { navigate } = this.props.navigation

        return (
            <View style={styles.commentContainer} key={index}>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => navigate('Profile', { isHeaderShow: true, userId: comment.user.id })}>
                    <Image source={{ uri: comment.user.profile_image || '' }} style={styles.commentAvatar} />
                </TouchableOpacity>
                <View style={styles.postUsernameLocationContainer}>
                    <TouchableOpacity style={styles.postUsernameView}
                        onPress={() => navigate('Profile', { isHeaderShow: true, userId: comment.user.id })}>
                        <Text style={styles.commentUsernameLabel}>{comment.user.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.postLocationView}>
                        <Text style={styles.commentContentLabel}>{comment.description}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderComments() {
        const { comments } = this.state.member

        return (
            <View style={styles.commentsContainer}>
                {
                    comments.map((comment, index) => {
                        return this.displayComment(comment, index)
                    })
                }
            </View>
        )
    }

    async postComment() {
        const { comment, postId, user } = this.state

        var details = {
            'comment': comment
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);

            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        try {
            let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}/comment/${user.id}`, {
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

                this.fetchPost()
                this.setState({ comment: null })

                Alert.alert(
                    'Comment added!',
                    '',
                    [
                        {
                            text: "Dismiss", onPress: () => {
                                console.log("comment added!")
                            }
                        }
                    ],
                    { cancelable: false }
                )
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log(responseJSON)

                this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

                Alert.alert('Unable to add new comment!', `${error}`)
            }
        } catch (error) {
            this.setState({ isLoading: false, error, comment: null })

            Alert.alert('Unable to add new comment!', `${error}`)
        }
    }

    renderAddComment() {
        const { comment } = this.state

        return (
            <View style={styles.commentsContainer}>
                <View style={styles.commentContainer}>
                    <Icon
                        name='ios-chatbubbles'
                        color='black'
                        type="ionicon"
                        size={25}
                        containerStyle={{ marginHorizontal: 10 }}
                    />
                    <Input containerStyle={{ width: '100%' }}
                        value={comment}
                        onChangeText={comment => this.setState({ comment })}
                        placeholder="Enter a comment"
                        placeholderTextColor="gray"
                        inputStyle={{ color: 'black', fontFamily: 'Comfortaa', fontSize: 14 }}
                        onSubmitEditing={() => {
                            this.postComment()
                        }}
                    />
                </View>
            </View>
        )
    }

    async postLike() {
        const { postId, user } = this.state

        try {
            let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}/like/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: null
            });

            let responseJSON = null

            if (response.status === 201) {
                responseJSON = await response.json();

                console.log(responseJSON)

                this.fetchPost()
                this.setState({ liked: true })
            } else {
                responseJSON = await response.json();
                const error = responseJSON.message

                console.log(responseJSON)

                this.setState({ isLoading: false, errors: responseJSON.errors, liked: false })

                Alert.alert('Unable to like post', `${error}`)
            }
        } catch (error) {
            this.setState({ isLoading: false, error, liked: false })

            Alert.alert('Unable to like post', `${error}`)
        }
    }

    loadingView() {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    contentView() {
        const { navigate } = this.props.navigation
        const { member, liked } = this.state

        const Component = member && member.comments ? KeyboardAwareScrollView : KeyboardAvoidingView

        return (
            <Component style={styles.mainContent}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}>
                <View style={styles.postContainer} key={member}>
                    <View style={styles.postHeaderContainer}>
                        <TouchableOpacity onPress={() => navigate('Profile', { isHeaderShow: true, userId: member.user.id })} activeOpacity={0.8}>
                            <Image source={{ uri: member.user.profile_image || '' }} style={styles.avatar} />
                        </TouchableOpacity>
                        <View style={styles.postUsernameLocationContainer}>
                            <TouchableOpacity
                                style={[styles.postUsernameView, member.location && { marginTop: 10 }]}
                                onPress={() => navigate('Profile', { isHeaderShow: true, userId: member.user.id })}
                            >
                                <Text style={styles.nameLabel}>{member.user.name}</Text>
                            </TouchableOpacity>
                            {member.location &&
                                <View style={styles.postLocationView}>
                                    <Text style={styles.locationLabel}>{member.location}</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View>
                        <View style={styles.postContentContainer}>
                            <Image source={{ uri: member.image || '' }} style={styles.postImage} resizeMode="cover" />
                            <Text style={styles.postCaption}>{member.description}</Text>
                        </View>
                    </View>
                    <View style={styles.postFooterContainer}>
                        <View style={styles.postDateView}>
                            <Text style={styles.postDateText}>{timeSince(member.createdAt)}</Text>
                        </View>
                        <View style={[styles.postActionView, { marginRight: 20 }]}>
                            <Icon
                                name={liked ? "ios-heart" : "ios-heart-outline"}
                                color={liked ? 'red' : null} type="ionicon" size={25}
                                onPress={() => this.postLike()}
                            />
                            <Text style={styles.postActionText}>{member.likes && member.likes.length || 0}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.sectionHeaderText}>{member.comments ? member.comments.length : 'NO'} COMMENTS</Text>
                {member.comments && this.renderComments()}
                {this.renderAddComment()}
            </Component>
        )
    }

    render() {
        const { member, isLoading, fontLoaded } = this.state

        return (
            fontLoaded && (isLoading || member === null ? this.loadingView() : this.contentView())
        );
    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    postContainer: {
        backgroundColor: 'white',
        borderColor: '#aaaaaa'
    },
    postHeaderContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#aaaaaa',
    },
    commentContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'rgba(244,244,244,1)',
    },
    postUsernameLocationContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    postUsernameView: {
        flex: 1,
        justifyContent: 'center'
    },
    postLocationView: {
        flex: 1,
        justifyContent: 'center'
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 10
    },
    commentAvatar: {
        height: 25,
        width: 25,
        borderRadius: 13.5,
        marginLeft: 10
    },
    nameLabel: {
        fontSize: 18,
        color: '#455C7B',
        marginLeft: 10,
        fontWeight: 'bold',
        fontFamily: 'Comfortaa'
    },
    commentUsernameLabel: {
        fontSize: 14,
        color: '#44484B',
        marginLeft: 10,
        fontFamily: 'Comfortaa'
    },
    commentContentLabel: {
        flex: 1,
        fontSize: 15,
        color: '#656A73',
        marginLeft: 10,
        fontFamily: 'Comfortaa'
    },
    locationLabel: {
        flex: 1,
        fontSize: 15,
        color: '#44484B',
        marginLeft: 10,
        fontFamily: 'Comfortaa'
    },
    postContentContainer: {
        backgroundColor: '#f9f9f9'
    },
    postImage: {
        width: '100%',
        height: 250
    },
    postCaption: {
        margin: 10,
        color: '#44484B',
        fontSize: 15,
        fontFamily: 'Comfortaa'
    },
    postFooterContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    postDateView: {
        flex: 3,
        justifyContent: 'center'
    },
    postDateText: {
        marginLeft: 20,
        color: '#44484B',
        fontSize: 11,
        fontFamily: 'Comfortaa'
    },
    postActionView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    postActionText: {
        marginLeft: 10,
        color: '#44484B',
        fontSize: 15,
        fontFamily: 'Comfortaa'
    },
    sectionHeaderText: {
        fontSize: 13,
        fontFamily: 'Comfortaa',
        color: '#aaaaaa',
        marginVertical: 10,
        marginLeft: 10
    },
    commentsContainer: {
        backgroundColor: 'white'
    }
});