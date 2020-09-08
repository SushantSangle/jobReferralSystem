import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './routes/newHomeStack';
import UserStack from './routes/newUserManage';
import PostStack from './routes/newPostManage';

const Drawer = createDrawerNavigator();

const App1 = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeStack} />
                <Drawer.Screen name="User" component={UserStack} />
                <Drawer.Screen name="Post" component={PostStack} />
            </Drawer.Navigator>
            {//<HomeStack />
            }
        </NavigationContainer>
    );
}

export default App1;