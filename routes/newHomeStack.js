import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Details from '../screens/details1';
import EditPost from '../screens/EditPost';
import NewPost from '../screens/NewPost';
import SettingsScreen from '../screens/SettingsScreen';
import ReferPerson from '../screens/ReferPerson';
import ReferredPeople from '../screens/ReferredPeople';

const HStack = createStackNavigator();
const HomeStack = () => {
    return (
        <HStack.Navigator>
            <HStack.Screen name="Home" component={Home} />
            <HStack.Screen name="Details" component={Details} />
            <HStack.Screen name="EditPost" component={EditPost} />
            <HStack.Screen name="NewPost" component={NewPost} />
            <HStack.Screen name="ReferPerson" component={ReferPerson} />
            <HStack.Screen name="ReferredPeople" component={ReferredPeople} />
            <HStack.Screen name="SettingsScreen" component={SettingsScreen} />
        </HStack.Navigator>
    );
}

export default HomeStack;