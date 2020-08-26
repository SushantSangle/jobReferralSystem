import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../screens/LoginScreen';
import NewPost from '../screens/NewPost';
import NewUser from '../screens/NewUser';
import ReferPerson from '../screens/ReferPerson';
import EditPost from '../screens/EditPost';
import EditUser from '../screens/EditUser';
const screens = {
    Login: {
        screen: Login
    },
    NewPost:{
        screen: NewPost
    },
    ReferPerson:{
        screen: ReferPerson
    },
    EditPost:{
        screen: EditPost
    },
    NewUser:{
        screen: NewUser
    },
    EditUser:{
        screen: EditUser
    }
}
const LoginStack = createStackNavigator(screens)
export default createAppContainer(LoginStack)