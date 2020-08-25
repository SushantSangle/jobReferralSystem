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
    FlatList
} from 'react-native';

import Comment from '../components/comment';
import Button from '../components/button';

const width = Dimensions.get("window").width;

const comments = [
    { userId: '1', userName: 'athu b', userComment: 'good luck have fun' },
    { userId: '2', userName: 'piyu g', userComment: 'good luck' },
    { userId: '3', userName: 'sushi s', userComment: 'yes, maam' },
    { userId: '4', userName: 'hardy d', userComment: 'udya sagla ready pahije' },
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
                        <Text style={{ color: "#606770" }}>{this.navigation.getParam('jobDate')}</Text>
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

const styles = StyleSheet.create({
    jobcard_view: {
        width: "95%",
        backgroundColor: "#efefef",
        alignSelf: "center",
        padding: 10,
        elevation: 10,
        marginVertical: "1%"
    },
    jobcard_head: {
        color: "#69a74e",
        fontSize: width / 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    jobcard_details: {
        fontSize: width / 28,
        fontWeight: "bold",
        padding: 1,
        color: "#606770"
    }
});

