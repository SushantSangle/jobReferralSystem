import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Parse } from "parse/react-native"
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/parse';


import PopupMenu from '../components/popup_menu';



export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            actions: ['Edit', 'Remove'],
        };
    }

    onPopupEvent = (eventName, index) => {
        if (eventName !== 'itemSelected') return
        if (index == 0) {
            this.navigation.navigate("EditUser");
        }
        if (index == 1) {
            alert("Pressed Delete User");
        }
    }
    render() {
        const date = 1;
        return (
            <>
                <View style={styles.jobcard_view}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={styles.jobcard_head}>{this.props.route.params.get('firstName')+this.props.route.params.get('lastName')}</Text>
                        <PopupMenu
                            actions={this.state.actions}
                            onPress={this.onPopupEvent} />
                            
                    </View>


                    <Text style={styles.jobcard_details}>ID: {this.props.route.params.userId}</Text>
                    <Text style={styles.jobcard_details}>Post: {this.props.route.params.userPost}</Text>
                    <Text style={styles.jobcard_details}>Gender: {this.props.route.params.userGender}</Text>
                    <Text style={styles.jobcard_details}>Mobile: {this.props.route.params.userMobile}</Text>
                    <Text style={styles.jobcard_details}>DOB: {this.props.route.params.userDateofbirth}</Text>
                    <Text style={styles.jobcard_details}>Work Experience: {this.props.route.params.userWorkExperience}</Text>
                    <Text style={styles.jobcard_details}>Address: {this.props.route.params.userAddress}</Text>
                    

                </View>
            </>
        );
    }
}

const styles = require('../stylesheets/job_card_style');

