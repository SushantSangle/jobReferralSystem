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
    ActivityIndicator
} from 'react-native';
import {
    Query
} from 'parse/react-native';
import OptionsMenu from "react-native-options-menu";

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
            this.state.data.push({
                jobId: result.id,
                jobHead: result.get('jobPosition'),
                jobType: result.get("jobType"),
                jobLocation: result.get("location"),
                jobAuthor: result.get("postedBy").get("username"),
                jobTechnology: result.get("technology"),
                jobDate: result.get("createdAt"),
                jobDescription: result.get("description"),
            });
            console.log("data read");
        })
        eachPromise.then((result) => {
            this.setState({ loading: false, refreshing: false });
            console.log("data promise fulfilled");
            console.log(this.state.data);
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
                    <>
                        <TouchableOpacity key={key}
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
                                    objectId: val.jobId
                                })
                            }
                        >
                            <View style={styles1.jobcard_view}>

                                <Text style={styles1.jobcard_head}>{val.jobHead}</Text>
                                <Text style={styles1.jobcard_details}>TYPE: {val.jobType}</Text>
                                <Text style={styles1.jobcard_details}>LOCATION: {val.jobLocation}</Text>
                                <Text style={styles1.jobcard_details}>POSTED BY: {val.jobAuthor}</Text>
                                <Text style={styles1.jobcard_details}>TECHNOLOGY: {val.jobTechnology}</Text>

                                <View style={{ flexDirection: "row-reverse", alignContent: "center" }}>
                                    <Text style={{ color: "#606770" }}>{val.jobDate.toString()}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </>
                );
            });
            return (
                <>
                    {posts}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this.clickHandler}
                        style={styles.TouchableOpacityStyle}>
                        <Image
                            source={{
                                uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                            }}
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

