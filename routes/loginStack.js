import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import App from '../App';
import { createAppContainer } from 'react-navigation';

const screens = {
    LoginScreen: {
        screen: LoginScreen
    },
    Home: {
        screen: App,
        navigationOptions: {
            headerShown: false
        }
    }
}

const LoginStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#88b972",
            height: 50
        }
    }
});

export default createAppContainer(LoginStack);
