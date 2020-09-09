import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    AsyncStorage,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import { Parse,Query, Relation } from 'parse/react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PopupMenu from '../components/popup_menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {jsonToCSV} from 'react-papaparse';

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
                    
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={styles.jobcard_details}>Link: {val.referLinkedin}</Text>

                            <PopupMenu 
                                actions={['Remove referral']}
                                onPress={(eventName,index)=>{
                                    if (eventName !== 'itemSelected') return
                                    if (index == 0) {
                                        //delete
                                    }
                                }}
                                size={styles.fontSize} 
                                
                            />
                        </View>
                    </View>
            );
        });
        return (
            <>  
                {!this.state.data.length && <Text style={[styles.jobcard_details,{alignSelf:'center',padding:10}]}>
                    No referrals yet for this post.
                    </Text>}
                {<ScrollView>
                    {people}
                </ScrollView>}
                {this.state.data.length>0 && <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.downloadHandler}
                    style={styles.TouchableOpacityStyle}>
                    <Icon
                        name='download-circle'
                        size={53}
                        color={'#df75a8'}
                    />
                </TouchableOpacity>}
            </>
        );
    }
    downloadHandler=()=> {
        ToastAndroid.show("Download all",ToastAndroid.SHORT);
        
        //console.log(this.state.data);
        const csv = jsonToCSV(this.state.data);
        console.log(csv);
        var RNFS = require('react-native-fs');
        var path = '/storage/emulated/0/Download' + '/Referred_People.csv';
        console.log(path);
        RNFS.writeFile(path, csv , 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
            alert('File saved in Internal Storage->Downloads.');
        })
        .catch((err) => {
            console.log(err.message);
        });

    }
}

const styles = require('../stylesheets/job_card_style');