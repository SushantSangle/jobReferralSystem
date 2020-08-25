import React from 'react';
import { View, Text } from 'react-native';

const Comment = (props) => {
    return (
        <>
            <View style={{ marginHorizontal: '5%' }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{props.userName}:</Text>
                <Text style={{ marginLeft: '5%', textAlign: "justify" }}>{props.userComment}</Text>
            </View>
        </>
    );
};

export default Comment;