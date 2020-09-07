import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Parse } from "parse/react-native";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/parse';


export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: '',
            technology: '',
            type: '',
            location: '',
            qualification: '',
            workexperience: '',
            description: ''
        };
    }

    onPress = () => {

        if (this.state.position == '' || this.state.technology == ''
            || this.state.type == '' || this.state.location == ''
            || this.state.qualification == '' || this.state.workexperience == ''
            || this.state.description == '') {
            alert('Please enter all the feilds');
        }
        else {

            var PostDetails = Parse.Object.extend("jobPosts");
            var postDetails = new PostDetails();
            var user = Parse.User.current();
            postDetails.save({
                jobPosition: this.state.position,
                technology: this.state.technology,
                jobType: this.state.type,
                location: this.state.location,
                educationQualification: this.state.qualification,
                workEx: this.state.workexperience,
                description: this.state.description,
                createdAt: new Date(),
                postedBy: user

            }).then((postDetails) => {
                alert('Post Successfully Uploaded.');
                this.state.position = '';
                this.state.technology = '';
                this.state.jobType = '';
                this.state.location = '';
                this.state.qualification = '';
                this.state.workexperience = '';
                this.state.description = '';
            }, (error) => {
                alert('Some error occurred. Please try again. ' + error);
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    <Text style={styles.text}>Position*</Text>
                    <TextInput
                        value={this.state.position}
                        onChangeText={(position) => this.setState({ position })}
                        label="position"
                        style={styles.inputext}
                        placeholder={'Enter Position'}
                        require={true}
                    />

                    <Text style={styles.text}>Technology*</Text>
                    <TextInput
                        value={this.state.technology}
                        onChangeText={(technology) => this.setState({ technology })}
                        label="technology"
                        style={styles.inputext}
                        placeholder={'Enter Technology'}
                    />

                    <Text style={styles.text}>Type*</Text>
                    <TextInput
                        value={this.state.type}
                        onChangeText={(type) => this.setState({ type })}
                        label="type"
                        style={styles.inputext}
                        placeholder={'Enter Type'}
                    />


                    <Text style={styles.text}>Location*</Text>
                    <TextInput
                        value={this.state.location}
                        onChangeText={(location) => this.setState({ location })}
                        label="location"
                        style={styles.inputext}
                        placeholder={'Enter Location'}
                    />


                    <Text style={styles.text}>Qualification*</Text>
                    <TextInput
                        value={this.state.qualification}
                        onChangeText={(qualification) => this.setState({ qualification })}
                        label="qualification"
                        style={styles.inputext}
                        placeholder={'Enter Qualification'}
                    />


                    < Text style={styles.text}>Work Experience*</Text>
                    <TextInput
                        value={this.state.workexperience}
                        onChangeText={(workexperience) => this.setState({ workexperience })}
                        label="workexperience"
                        style={styles.inputext}
                        placeholder={'Enter Work Experience'}
                    />


                    <Text style={styles.text}>Description*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.description}
                        onChangeText={text => this.setState({ description: text })}
                        label="description"
                        style={styles.inputext}
                        placeholder={'Enter Description'}
                    />

                    <TouchableOpacity onPress={this.onPress} >
                        <View style={styles.signin}>
                            <Text style={{ color: "#ffffff" }}>
                                Post
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = require('../stylesheets/newPost');