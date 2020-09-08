/**
 * @format
 */

import { AppRegistry } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { name as appName } from './app.json';
import App from './App';
import App1 from './App1';
import LoginStack from './routes/newLoginStack';
AppRegistry.registerComponent(appName, () => App1);
