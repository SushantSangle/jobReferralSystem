import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';
import Details from '../screens/details';
import EditPost from '../screens/EditPost';
import NewPost from '../screens/NewPost';
import LoginScreen from '../screens/LoginScreen';
import DynamicStyle from '../utils/DyamicStyle';

const screens = {
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            title: "Login"
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Home",
            headerLeft: () => null
        }
    },
    Details: {
        screen: Details,
        navigationOptions: {
            title: "Details"
        }
    },
    EditPost: {
        screen: EditPost,
        navigationOptions: {
            title: "Edit Post Details"
        }
    },
    NewPost: {
        screen: NewPost,
        navigationOptions: {
            title: "Add New Post"
        }
    },
    // ReferPerson: {
    //     screen: ReferPerson,
    //     navigationOptions: {
    //         title: "Refer Person"
    //     }
    // },
    // ReferredPeople: {
    //     screen: ReferredPeople,
    //     navigationOptions: {
    //         title: "Referred People"
    //     }
    // }

}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: DynamicStyle.bgColor,
            height: 50
        }
    }
});

export default HomeStack;
