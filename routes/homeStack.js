import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';
import Details from '../screens/details';
import EditPost from '../screens/EditPost';
import NewPost from '../screens/NewPost';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Home"
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

}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#88b972",
            height: 50
        }
    }
});

export default HomeStack;
