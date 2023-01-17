import React from 'react';
import {StatusBar} from 'react-native';
import MainNavigation from './src/Navigations/MainNavigation';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store';
import WebSockets from './src/Config/WebSockets';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#3c4b64" />
      <WebSockets />
      <NavigationContainer>
        <MainNavigation />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
