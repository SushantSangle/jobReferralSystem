import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Parse, Query, Relation } from "parse/react-native"
import { ThemeColors } from 'react-navigation';


export default class ReferPerson extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        console.log(this.props.route.params.jobId);
        const query = new Query('jobPosts');
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
            link: '',
            jobId: this.props.route.params.jobId,
            job: this.props.route.params.jobId,
        };
        query.get(this.props.route.params.jobId).then((result) => {
            this.state.jobId = result.toPointer();
            this.state.job = result;
            console.log(this.state.jobId);
        }).catch((error) => {
            console.log(error);
        });
    }

    onPress = () => {
        {
            var PersonDetails = Parse.Object.extend("referredPerson");
            var personDetails = new PersonDetails();
            var user = Parse.User.current();
            personDetails.save({
                name: this.state.name,
                workExperience: this.state.workexperience,
                forJob: this.state.jobId,
                link: this.state.link,
                Discription: this.state.description,
                qualification: this.state.qualification,
                email: this.state.email
            }).then((postDetails) => {
                alert('Person successfully referred');
                const relation = new Relation(this.state.job, 'referrals');
                relation.add(personDetails);
                this.state.job.save().catch((error) => { console.log(error); });
                this.setState({
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
                    link: '',
                    jobId: this.state.jobId,
                    job: this.state.job,
                });

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
                        placeholder={'FirstName MiddleName LastName'}
                        placeholderTextColor={styles.input_text_dark.color}
                    />

                    <Text style={styles.text}>Contact*</Text>
                    <TextInput
                        value={this.state.Contact}
                        onChangeText={(Contact) => this.setState({ Contact })}
                        label="Contact"
                        style={styles.inputext}
                        placeholder={'Enter Mobile Number'}
                        placeholderTextColor={styles.input_text_dark.color}
                    />

                    <Text style={styles.text}>Date of Birth*</Text>
                    <TextInput
                        value={this.state.dob}
                        onChangeText={(dob) => this.setState({ dob })}
                        label="dob"
                        style={styles.inputext}
                        placeholder={'YYYY-MM-DD'}
                        placeholderTextColor={styles.input_text_dark.color}
                    />

                    <Text style={styles.text}>Email*</Text>
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        label="email"
                        style={styles.inputext}
                        placeholder={'Enter e-mail address'}
                        placeholderTextColor={styles.input_text_dark.color}

                    />

                    <Text style={styles.text}>Qualification*</Text>
                    <TextInput
                        value={this.state.qualification}
                        onChangeText={(qualification) => this.setState({ qualification })}
                        label="qualification"
                        style={styles.inputext}
                        placeholder={'Enter Qualification'}
                        placeholderTextColor={styles.input_text_dark.color}
                    />

                    < Text style={styles.text}>Work Experience*</Text>
                    <TextInput
                        value={this.state.workexperience}
                        onChangeText={(workexperience) => this.setState({ workexperience })}
                        label="workexperience"
                        style={styles.inputext}
                        placeholder={'Enter Work Experience'}
                        placeholderTextColor={styles.input_text_dark.color}
                    />

                    <Text style={styles.text}>Description*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.description}
                        onChangeText={text => this.setState({ description: text })}
                        label="description"
                        placeholder={'Enter Description'}
                        placeholderTextColor={styles.input_text_dark.color}
                        style={styles.inputext}
                    />

                    <Text style={styles.text}>Link</Text>
                    <TextInput
                        multiline={false}
                        value={this.state.link}
                        onChangeText={text => this.setState({ link: text })}
                        label="link"
                        style={styles.inputext}
                        placeholder={'Enter an optional link (LinkedIn),(gitHub)'}
                        placeholderTextColor={styles.input_text_dark.color}
                    />

                    <TouchableOpacity onPress={this.onPress} >
                        <View style={styles.signin}>
                            <Text style={{ color: '#ffffff' }}>
                                Refer
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = require('../stylesheets/newPost');
