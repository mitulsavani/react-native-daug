import { StackNavigator } from 'react-navigation';
import CreatePostScreen from '../screens/CreatePost';
import SocialStack from './SocialStack';

const SocialNavigator = StackNavigator({
SocialStack: {
    screen: SocialStack,
},
CreatePost: {
    screen: CreatePostScreen,
},
}, {
initialRouteName: 'SocialStack',
mode: 'modal',
navigationOptions: {
    gesturesEnabled: false,
},
});

export default SocialNavigator;