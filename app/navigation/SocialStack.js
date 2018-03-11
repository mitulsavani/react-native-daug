import { StackNavigator } from 'react-navigation';
import PostDetailsScreen from '../screens/PostDetails';
import SocialFeedScreen from '../screens/SocialFeedScreen';

export default StackNavigator ({

    SocialFeed:
    {
        screen: SocialFeedScreen
    },
    PostDetails:
    {
        screen: PostDetailsScreen
    },
},
{
    initialRouteName: 'SocialFeed',
});

