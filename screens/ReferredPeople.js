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
    FlatList,
    AsyncStorage,
    Dimensions
} from 'react-native';
import { Parse, Object, Query } from 'parse/react-native';
import { ScrollView } from 'react-native-gesture-handler';
Parse.User.enableUnsafeCurrentUser()
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/';

const width = Dimensions.get("window").width;


export default class ReferredPeople extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            data: [],
        }
        console.log('started_0');
    }
    componentDidMount(){
        console.log('components_mounted');
        const query = new Query('referredPerson');
        const jobNameQuery = new Query('jobPosts');
        query.each((result)=>{
            this.state.data.push({
                referJob : result.get('forJob').get('jobPosition'),
                referName: result.get('name'),
                referWorkExperience: result.get('workExperience'),
                referQualification: result.get('qualification'),
                referLinkedin: result.get('email'),
            })
        }).then(()=>{
            this.setState(this.state);
        }).catch((error)=>{
            console.log('Error with referredPersonRetrival'+error);
        })
    }
    render() {
        let people = this.state.data.map((val, key) => {
            console.log(key);
            return (
                <>
                    <View style={styles.jobcard_view}>
                        <Text style={styles.jobcard_head}>{val.referJob}</Text>
                        <Text style={styles.jobcard_details}>Name: {val.referName}</Text>
                        <Text style={styles.jobcard_details}>Work Experience: {val.referWorkExperience}</Text>
                        <Text style={styles.jobcard_details}>Qualification: {val.referQualification}</Text>
                        <Text style={styles.jobcard_details}>Link: {val.referLinkedin}</Text>
                    </View>
                </>
            );
        });
        return (
            <>
                {<ScrollView>
                    {people}
                </ScrollView>}
            </>
        );
    };
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