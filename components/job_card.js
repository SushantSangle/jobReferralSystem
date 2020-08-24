/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get("window").width;

const JobCard = (props) => {

    const onPress = () => {
        props.navigation.navigate("Details", { head: props.jobHead, id: props.jobId });
    }

    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.jobcard_view}>
                    <Text style={styles.jobcard_head}>{props.jobHead}</Text>
                    <Text style={styles.jobcard_details}>TYPE: {props.jobType}</Text>
                    <Text style={styles.jobcard_details}>LOCATION: {props.jobLocation}</Text>
                    <Text style={styles.jobcard_details}>POSTED BY: {props.jobAuthor}</Text>
                    <Text style={styles.jobcard_details}>Technology: {props.jobTechnology}</Text>

                    <View style={{ flexDirection: "row-reverse", alignContent: "center" }}>
                        <Text style={{ color: "#606770" }}>{props.jobDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

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

export default JobCard;
