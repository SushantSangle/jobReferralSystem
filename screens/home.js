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
    Button, TouchableOpacity,
    Image,
    ActivityIndicator,
    scrollView
} from 'react-native';
import {
    Query
} from 'parse/react-native';
import OptionsMenu from "react-native-options-menu";
import { ScrollView } from 'react-native-gesture-handler';

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
        };
    }
    componentDidMount() {
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
        this.setState({ loading: true });
        var query = new Query("jobPosts");
        var eachPromise = query.each((result) => {
            const date=result.get("createdAt").toString().substring(0,24);
            this.state.data.push({
                jobId: result.id,
                jobHead: result.get('jobPosition'),
                jobType: result.get("jobType"),
                jobLocation: result.get("location"),
                jobAuthor: result.get("postedBy").get("username"),
                jobTechnology: result.get("technology"),
                jobWorkExperience:result.get("workEx"),
                jobDescription: result.get('description'),
                jobDate: date,
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
                                jobId: val.jobId
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
                    {posts}
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.clickHandler}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                        source={require('../images/add_icon.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </>
        );
    }
    clickHandler = () => {
        this.navigation.navigate("NewPost");
    };
}


const styles1 = require('../stylesheets/job_card_style');

const styles = StyleSheet.create({
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
});

