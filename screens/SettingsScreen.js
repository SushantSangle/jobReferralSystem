import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get("window").width;

const SettingsScreen = ({ navigation }) => {
    const onPressTheme = () => {
        navigation.navigate("changeTheme");
    }
    const onPressLogo = () => {
        alert('Logo!');
    }

    return (

        <View style={styles.settings_view}>
            <TouchableOpacity onPress={onPressTheme}>
                <Text style={styles.settings_head}>Change Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressLogo}>
                <Text style={styles.settings_head}>Change Logo</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    settings_view: {
        width: "100%",
        backgroundColor: "#efefef",
        alignSelf: "center",
        padding: 10,
        elevation: 10,
        marginVertical: "1%"
    },
    settings_head: {
        fontSize: width / 18,
        fontWeight: "bold",
        padding: 1,
        color: "#606770"
    },
});

export default SettingsScreen;
