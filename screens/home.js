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
    Button, TouchableOpacity,
    Image
} from 'react-native';

import JobCard from '../components/job_card';
import { FlatList } from 'react-native-gesture-handler';

const Data = [
    {
        jobId: '1',
        jobHead: 'Associate Software Engineer',
        jobType: 'FULL-TIME',
        jobLocation: 'PUNE',
        jobAuthor: 'HR',
        jobTechnology: 'PYTHON',
        jobWorkExperience: 'aaaaaaa',
        jobDescription: 'aaaaaaa',
        jobDate: '20/08/2020'
    },
    {
        jobId: '2',
        jobHead: 'Associate Software',
        jobType: 'FULL-TIME',
        jobLocation: 'MUMBAI',
        jobAuthor: 'HR',
        jobTechnology: 'PYTHON',
        jobWorkExperience: 'aaaaaaa',
        jobDescription: 'aaaaaaa',
        jobDate: '20/08/2020'
    }, {
        jobId: '3',
        jobHead: 'Associate Engineer',
        jobType: 'FULL-TIME',
        jobLocation: 'NASHIK',
        jobAuthor: 'HR',
        jobTechnology: 'PYTHON',
        jobWorkExperience: 'aaaaaaa',
        jobDescription: 'aaaaaaa',
        jobDate: '20/08/2020'
    }, {
        jobId: '4',
        jobHead: 'Associate',
        jobType: 'FULL-TIME',
        jobLocation: 'NAGPUR',
        jobAuthor: 'HR',
        jobTechnology: 'PYTHON',
        jobWorkExperience: 'aaaaaaa',
        jobDescription: 'aaaaaaa',
        jobDate: '20/08/2020'
    }, {
        jobId: '5',
        jobHead: 'Software Engineer',
        jobType: 'FULL-TIME',
        jobLocation: 'AKOLA',
        jobAuthor: 'HR',
        jobTechnology: 'PYTHON',
        jobWorkExperience: 'aaaaaaa',
        jobDescription: 'aaaaaaa',
        jobDate: '20/08/2020'
    }
];

const Home = ({ navigation }) => {

    const clickHandler = () => {
        navigation.navigate("NewPost");
    };

    const renderItem = ({ item }) => (
        <JobCard
            jobId={item.jobId}
            jobHead={item.jobHead}
            jobType={item.jobType}
            jobLocation={item.jobLocation}
            jobAuthor={item.jobAuthor}
            jobTechnology={item.jobTechnology}
            jobDate={item.jobDate}
            navigation={navigation} />
    );

    return (
        <>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.jobId} />

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={clickHandler}
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
};

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
