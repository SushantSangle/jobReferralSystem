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

export default class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            Contact: '',
            gender: '',
            email: '',
            dob: new Date(),
            workexperience: '',
            department: '',
            organization: '',
            qualification: '',
            designation: '',
            description: '',
            status: ''
        };
    }

    onPress = () => {


        if (this.state.name == '' || this.state.Contact == '' || this.state.gender == ''
            || this.state.email == '' || this.state.dob == '' || this.state.department == '' || this.state.organization == ''
            || this.state.qualification == '' || this.state.workexperience == '' || this.state.designation == ''
            || this.state.description == '' || this.state.status == '') {
            alert('Please enter all the feilds');
        }
        else {

            var nameArray = this.state.name.split(" ");
            var PersonDetails = Parse.Object.extend("employeeData");
            var personDetails = new PersonDetails();
            var user = Parse.User.current();

            if (nameArray.length != 3) {
                alert('Enter name in correct format.');
            }
            if (this.state.Contact.length != 10) {
                alert('Enter correct contact information.');
            }


            personDetails.save({
                firstName: nameArray[0],
                fathersName: nameArray[1],
                lastName: nameArray[2],
                phone: this.state.Contact,
                gender: this.state.gender,
                dob: this.state.dob,
                address: this.state.email,
                Department: this.state.department,
                organization: this.state.organization,
                Designation: this.state.designation,
                qualification: this.state.qualification,
                workEx: this.state.workexperience,
                status: this.state.status,
                description: this.state.description,
                auth: user,
                createdAt: new Date()

            }).then((postDetails) => {
                alert('Post Successfully Uploaded.');

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

                    <Text style={styles.text}>Gender*</Text>
                    <TextInput
                        value={this.state.gender}
                        onChangeText={(gender) => this.setState({ gender })}
                        label="gender"
                        style={styles.inputext}
                        placeholder={'Enter gender'}
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

                    <Text style={styles.text}>Department*</Text>
                    <TextInput
                        value={this.state.department}
                        onChangeText={(department) => this.setState({ department })}
                        label="department"
                        style={styles.inputext}
                        placeholder={'Enter Department'}
                    />

                    < Text style={styles.text}>Organization*</Text>
                    <TextInput
                        value={this.state.organization}
                        onChangeText={(organization) => this.setState({ organization })}
                        label="Organization"
                        style={styles.inputext}
                        placeholder={'Enter Organization'}
                    />

                    < Text style={styles.text}>Designation*</Text>
                    <TextInput
                        value={this.state.designation}
                        onChangeText={(designation) => this.setState({ designation })}
                        label="designation"
                        style={styles.inputext}
                        placeholder={'Enter designation'}
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

                    < Text style={styles.text}>Status*</Text>
                    <TextInput
                        value={this.state.status}
                        onChangeText={(status) => this.setState({ status })}
                        label="status"
                        style={styles.inputext}
                        placeholder={'Enter status'}
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