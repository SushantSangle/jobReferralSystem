import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import ChangeLogo from '../screens/ChangeLogo';

const SStack = createStackNavigator();
const SettingsStack = () => {
    return (
        <SStack.Navigator>
            <SStack.Screen name="Settings" component={SettingsScreen} />
            <SStack.Screen name="ChangeLogo" component={ChangeLogo} />
        </SStack.Navigator>
    );
}

export default SettingsStack;