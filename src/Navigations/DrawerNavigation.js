import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import { loginUser } from '../redux/Auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { reconnectWebsocket, socket } from '../Config/WebSockets';
import CalendarStack from './CalendarStack';
import messaging from '@react-native-firebase/messaging';
import AppointmentForm from '../Screens/AppointmentForm/AppointmentForm';
import AppointmentList from '../Screens/AppointmentList/AppointmentList';
import { locationChangeListener } from '../Constants/LocationChangeListener';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state.auth);
  const userType = auth?.user?.userType;
  switch (userType) {
    case 'Administrateur':
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Tableau de bord"
            onPress={() => props.navigation.navigate('DashboardTab')}
          />
          {/* <DrawerItem
            label="Clients"
            onPress={() => props.navigation.navigate('Client')}
          /> */}
          <DrawerItem
            label="Agenda"
            onPress={() => props.navigation.navigate('CalendarTab')}
          />
          <DrawerItem
            label="Prospects"
            onPress={() => props.navigation.navigate('AppointmentList')}
          />
          <DrawerItem
            label="1er rendez-vous"
            onPress={() => props.navigation.navigate('AppointmentForm')}
          />
          <DrawerItem
            label="Déconnexion"
            onPress={() => {
              props.navigation.closeDrawer();
              reconnectWebsocket();
              setTimeout(() => {
                dispatch(loginUser(true));
              }, 1000);
            }}
          />
        </DrawerContentScrollView>
      );
    case 'Responsables de secteur':
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Tableau de bord"
            onPress={() => props.navigation.navigate('DashboardTab')}
          />
          {/* <DrawerItem
            label="Clients"
            onPress={() => props.navigation.navigate('Client')}
          /> */}
          <DrawerItem
            label="Prospects"
            onPress={() => props.navigation.navigate('AppointmentList')}
          />
          <DrawerItem
            label="1er rendez-vous"
            onPress={() => props.navigation.navigate('AppointmentForm')}
          />
          <DrawerItem
            label="Agenda"
            onPress={() => props.navigation.navigate('CalendarTab')}
          />
          <DrawerItem
            label="Déconnexion"
            onPress={() => {
              props.navigation.closeDrawer();
              reconnectWebsocket();
              setTimeout(() => {
                dispatch(loginUser(true));
              }, 1000);
            }}
          />
        </DrawerContentScrollView>
      );
    case 'Intervenants':
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Déconnexion"
            onPress={() => {
              props.navigation.closeDrawer();
              reconnectWebsocket();
              setTimeout(() => {
                dispatch(loginUser(true));
              }, 1000);
            }}
          />
        </DrawerContentScrollView>
      );
    case 'Chauffeurs':
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Déconnexion"
            onPress={() => {
              props.navigation.closeDrawer();
              reconnectWebsocket();
              setTimeout(() => {
                dispatch(loginUser(true));
              }, 1000);
            }}
          />
        </DrawerContentScrollView>
      );

    default:
      break;
  }

  // return (
  //   <DrawerContentScrollView {...props}>
  //     <DrawerItem
  //       label="Dashboard"
  //       onPress={() => props.navigation.navigate('Dashboard')}
  //     />
  //     <DrawerItem
  //       label="Clients"
  //       onPress={() => props.navigation.navigate('Client')}
  //     />
  //     <DrawerItem
  //       label="Calendar"
  //       onPress={() => props.navigation.navigate('Calendar')}
  //     />
  //     <DrawerItem label="Logout" onPress={() => dispatch(loginUser())} />
  //   </DrawerContentScrollView>
  // );
}

const openSetting = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};

const DrawerNavigation = () => {
  const { auth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let token = auth?.token;
  const saveTokenToDatabase = ffToken => {
    console.log('Token', ffToken);
    if(socket.readyState == 1) {
      socket.send(JSON.stringify({ request: 'saveFToken', ffToken, token }));
    }
  };

  const locationChangeHandler = position => {
    let locationObject = {
      request: 'locationUpdate',
      token,
      location: position?.coords,
    };
    if(socket.readyState == 1) {
      socket.send(JSON.stringify(locationObject));
    }
  };

  useEffect(() => {
    console.log('Drawer navigation useeffect triggered');
    if(socket.readyState == 1) {
      socket.send(JSON.stringify({ request: 'verify', token: token }));
    }

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'Background Message handled in the background!',
        remoteMessage,
      );
    });

    messaging().onMessage(async remoteMessage => {
      console.log('Messege Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('Opened Message handled in the background!', remoteMessage);
    });

    messaging()
      .getToken()
      .then(token => {
        saveTokenToDatabase(token);
      });

    messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
    // return () => {
    //   console.log('New Web socket before');
    //   socket.close();
    //   console.log('New Web socket done');
    // };

    locationChangeListener(locationChangeHandler);
  }, []);

  const renderDrawer = () => {
    const userType = auth?.user?.userType;
    console.log('Type', userType);
    switch (userType) {
      case 'Administrateur':
        return (
          <>
            <Drawer.Screen
              name="Stack"
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="AppointmentForm"
              component={AppointmentForm}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="AppointmentList"
              component={AppointmentList}
              options={{ headerShown: false }}
            />
          </>
        );
      case 'Responsables de secteur':
        return (
          <>
            <Drawer.Screen
              name="Stack"
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="AppointmentForm"
              component={AppointmentForm}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="AppointmentList"
              component={AppointmentList}
              options={{ headerShown: false }}
            />
          </>
        );
      case 'Intervenants':
        return (
          <Drawer.Screen
            name="Stack"
            component={CalendarStack}
            options={{ headerShown: false }}
          />
        );
      case 'Chauffeurs':
        return (
          <Drawer.Screen
            name="Stack"
            component={CalendarStack}
            options={{ headerShown: false }}
          />
        );

      default:
        break;
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {renderDrawer()}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
