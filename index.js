/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import App1 from './App1';
import LoginStack from './routes/newLoginStack';
import LoginScreen from './screens/LoginScreen'
AppRegistry.registerComponent(appName, () => LoginScreen);
