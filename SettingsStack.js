import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from '../screens/SettingsScreen';
import changeTheme from '../screens/changeTheme';

const screens = {
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            title: "Settings"
        }
    },
    changeTheme: {
        screen: changeTheme,
        navigationOptions: {
            title: "Change Theme"
        }
    },
}

const SettingsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#88b972",
            height: 50
        }
    }
});

export default SettingsStack;
