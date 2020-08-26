
import React, { Component } from 'react';
import {
 Text,
 View,
 ScrollView,
 TextInput,
 TouchableOpacity,
 AsyncStorage
} from 'react-native';
import {Parse} from "parse/react-native"
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL='https://parse.sushant.xyz:1304/';


export default class NewUser extends Component {

 constructor(props) {
    super(props);
    this.state = {
        name: '',
        password: '',
        address: '',
    };
    this.printDetails();
 }
    printDetails(){
        var user = new Parse.Object.extend("User");
        var query = new Parse.Query(user);
        query.get('Nb46nMHUby')
        .then((userDetails)=>{    
            this.setState({
                name: userDetails.getUsername(),
                address: userDetails.getEmail()
            })

        },(error) =>{
            alert("Some error occurred. Please try again." + error);
        })
    }

    onPress = () => {
        if(this.state.name == "" || this.state.password == '' || this.state.address == ''){
            alert("Please fill in all the details.")
        }else{
            var User = new Parse.User();
            var query = new Parse.Query(User);
            query.get('Nb46nMHUby')
            .then((userDetails) =>{
                console.log(Parse.User.current());
                console.log(userDetails);
                userDetails.setUsername(this.state.name);
                userDetails.setPassword(this.state.password);
                userDetails.setEmail(this.state.address);

                try{
                    console.log(userDetails.save());
                    console.log(userDetails);
                    alert("User Details Updated.");
                }catch(error){
                    alert('Some Error occurred.Please try again.' + error);
                }
            },(error) =>{
                alert('Some Error occurred.Please try again.' + error);
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
        placeholder={'Enter Name'} 
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

        <Text style={styles.text}>Address*</Text>
        <TextInput
        multiline = {true}
        numberOfLines ={4}
        value={this.state.address}
        onChangeText={(address)=>this.setState({address})}
        label="address"
        style={styles.inputext}
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