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

const width = Dimensions.get("window").width;

const refs = [
    {
        referId: '1',
        referName: "Atharva Borekar",
        referJob: "Assistant Software Engineer",
        referWorkExperience: "0 years",
        referLinkedin: "aaasaadadads"
    },
    {
        referId: '2',
        referName: "Priya Ghayal",
        referJob: "Assistant Software Engineer",
        referWorkExperience: "01 years",
        referLinkedin: "aaasaadadasdasdadadadadadadads"
    },
    {
        referId: '3',
        referName: "Hardika Doshi",
        referJob: "Assistant Software Engineer",
        referWorkExperience: "02 years",
        referLinkedin: "aaasaadadads"
    },
    {
        referId: '4',
        referName: "Sushant Sangle",
        referJob: "Assistant Software Engineer",
        referWorkExperience: "03 years",
        referLinkedin: "aaasaadadads"
    }
];

export default class ReferredPeople extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
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