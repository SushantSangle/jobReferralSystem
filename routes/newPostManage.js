import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NewPost from '../screens/NewPost';
import EditPost from '../screens/EditPost';
import PostManagement from '../screens/PostManagement';

const PStack = createStackNavigator();
const PostStack = () => {
    return (
        <PStack.Navigator>
            <PStack.Screen name="PostManagement" component={PostManagement} />
            <PStack.Screen name="NewPost" component={NewPost} />
            <PStack.Screen name="EditPost" component={EditPost} />
        </PStack.Navigator>
    );
}

export default PostStack;