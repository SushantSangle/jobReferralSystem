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
    Dimensions,
    TextInput,
    FlatList,
} from 'react-native';
import PopupMenu from '../components/popup_menu';
import Comment from '../components/comment';
import Button from '../components/button';

export default class ReferredPeople extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    render() {
        return (
            <Text>ABC</Text>
        );
    };
}