import { StackNavigator } from 'react-navigation';
import IntroScreen from '../screens/IntroScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailsScreen from '../screens/PostDetails';

export default StackNavigator ({

    Profile:
    {
        screen: ProfileScreen
    },
    PostDetails:
    {
        screen: PostDetailsScreen
    },
},
{
    initialRouteName: 'Profile',
});

