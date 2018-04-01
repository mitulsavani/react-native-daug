import { StackNavigator } from 'react-navigation';
import PostDetailsScreen from '../screens/PostDetails';
import SocialFeedScreen from '../screens/SocialFeedScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default StackNavigator ({

    SocialFeed:
    {
        screen: SocialFeedScreen
    },
    PostDetails:
    {
        screen: PostDetailsScreen
    },
    Profile: 
    {
        screen: ProfileScreen
    }

},
{
    initialRouteName: 'SocialFeed',
});

