import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/button';

const PostManagement = ({ navigation }) => {

    const onPressAddPost = () => {
        navigation.navigate("NewPost");
    }
    const onPressEditPost = () => {
        navigation.navigate("EditPost");
    }

    return (
        <View style={{ alignItems: "center", marginTop: '20%' }}>
            <Button text="Add Post" onPress={onPressAddPost} />
            <Button text="Edit Post Details" onPress={onPressEditPost} />
        </View>
    );
};

export default PostManagement;