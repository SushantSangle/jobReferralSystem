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
    Dimensions,
    TextInput,
    FlatList,
} from 'react-native';
import PopupMenu from '../components/popup_menu';
import Comment from '../components/comment';
import Button from '../components/button';

const width = Dimensions.get("window").width;

const comments = [
    { userId: '1', userName: 'athu b', userComment: 'good luck have fun' },
    { userId: '2', userName: 'piyu g', userComment: 'good luck' },
    { userId: '3', userName: 'sushi s', userComment: 'yes, maam' },
    { userId: '4', userName: 'hardy d', userComment: 'udya sagla ready pahije' },
    { userId: '5', userName: 'athu b', userComment: 'good luck have fun' },
    { userId: '6', userName: 'piyu g', userComment: 'good luck' },
    { userId: '7', userName: 'sushi s', userComment: 'yes, maam' },
    { userId: '8', userName: 'hardy d', userComment: 'udya sagla ready pahije' },
];

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userComment: '',
            userName: ''
        };
        this.navigation = this.props.navigation;
    }

    onPopupEvent = (eventName, index) => {
        if (eventName !== 'itemSelected') return
        if (index == 0) {
            this.navigation.navigate("EditPost", { objectId: this.navigation.getParam('objectId') });
        }
        if (index == 1) {
            alert("Pressed Delete Post");
        }
        if (index == 2) {
            this.navigation.navigate("ReferPerson",{
                jobId:this.navigation.getParam('jobId'),
            });
        }
        if (index == 3) {
            this.navigation.navigate("ReferredPeople",{   jobId:this.navigation.getParam('jobId')} );
        }
    }

    getHeader = () => {
        return (
            <>
                <View style={styles.jobcard_view}>
                    <Text style={styles.jobcard_head}>{this.navigation.getParam('jobHead')}</Text>
                    <Text style={styles.jobcard_details}>TYPE: {this.navigation.getParam('jobType')}</Text>
                    <Text style={styles.jobcard_details}>LOCATION: {this.navigation.getParam('jobLocation')}</Text>
                    <Text style={styles.jobcard_details}>POSTED BY: {this.navigation.getParam('jobAuthor')}</Text>
                    <Text style={styles.jobcard_details}>Technology: {this.navigation.getParam('jobTechnology')}</Text>
                    <Text style={styles.jobcard_details}>Work Experience: {this.navigation.getParam('jobWorkExperience')}</Text>
                    <Text style={styles.jobcard_details}>Description: {this.navigation.getParam('jobDescription')}</Text>

                    <View style={{ flexDirection: "row-reverse", alignContent: "center" }}>
                        <PopupMenu actions={['Edit', 'Remove', 'Refer Person', 'Referred People']}
                            onPress={this.onPopupEvent} />
                        <Text style={{ color: "#606770", marginHorizontal: '5%' }}>{this.navigation.getParam('jobDate')}</Text>
                    </View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: '2.5%' }}>Comments</Text>
            </>
        );
    };

    onPress = () => {
        if (this.state.userComment == '') {
            alert("Can't post empty comment");
        }
        else {
            alert("Comment Posted!\nName:" +
                this.state.userName + "\nId:" +
                this.state.userId + "\nComment:" + this.state.userComment);
        }
    };

    renderItem = ({ item }) => {
        return (
            <Comment
                userName={item.userName}
                userComment={item.userComment} />
        );
    };

    render() {
        return (
            <>
                <FlatList
                    data={comments}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.userId}
                    ListHeaderComponent={this.getHeader} />

                <TextInput
                    value={this.state.userComment}
                    onChangeText={(userComment) => this.setState({ userComment })}
                    label="userComment"
                    style={styles.inputext}
                    placeholder={'Enter Comment'}
                />
                <Button text="Post Comment" onPress={this.onPress} />
            </>
        );
    }
}

const styles = require('../stylesheets/job_card_style');

