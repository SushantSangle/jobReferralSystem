import { createStackNavigator } from 'react-navigation-stack';
import About from '../screens/about';

const screens = {
    About: {
        screen: About,
        navigationOptions: {
            title: "About Us"
        }
    }
}

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#88b972",
            height: 50
        }
    }
});

export default AboutStack;
