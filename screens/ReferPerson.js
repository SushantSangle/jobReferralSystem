import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';



export default class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            linkedin: '',
            contact: '',
            qualification: '',
            workexperience: '',
            description: '',
        };
    }

    onPress = () => {
        if (this.state.name == ''
            || this.state.email == ''
            || this.state.contact == ''
            || this.state.linkedin == ''
            || this.state.qualification == ''
            || this.state.workexperience == ''
            || this.state.description == '') {
            alert('Please enter all the feilds');
        }
        else {
            alert('Done');
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
                        placeholder={'Enter Name'}
                    />

                    <Text style={styles.text}>Contact*</Text>
                    <TextInput
                        value={this.state.contact}
                        onChangeText={(contact) => this.setState({ contact })}
                        label="techncontactology"
                        style={styles.inputext}
                        placeholder={'Enter contact'}
                    />

                    <Text style={styles.text}>LinkedIn*</Text>
                    <TextInput
                        value={this.state.contact}
                        onChangeText={(linkedin) => this.setState({ linkedin })}
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
                        onChangeText={(description) => this.setState({ description })}
                        label="description"
                        style={styles.description}
                        placeholder={'Enter Description'}
                    />
                </ScrollView>

                <TouchableOpacity onPress={this.onPress} >
                    <View style={styles.signin}>
                        <Text style={{ color: "#ffffff" }}>
                            Post
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = require('../stylesheets/newPost');
