import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/button';

const UserManagement = ({ navigation }) => {

    const onPressAddUser = () => {
        navigation.navigate("NewUser");
    }
    const onPressEditUser = () => {
        navigation.navigate("EditUser");
    }

    return (
        <View style={{ alignItems: "center", marginTop: '20%' }}>
            <Button text="Add User" onPress={onPressAddUser} />
            <Button text="Edit User Details" onPress={onPressEditUser} />
        </View>
    );
};

export default UserManagement;