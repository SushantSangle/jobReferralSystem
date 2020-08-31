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
    Dimensions
} from 'react-native';
import{Parse,Object,Query} from 'parse/react-native';

const width = Dimensions.get("window").width;


export default class ReferredPeople extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            data : [],
        }
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.jobcard_view}>
                <Text style={styles.jobcard_head}>{item.referJob}</Text>
                <Text style={styles.jobcard_details}>Name: {item.referName}</Text>
                <Text style={styles.jobcard_details}>Work Experience: {item.referWorkExperience}</Text>
                <Text style={styles.jobcard_details}>LikedIn Profile: {item.referLinkedin}</Text>
            </View>
        );

    }

    ComponentDidMount(){
        var query = new Query("referredPerson");
        var eachPromise = query.each((result) => {
            this.state.data.push({
                referJob : result.get("forJob").get("jobPosition"),
                referName : result.get('name'),
                referWorkExperience : result.get("workExperience"),
                referLinkedin : result.get('link'),
            });
            this.setState({
                data : this.state.data,
            })
            console.log("data read");
        })
        eachPromise.then((result) => {
            console.log("data promise fulfilled");
            console.log(this.state.data);
        }, (errorin) => {
            console.log("data Promise ERROR:" + error);
        }).catch((errorin) => {
            console.log("data Promise ERROR:" + error);
        })
    }

    render() {
        return (
            <FlatList
                data={refs}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.referId} />
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