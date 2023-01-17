import { AuthActionTypes } from './types';
import { socket, reconnectWebsocket, getSocket } from '../../Config/WebSockets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store';
import RNSplashScreen from 'react-native-splash-screen';
import RNRestart from 'react-native-restart'

export const authenticateUser = (username, password) => async dispatch => {
  dispatch({ type: AuthActionTypes.AUTH_LOADING });
  try {
    socket.send(
      JSON.stringify({
        request: 'login',
        username,
        password,
      }),
    );
    socket.addEventListener('message', async ({ data }) => {
      // console.log('Data', data);
      let userData = JSON.parse(data);
      if (userData?.request === 'login' && userData?.error === true) {
        dispatch({
          type: AuthActionTypes.AUTH_ERROR,
          payload: userData,
        });
      } else if (userData?.request === 'login' && userData?.success === true) {
        await AsyncStorage.setItem('user', data);
        dispatch({ type: AuthActionTypes.AUTH, payload: userData });
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AuthActionTypes.AUTH_ERROR, payload: error });
  }
};

export const verifyUser = (token, user) => async dispatch => {
  console.log('verifyUser');
  dispatch({ type: AuthActionTypes.AUTH_LOADING });
  try {
    socket.send(
      JSON.stringify({
        request: 'authenticateToken',
        token,
      }),
    );
    socket.addEventListener('message', async ({ data }) => {
      let userData = JSON.parse(data);

      if (
        userData?.error === true &&
        userData.request === 'authenticateToken'
      ) {
        store.dispatch(loginUser());
        RNSplashScreen.hide();
      } else if (
        userData?.success === true &&
        userData.request === 'authenticateToken'
      ) {
        console.log('Verify User', userData);
        dispatch({ type: AuthActionTypes.AUTH, payload: user });
        RNSplashScreen.hide();
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AuthActionTypes.AUTH_ERROR, payload: error });
  }
};

export const loginUser = (logout = false) => async dispatch => {
  await AsyncStorage.removeItem('user');
  if(!logout) {
    dispatch({ type: AuthActionTypes.LOGIN_REQUIRED });
  }
  console.log(`logout: `+logout)
  if(logout) {
    socket.close()
    RNRestart.Restart();
  }
};
