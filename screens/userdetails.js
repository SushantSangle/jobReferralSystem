import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Parse } from "parse/react-native"


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
            this.navigation.navigate("NewUser",{
                edit:true,
                user:this.props.route.params,
            });
        }
        if (index == 1) {
            const boop = this.props.route.params.destroy();
            boop.then(()=>{
                ToastAndroid.show("User deleted",ToastAndroid.SHORT);
                this.navigation.goBack();
            })
        }
    }
    render() {
        const date = this.props.route.params.get("EmpDOB");
        return (
            <>
                <View style={styles.jobcard_view}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={styles.jobcard_head}>{this.props.route.params.get('firstName')+" s"+this.props.route.params.get('lastName')}</Text>
                        <PopupMenu
                            actions={this.state.actions}
                            onPress={this.onPopupEvent} />
                    </View>


                    <Text style={styles.jobcard_details}>ID: {this.props.route.params.id}</Text>
                    <Text style={styles.jobcard_details}>Post: {this.props.route.params.get('Designation')}</Text>
                    <Text style={styles.jobcard_details}>Gender: {this.props.route.params.get('gender')}</Text>
                    <Text style={styles.jobcard_details}>Mobile: {this.props.route.params.get('EmpPhone')}</Text>
                    <Text style={styles.jobcard_details}>Work Experience: {this.props.route.params.get('workExperience')}</Text>
                    <Text style={styles.jobcard_details}>Address: {this.props.route.params.get('EmpAddress')}</Text>
                <Text style={styles.jobcard_details}>Date of Birth:{""+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}</Text>
                </View>
            </>
        );
    }
}

const styles = require('../stylesheets/job_card_style');

