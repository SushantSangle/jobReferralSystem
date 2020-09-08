import { createStackNavigator } from 'react-navigation-stack';
import NewUser from '../screens/NewUser';
import EditUser from '../screens/EditUser';
import UserDetails from '../screens/userdetails';
import UserManagement from '../screens/UserManagement';

const screens = {
    UserManagement: {
        screen: UserManagement,
        navigationOptions: {
            title: "User Management"
        }
    },
    NewUser: {
        screen: NewUser,
        navigationOptions: {
            title: "Add New User"
        }
    },
    EditUser: {
        screen: EditUser,
        navigationOptions: {
            title: "Edit User Details"
        }
    },
    UserDetails: {
        screen: UserDetails,
        navigationOptions: {
            title: "User Details"
        }
    },
}

const userManagementStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#88b972",
            height: 50
        }
    }
});

export default userManagementStack;
