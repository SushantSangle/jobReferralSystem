import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';



export default class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            post: '',
            workexperience: '',
            password: '',
            gender: '',
            dateofbirth: '',
            mobile: '',
            address: '',
        };
    }

    onPress = () => {
        if (this.state.name == ''
            || this.state.id == ''
            || this.state.post == ''
            || this.state.workexperience == ''
            || this.state.password == ''
            || this.state.gender == ''
            || this.state.dateofbirth == ''
            || this.state.mobile == ''
            || this.state.address == '') {
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

                    <Text style={styles.text}>ID*</Text>
                    <TextInput
                        value={this.state.id}
                        onChangeText={(id) => this.setState({ id })}
                        label="id"
                        style={styles.inputext}
                        placeholder={'Enter ID'}
                    />

                    <Text style={styles.text}>Post*</Text>
                    <TextInput
                        value={this.state.post}
                        onChangeText={(post) => this.setState({ post })}
                        label="post"
                        style={styles.inputext}
                        placeholder={'Enter Post'}
                    />


                    <Text style={styles.text}>Work Experience*</Text>
                    <TextInput
                        value={this.state.workexperience}
                        onChangeText={(workexperience) => this.setState({ workexperience })}
                        label="workexperience"
                        style={styles.inputext}
                        placeholder={'Enter Work Experience'}
                    />


                    <Text style={styles.text}>Password*</Text>
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        label="password"
                        style={styles.inputext}
                        placeholder={'Enter Password'}
                        secureTextEntry={true}
                    />


                    <Text style={styles.text}>Gender*</Text>
                    <TextInput
                        value={this.state.gender}
                        onChangeText={(gender) => this.setState({ gender })}
                        label="gender"
                        style={styles.inputext}
                        placeholder={'Enter Gender'}
                    />

                    <Text style={styles.text}>Date of Birth*</Text>
                    <TextInput
                        value={this.state.dateofbirth}
                        onChangeText={(dateofbirth) => this.setState({ dateofbirth })}
                        label="dateofbirth"
                        style={styles.inputext}
                        placeholder={'Enter Date of Birth'}
                    />

                    <Text style={styles.text}>Mobile*</Text>
                    <TextInput
                        value={this.state.mobile}
                        onChangeText={(mobile) => this.setState({ mobile })}
                        label="mobile"
                        style={styles.inputext}
                        placeholder={'Enter Mobile Number'}
                    />


                    <Text style={styles.text}>Address*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.address}
                        onChangeText={(address) => this.setState({ address })}
                        label="address"
                        style={styles.address}
                        placeholder={'Enter Address'}
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
