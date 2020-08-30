import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import { Parse } from "parse/react-native"
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/';


export default class changeTheme extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>ABC</Text>
            </View>
        );
    }
}

const styles = require('../stylesheets/newPost');