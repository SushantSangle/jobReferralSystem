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
    Dimensions,
    ToastAndroid
} from 'react-native';
import { Parse, Object, Query, Relation } from 'parse/react-native';
import { ScrollView } from 'react-native-gesture-handler';
Parse.User.enableUnsafeCurrentUser()
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('job-Referral-System');
Parse.serverURL = 'https://parse.sushant.xyz:1304/parse';

const width = Dimensions.get("window").width;


export default class ReferredPeople extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            data: [],
            jobId: undefined,
        }
    }
    componentDidMount() {
        this.state.jobId = this.props.route.params.jobId;
        if (this.state.jobId) {
            console.log(this.state.jobId);
            console.log("Referred person called for one job");
            const jobQuery = new Query('jobPosts').get(this.state.jobId);
            jobQuery.then((job) => {
                const relation = new Relation(job, 'referrals');
                const relatedQuery = relation.query();
                relatedQuery.find().then((resultArray) => {
                    for (var result of resultArray) {
                        this.state.data.push({
                            referJob: result.get('forJob').get('jobPosition'),
                            referName: result.get('name'),
                            referWorkExperience: result.get('workExperience'),
                            referQualification: result.get('qualification'),
                            referLinkedin: result.get('email'),
                        });
                    }
                    this.setState(this.state);
                })
            }).catch((error) => {
                console.log("ERROR WITH PERSON RETRIVAL:" + error);
            })
        }
        else {
            console.log("Referred person called directly");
            const jobNameQuery = new Query('referredPerson');
            this.searchAndDisplay(jobNameQuery);
        }
    }
    searchAndDisplay(query) {
        console.log(query);
        query.each((result) => {
            this.state.data.push({
                referJob: result.get('forJob').get('jobPosition'),
                referName: result.get('name'),
                referWorkExperience: result.get('workExperience'),
                referQualification: result.get('qualification'),
                referLinkedin: result.get('email'),
            })
            this.setState(this.state);
        }).then(() => {
            this.setState(this.state);
        }).catch((error) => {
            console.log('Error with referredPersonRetrival:' + error);
        })
    }
    render() {
        let people = this.state.data.map((val, key) => {
            console.log(key);
            return (
                <View style={styles.jobcard_view} key={key.toString()}>
                    {!this.state.jobId && <Text style={styles.jobcard_head}>{val.referJob}</Text>}
                    <Text style={styles.jobcard_details}>Name: {val.referName}</Text>
                    <Text style={styles.jobcard_details}>Work Experience: {val.referWorkExperience}</Text>
                    <Text style={styles.jobcard_details}>Qualification: {val.referQualification}</Text>
                    <Text style={styles.jobcard_details}>Link: {val.referLinkedin}</Text>
                </View>
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

const styles = require('../stylesheets/job_card_style');