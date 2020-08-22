import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';
import Details from '../screens/details';

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
