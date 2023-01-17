import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const iosLocationPermissionHandler = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    //   Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    //   Alert.alert(
    //     `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
    //     '',
    //     [
    //       {text: 'Go to Settings', onPress: openSetting},
    //       {text: "Don't Use Location", onPress: () => {}},
    //     ],
    //   );
  }

  return false;
};

const androidLocationPermissionHandler = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    console.log('Denied');
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    console.log('Never ask again');
  }

  return false;
};

const hasLocationPermission = async () => {
  let permission;

  if (Platform.OS === 'android') {
    permission = await androidLocationPermissionHandler();
  } else if (Platform.OS === 'ios') {
    permission = await iosLocationPermissionHandler();
  }
  return permission;
};

export const locationChangeListener = async successFunction => {
  const hasPermission = await hasLocationPermission();

  console.log('has location', hasPermission);

  if (!hasPermission) {
    console.log('No permission');
    return;
  }

  let options = {
    accuracy: {
      android: 'high',
      ios: 'best',
    },
    enableHighAccuracy: true,
    distanceFilter: 0,
    interval: 5000,
    fastestInterval: 2000,
    forceRequestLocation: true,
    forceLocationManager: true,
    showLocationDialog: true,
    useSignificantChanges: false,
  };

  Geolocation.watchPosition(
    position => {
      // console.log(position);
      successFunction(position);
      // socket.onmessage = ({ data }) => console.log('Data', data);
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    options,
  );
};
