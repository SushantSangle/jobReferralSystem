import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Details from '../screens/details1';
import EditPost from '../screens/EditPost';
import NewPost from '../screens/NewPost';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import changeTheme from '../screens/changeTheme';

import DynamicStyle from '../utils/DyamicStyle';

import ReferPerson from '../screens/ReferPerson';
import ReferredPeople from '../screens/ReferredPeople';
import { NavigationContainer } from '@react-navigation/native';

const HStack = createStackNavigator();

const Homes = ({ navigation }) => {
    return (
        <>
            <View>
                <Text>HOMEEEEEEEEEEE</Text>
            </View>
            <Button
                title="Goto detailss"
                onPress={() => navigation.navigate("Details")} />
        </>
    );
}

const Detailss = ({ navigation }) => {
    return (
        <View>
            <Text>Detailsssssssssss</Text>
        </View>
    );
}

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
            <HStack.Screen name="changeTheme" component={changeTheme} />
        </HStack.Navigator>
    );
}

export default HomeStack;