import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import DrawerNavigation from './DrawerNavigation';
import AuthStack from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, verifyUser } from '../redux/Auth/actions';
import { socket } from '../Config/WebSockets';
import RNSplashScreen from 'react-native-splash-screen';
import Loading from '../Components/Common/Loading/Loading';
import { addNewEvent, updateEvent, deleteEvent } from '../redux/Events/actions';

const MainNavigation = () => {
  let dispatch = useDispatch();

  let tmPingPong;

  const { auth, auth_loading, auth_error } = useSelector(state => state.auth);

  useEffect(() => {
    const __pong__ = () => {
      clearTimeout(tmPingPong);
    };

    const __ping__ = () => {
      // console.log('__ping__');
      socket.send(JSON.stringify({ request: '__ping__' }));
      tmPingPong = setTimeout(function () {}, 5000);
    };

    console.log('Working before socket');
    socket.onopen = async () => {
      console.log('Working Send Socket');
      // Ping Pong
      __ping__();
      setInterval(__ping__, 60000);

      let userData = JSON.parse(await AsyncStorage.getItem('user'));
      if (userData) {
        console.log('LOcal storage', userData);
        dispatch(verifyUser(userData?.token, userData));
      } else {
        dispatch(loginUser());
        RNSplashScreen.hide();
      }
    };

    socket.addEventListener('message', ({ data }) => {
      data = JSON.parse(data);
      console.log(data)
      console.log("HERE")
      // console.log('Event Modification');
      if (data?.request === 'newEvent') {
        console.log(data.request, data);
        dispatch(addNewEvent(data.event));
      }
      if (data?.request === 'updateAboutEvent') {
        console.log(data.request, data);
        dispatch(updateEvent(data.event));
      }
      if (data?.request === 'deleteEvent') {
        console.log(data.request, data);
        dispatch(deleteEvent(data?.event));
      }
    });

    socket.addEventListener('message', async e => {
      // ping pong
      let data = JSON.parse(e.data);
      if (data.request == '__ping__') {
        // console.log(data.message);
        // console.log('ping listener');
        __pong__();
        return;
      }
    });
  }, []);
  if (auth === null) {
    return <Loading />;
  } else if (auth) {
    return <DrawerNavigation />;
  } else {
    return <AuthStack />;
  }
};

export default MainNavigation;
