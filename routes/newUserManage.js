import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NewUser from '../screens/NewUser';
import EditUser from '../screens/EditUser';
import UserManagement from '../screens/UserManagement';
import userdetails from '../screens/userdetails';

const UStack = createStackNavigator();
const UserStack = () => {
    return (
        <UStack.Navigator>
            <UStack.Screen name="UserManagement" component={UserManagement} />
            <UStack.Screen name="NewUser" component={NewUser} />
            <UStack.Screen name="EditUser" component={EditUser} />
            <UStack.Screen name="UserDetails" component={userdetails} />
        </UStack.Navigator>
    );
}

export default UserStack;