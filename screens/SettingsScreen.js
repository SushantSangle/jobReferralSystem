import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import { User } from 'parse/react-native'
import RNRestart from 'react-native-restart';
import RoleManager from '../utils/RoleManager';

const width = Dimensions.get("window").width;


export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }
    onPressTheme = () => {
        RoleManager.invert_dark();
        console.log("In Settings: ", RoleManager.get_dark());
        alert("Theme Changed. Restart App.");
        this.forceUpdate();
    }
    onPressLogo = () => {
        this.navigation.navigate("ChangeLogo");
    }
    onPressLogout = () => {
        User.logOut().then(async () => {
            ToastAndroid.show('Logged Out Successfully', ToastAndroid.SHORT);
            await RoleManager.setRole();
            RNRestart.Restart();
        }).catch((error) => {
            console.log("ERROR Logging out:" + error);
            ToastAndroid.show('Error Logging out', ToastAndroid.SHORT);
        });
    }

    render() {
        return (
            <View style={styles.settings_view}>
                
                <TouchableOpacity onPress={this.onPressTheme}>
                    <Text style={styles.settings_head}>Change Theme</Text>
                </TouchableOpacity>
                <View
                    style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 5,
                        marginVertical: '2.5%'
                    }}
                />
                {RoleManager.getLevel() < 1 && <>
                    <TouchableOpacity onPress={this.onPressLogo}>
                        <Text style={styles.settings_head}>Change Logo</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 5,
                            marginVertical: '2.5%'
                        }}
                    />
                </>}
                <TouchableOpacity onPress={this.onPressLogout}>
                    <Text style={styles.settings_head}>Log out</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    settings_view: {
        width: "100%",
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

