import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { PRIMARY_THEME, DARK_THEME, current_theme } from '../components/Colors';

export default class SettingScreen extends Component {
    constructor(props) {
        super(props);

        if (current_theme == 1) {
            this.colors = PRIMARY_THEME;
        }
        else {
            this.colors = DARK_THEME;
        }
    }

    render() {
        return (
            <View>
                <Text style={{ color: this.colors.text }}>
                    ABC
                </Text>
            </View>
        );
    }
};

const styles = require('../stylesheets/newPost');