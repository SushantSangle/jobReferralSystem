import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { Parse } from "parse/react-native"
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/';

export default class ReferPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            Contact: '',
            gender: '',
            email: '',
            workexperience: '',
            department: '',
            organization: '',
            qualification: '',
            designation: '',
            description: '',
            status: '',
            link: ''
        };
    }

    onPress = () => {
        {
            var PersonDetails = Parse.Object.extend("referredPerson");
            var personDetails = new PersonDetails();
            var user = Parse.User.current();
            personDetails.save({
                name: this.state.name,
                workExperience: this.state.workexperience,
                forJob: this.state.job,
                link: this.state.link,
                Discription: this.state.Discription,
                qualification: this.state.qualification,
                email: this.state.email
            }).then((postDetails) => {
                alert('Person successfully referred');

            }, (error) => {
                alert('Some error occurred. Please try again. ' + error);
            });
        }
    }
    render() {
        return (

            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    <Text style={styles.text}>Name*</Text>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        label="name"
                        style={styles.inputext}
                        placeholder={'First Middle Last'}
                    />

                    <Text style={styles.text}>Contact*</Text>
                    <TextInput
                        value={this.state.Contact}
                        onChangeText={(Contact) => this.setState({ Contact })}
                        label="Contact"
                        style={styles.inputext}
                        placeholder={'Enter Contact'}
                    />

                    <Text style={styles.text}>Date of Birth*</Text>
                    <TextInput
                        value={this.state.dob}
                        onChangeText={(dob) => this.setState({ dob })}
                        label="dob"
                        style={styles.inputext}
                        placeholder={'22-09-1999'}
                    />

                    <Text style={styles.text}>e-mail*</Text>
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        label="email"
                        style={styles.inputext}
                        placeholder={'Enter email'}

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
                        style={styles.description}
                        placeholder={'Enter Description'}
                    />

                    <Text style={styles.text}>Link</Text>
                    <TextInput
                        multiline={false}
                        value={this.state.link}
                        onChangeText={text => this.setState({ link: text })}
                        label="link"
                        style={styles.inputext}
                        placeholder={'Enter an optional link (LinkedIn),(gitHub)'}
                    />

                    <TouchableOpacity onPress={this.onPress} >
                        <View style={styles.signin}>
                            <Text style={{ color: "#565656" }}>
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