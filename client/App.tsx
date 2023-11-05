import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import Store from './redux/Store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { getAllUsers, loadUser } from './redux/actions/userAction';
import { StatusBar, Text } from 'react-native';
import Loader from './src/common/Loader';

function App() {
  return (
    <Provider store={Store}>
      <AppStack />
    </Provider>
  );
}

const AppStack = () => {
  const { isAuthenticated, loading } = useSelector((state:any) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    Store.dispatch(loadUser());
    getAllUsers()(dispatch)
  }, []);

  return (
    <>
      <>
        <StatusBar
          animated={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
          showHideTransition={'fade'}
        />
      </>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated ? (
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <Auth />
            </NavigationContainer>
          )}
        </>
      )}
    </>
  );
};

export default App;
