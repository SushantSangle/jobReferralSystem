import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/button';

const PostManagement = ({ navigation }) => {

    const onPressAddPost = () => {
        navigation.navigate("NewPost");
    }
    return (
        <View style={{ alignItems: "center", marginTop: '20%' }}>
            <Button text="Add Post" onPress={onPressAddPost} />
        </View>
    );
};

export default PostManagement;