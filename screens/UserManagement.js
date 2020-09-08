/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button, TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
    FlatList
} from 'react-native';
import {
    Query
} from 'parse/react-native';
import OptionsMenu from "react-native-options-menu";

import RoleManager from '../utils/RoleManager'



const Data = [
    {

        userId: '1',
        userName: 'Abc',
        userPost: 'Associate Software Engineer',
        userWorkExperience: 'FULL-TIME',
        userPassword: '1',
        userGender: 'F',
        userDateofbirth: '03-02-2020',
        userMobile: 'PYTHON',
        userAddress: 'Pune'
    },
    {
        userId: '2',
        userName: 'Pqr',
        userPost: 'Associate Software',
        userWorkExperience: 'FULL-TIME',
        userPassword: '1',
        userGender: 'F',
        userDateofbirth: '02-05-2020',
        userMobile: 'PYTHON',
        userAddress: 'MUMBAI'
    }, {
        userId: '3',
        userName: 'Xyz',
        userPost: 'Associate Engineer',
        userWorkExperience: 'FULL-TIME',
        userPassword: '1',
        userGender: 'M',
        userDateofbirth: '1-1-2020',
        userMobile: 'PYTHON',
        userAddress: 'MUMBAI'
    }
];


export default class UserManagement extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            roleLevel: RoleManager.getLevel(),
        };
    }

    render() {
        return (
            <>
                <FlatList
                data={Data}
                renderItem={this.renderItem}
                keyExtractor={item => item.userId} />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.clickHandler}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                        source={require('../images/add_icon.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </>
        );
    }

    renderItem = ({ item }) => {
        return(
                <TouchableOpacity style={{ elevation: 10 }} 
                onPress={() =>
                    this.navigation.navigate("UserDetails", {
                        userName: item.userName,
                        userId: item.userId,
                        userPost: item.userPost,
                        userWorkExperience: item.userWorkExperience,
                        userPassword: item.userPassword,
                        userGender: item.userGender,
                        userDateofbirth: item.userDateofbirth,
                        userMobile: item.userMobile,
                        userAddress: item.userAddress,
                    })
                } >

                    <View style={styles1.jobcard_view}>
            
                            <Text style={styles1.jobcard_head}>{item.userName}</Text>
                            
                            <Text style={styles1.jobcard_details}>POST: {item.userPost}</Text>
                            <Text style={styles1.jobcard_details}>ID: {item.userId}</Text>
                            <Text style={styles1.jobcard_details}>POST: {item.userPost}</Text>
                            <Text style={styles1.jobcard_details}>WORK EXP: {item.userWorkExperience}</Text>
                            <Text style={styles1.jobcard_details}>PASSWORD: {item.userPassword}</Text>
                            <Text style={styles1.jobcard_details}>GENDER: {item.userGender}</Text>
                            <Text style={styles1.jobcard_details}>MOBILE: {item.userMobile}</Text>
                            <Text style={styles1.jobcard_details}>ADDRESS: {item.userAddress}</Text>

                        </View>
                    </TouchableOpacity>
        );
    
    }
    onPress = () => {
        this.navigation.navigate("UserDetails", {
            userName: userName,
            userId: userId,
            userPost: userPost,
            userWorkExperience: userWorkExperience,
            userPassword: userPassword,
            userGender: userGender,
            userDateofbirth: userDateofbirth,
            userMobile: userMobile,
            userAddress: userAddress,
        })
    }
    onLongPress = () => {
        alert("Long Pressed");
    }
    clickHandler = () => {
        this.navigation.navigate("NewUser");
    };
}


const styles1 = require('../stylesheets/job_card_style');

const styles = StyleSheet.create({
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
});

