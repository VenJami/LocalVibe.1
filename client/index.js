/**
 * @format
 */

import {AppRegistry, LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Found screens with the same name nested inside one another']);
LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
LogBox.ignoreLogs(['The object notation for `createReducer` is deprecated, and will be removed in RTK 2.0.']);
LogBox.ignoreLogs(['source.uri should not be an empty string']);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 0):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 1):']);
LogBox.ignoreLogs([/ReactImageView: Image source "" doesn't exist/]);


AppRegistry.registerComponent(appName, () => App);
