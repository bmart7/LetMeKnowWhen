/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import NotifUtil from './utils/NotifUtil';

NotifUtil.setup();

AppRegistry.registerComponent(appName, () => App);
