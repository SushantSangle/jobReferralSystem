import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';



export default class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: '',
            technology: '',
            type: '',
            location: '',
            qualification: '',
            workexperience: '',
            description: '',
        };
    }


    onPress = () => {
        if ((this.state.position == '') & (this.state.technology == '')
            || this.state.type == ''
            || this.state.location == ''
            || this.state.qualification == ''
            || this.state.workexperience == ''
            || this.state.description == '') {
            alert('Please enter all the feilds');
        }
        else {
            alert('Done')
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
                        style={styles.description}
                        placeholder={'Enter Description'}
                    />

                </ScrollView>
                <TouchableOpacity onPress={this.onPress} >
                    <View style={styles.signin}>
                        <Text style={{ color: "#ffffff" }}>
                            Update
                        </Text>
                    </View>
                </TouchableOpacity>


            </View>
        );
    }
}

const styles = require('../stylesheets/newPost');
