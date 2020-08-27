/**
 * @format
 */

import { AppRegistry } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { name as appName } from './app.json';
import App from './App';
import NewPost from './screens/NewPost';
import EditPost from './screens/EditPost';
import NewUser from './screens/NewUser';
import EditUser from './screens/EditUser';
import ReferPerson from './screens/ReferPerson';
import Button from './components/button';
import UserManagement from './screens/UserManagement';
import PropTypes from 'prop-types';
import RefferedPeople from './screens/RefferedPeople.js';
AppRegistry.registerComponent(appName, () => RefferedPeople);
