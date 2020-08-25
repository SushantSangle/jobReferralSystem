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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsMenu from "react-native-options-menu";

const width = Dimensions.get("window").width;

const JobCard = (props) => {
    const myIcon = (
        <Icon name="more-vert" size={20} />
    );

    const onPress = () => {
        props.navigation.navigate("Details", {
            jobHead: props.jobHead,
            jobType: props.jobType,
            jobLocation: props.jobLocation,
            jobAuthor: props.jobAuthor,
            jobTechnology: props.jobTechnology,
            jobWorkExperience: props.jobWorkExperience,
            jobDescription: props.jobDescription,
            jobDate: props.jobDate,
        });
    }

    const editPost = () => {
        props.navigation.navigate("EditPost", {
            jobHead: props.jobHead,
            jobType: props.jobType,
            jobLocation: props.jobLocation,
            jobAuthor: props.jobAuthor,
            jobTechnology: props.jobTechnology,
            jobWorkExperience: props.jobWorkExperience,
            jobDescription: props.jobDescription,
            jobDate: props.jobDate,
        });
    }

    const deletePost = () => {
        alert("Post Deleted!");
    }

    const cancel = () => {
        alert("Cancel");
    }

    const onLongPress = () => {
        alert("Long Pressed");
    }

    return (
        <>
            <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
                <View style={styles.jobcard_view}>

                    <Text style={styles.jobcard_head}>{props.jobHead}</Text>
                    <OptionsMenu
                        style={styles.threedot}
                        options={["Edit", "Delete", "Cancel"]}
                        actions={[editPost, deletePost, cancel]} />
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
