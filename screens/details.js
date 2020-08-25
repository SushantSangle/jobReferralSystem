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
} from 'react-native';

const Details = ({ navigation }) => {
    return (
        <>
            <View>
                <Text>
                    Heading: {navigation.getParam('head')}
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
});

export default Details;
