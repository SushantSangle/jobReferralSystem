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
    Image
} from 'react-native';
import {
    Query
} from 'parse/react-native';
import JobCard from '../components/job_card';
import { FlatList } from 'react-native-gesture-handler';

class Home extends Component{
    constructor(props){
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            data : [],
            dataAvailable : false,
        }
        var query = new Query("jobPosts");
        var eachPromise = query.each((result)=>{
            this.state.data.push({
                jobId : result.get('objectId'),
                jobHead : result.get('jobPosition'),
                jobType: result.get("jobType"),
                jobLocation : result.get("location"),
                jobAuthor : result.get("postedBy").get("username"),
                jobTechnology : result.get("technology"),
                jobDate : result.get("createdAt"),
            });
            this.dataAvailable=true;
            console.log("data read");
        })
        eachPromise.then((result)=>{
            console.log("data promise fulfilled");
            console.log(this.state.data);
        },(error)=>{
            console.log("data Promise ERROR:"+error);
        }).catch((error)=>{
            console.log("data Promise ERROR:"+error);
        })
    }
    render(){
        return (
            <>
                {   
                    this.dataAvailable &&
                    <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.jobId} />
                }
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
        )
    }
    renderItem(item){
        return(
            <JobCard
            jobId={item.jobId}
            jobHead={item.jobHead}
            jobType={item.jobType}
            jobLocation={item.jobLocation}
            jobAuthor={item.jobAuthor}
            jobTechnology={item.jobTechnology}
            jobDate={item.jobDate}
            navigation={navigation} />
        )
    }
    clickHandler(){
        navigation.navigate("NewPost");
    };
}

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

export default Home;
