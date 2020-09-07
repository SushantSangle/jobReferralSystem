import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from '../screens/SettingsScreen';
import changeTheme from '../screens/changeTheme';
import ChangeLogo from '../screens/ChangeLogo';

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
    ChangeLogo: {
        screen: ChangeLogo,
        navigationOptions: {
            title: "Change Logo"
        }
    }
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
