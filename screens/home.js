/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,

    ToastAndroid
} from 'react-native';
import {
    Query, Config
} from 'parse/react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RoleManager from '../utils/RoleManager';
import ConfigLoader from '../utils/ConfigLoader';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            loading: true,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            roleLevel: RoleManager.getLevel(),
        };
        ConfigLoader.pullConfig().then(async (value) => {
            if (value == 1) {
                ToastAndroid.show("new Logo pulled from server, it will be loaded on login screen once you reload", ToastAndroid.SHORT);
            }
        })
    }
    componentDidMount() {
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
        this.setState({ loading: true });
        var query = new Query("jobPosts");
        var eachPromise = query.each((result) => {
            var date = result.get("createdAt");
            const det = "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
            this.state.data.push({
                jobId: result.id,
                jobHead: result.get('jobPosition'),
                jobType: result.get("jobType"),
                jobLocation: result.get("location"),
                jobAuthor: result.get("postedBy").get("username"),
                jobTechnology: result.get("technology"),

                jobWorkExperience: result.get("workEx"),
                jobDescription: result.get('description'),
                jobDate: det,

                jobPost: result,
            });
            this.setState(this.state);
            console.log("data read");
        })
        eachPromise.then((result) => {
            console.log("data promise fulfilled");
        }, (errorin) => {
            this.setState({ error: errorin, loading: false });
            console.log("data Promise ERROR:" + error);
        }).catch((errorin) => {
            this.setState({ error: errorin, loading: false });
            console.log("data Promise ERROR:" + error);
        })
    }

    render() {
        let posts = this.state.data.map((val, key) => {
            console.log(key);
            return (
                <TouchableOpacity style={{ elevation: 10 }} key={val.jobId}
                    onPress={() =>
                        this.navigation.navigate("Details", {
                            jobHead: val.jobHead,
                            jobType: val.jobType,
                            jobLocation: val.jobLocation,
                            jobAuthor: val.jobAuthor,
                            jobTechnology: val.jobTechnology,
                            jobWorkExperience: val.jobWorkExperience,
                            jobDescription: val.jobDescription,
                            jobDate: val.jobDate.toString(),
                            jobId: val.jobId,
                            jobPost: val.jobPost,
                        })
                    }
                >
                    <View style={styles1.jobcard_view}>

                        <Text style={styles1.jobcard_head}>{val.jobHead}</Text>
                        <Text style={styles1.jobcard_details}>TYPE: {val.jobType}</Text>
                        <Text style={styles1.jobcard_details}>LOCATION: {val.jobLocation}</Text>
                        <Text style={styles1.jobcard_details}>POSTED BY: {val.jobAuthor}</Text>
                        <Text style={styles1.jobcard_details}>Technology: {val.jobTechnology}</Text>

                        <View style={{ flexDirection: "row-reverse", alignContent: "center" }}>
                            <Text style={{ color: "#606770" }}>{val.jobDate.toString()}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
        return (
            <>
                <ScrollView>
                    {!this.state.data.length && <Text style={[styles1.jobcard_details, { alignSelf: 'center', padding: 10 }]}>
                        No Job Posts yet, please check you internet connection.
                    </Text>}
                    {posts}
                </ScrollView>
                {this.state.roleLevel < 2 && <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.clickHandler}
                    style={styles1.TouchableOpacityStyle}>
                    <Image
                        source={require('../images/add_icon.png')}
                        style={styles1.FloatingButtonStyle}
                    />
                </TouchableOpacity>}
            </>
        );
    }
    clickHandler = () => {
        this.navigation.navigate("NewPost");
    };
}


const styles1 = require('../stylesheets/job_card_style');


