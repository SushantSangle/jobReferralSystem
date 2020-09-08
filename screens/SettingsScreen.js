import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import { User } from 'parse/react-native'
import RNRestart from 'react-native-restart';
import RoleManager from '../utils/RoleManager';

const width = Dimensions.get("window").width;


const SettingsScreen = ({ navigation }) => {
    const onPressTheme = () => {
        navigation.navigate("changeTheme");
    }
    const onPressLogo = () => {
        navigation.navigate("ChangeLogo");
    }
    const onPressLogout = () => {
        User.logOut().then(async()=>{
            ToastAndroid.show('Logged Out Successfully',ToastAndroid.SHORT);
            await RoleManager.setRole();
            RNRestart.Restart();
        }).catch((error)=>{
            console.log("ERROR Logging out:"+error);
            ToastAndroid.show('Error Logging out',ToastAndroid.SHORT);
        });
    }

    return (

        <View style={styles.settings_view}>
            {RoleManager.getLevel()<1 && <>
            <TouchableOpacity onPress={onPressTheme}>
                <Text style={styles.settings_head}>Change Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressLogo}>
                <Text style={styles.settings_head}>Change Logo</Text>
            </TouchableOpacity>
            </>}
            <TouchableOpacity onPress={onPressLogout}>
                <Text style={styles.settings_head}>Log out</Text>
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
