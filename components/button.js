import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const Button = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} >
            <View style={styles.signin}>
                <Text style={{ color: "#ffffff" }}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );

};
const styles = require('../stylesheets/newPost');
export default Button;