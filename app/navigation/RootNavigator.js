import { StackNavigator } from 'react-navigation';

import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';
import ProfileStack from './ProfileStack';

//Connecting both IntroStack and HomeTabs
export default StackNavigator ({

        Intro:
        {
            screen: IntroStack
        },
        Home:
        {
            screen: HomeTabs
        },
    },
    {
        initialRouteName: 'Intro',
        mode: 'modal',
        headerMode: 'none'
    });