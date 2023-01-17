import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { globalColors } from '../../Constants/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-spinkit';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../Config/WebSockets';
import { useIsFocused } from '@react-navigation/native';
import { getCurrentLocation } from "../../Constants/GetCurrentLocation"
import { updateSingleEvent } from "../../redux/Events/actions"

const { width, height } = Dimensions.get('window');

const QRScanner = ({ navigation, route }) => {
  const [flashlight, setFlashlight] = useState({
    type: RNCamera.Constants.FlashMode.off,
    mode: false,
  });

  const [loading, setLoading] = useState(false);

  const { data } = route.params;

  const qrReaderRef = useRef();

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const { auth } = useSelector(state => state.auth);

  const toggleFlashlight = () => {
    if (flashlight?.mode === true) {
      setFlashlight({
        type: RNCamera.Constants.FlashMode.off,
        mode: false,
      });
    } else {
      setFlashlight({
        type: RNCamera.Constants.FlashMode.torch,
        mode: true,
      });
    }
  };

  const qrCodeSuccesshandler = async e => {
    setLoading(true);
    const qrData = e?.data;
    console.log('QR DATA', qrData);

    try {
      const name = qrData.split('-')[0];
      if (name === 'hissapapp') {
        console.log('Success');
        const location = await getCurrentLocation();
        socket.send(
          JSON.stringify({
            request: 'verifyIntervenantEvent',
            clientId: data?.idClient,
            event: data,
            qr: qrData,
            token: auth?.token,
            location,
          }),
        );
        socket.addEventListener('message', ({ data }) => {
          // console.log('Event Verificat', data);
          data = JSON.parse(data);
          if (
            data?.request === 'verifyIntervenantEvent' &&
            data?.error === true
          ) {
            console.log('Recieved Response Error');

            setTimeout(() => {
              setLoading(false);

              qrReaderRef?.current?.reactivate();
            }, 2000);
          } else if (
            data?.request === 'verifyIntervenantEvent' &&
            data?.success === true
          ) {
            console.log('Recieved Response');
            setLoading(false);
            dispatch(updateSingleEvent(data));
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Success',
              text2: 'QR Code is verified',
              autoHide: true,
              topOffset: 50,
              visibilityTime: 3000,
            });
            navigation.goBack();
          }
        });
      } else {
        console.log('Error');

        setTimeout(() => {
          setLoading(false);

          qrReaderRef?.current?.reactivate();
        }, 3000);
      }
    } catch (error) {
      console.log('QR CODE error', error);
    }
  };

  //   useEffect(() => {
  //     if (isFocused) {
  //       setLoading(false);
  //     }
  //   }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        <QRCodeScanner
          onRead={qrCodeSuccesshandler}
          flashMode={flashlight?.type}
          fadeIn={true}
          showMarker={true}
          markerStyle={{ borderColor: globalColors.primary, borderWidth: 4 }}
          ref={qrReaderRef}
        />
        <TouchableOpacity onPress={toggleFlashlight} style={styles.icon}>
          {flashlight?.mode === true ? (
            <MaterialCommunityIcons
              name="flashlight"
              size={30}
              color={globalColors.primary}
            />
          ) : (
            <MaterialCommunityIcons
              name="flashlight-off"
              size={30}
              color={globalColors.primary}
            />
          )}
        </TouchableOpacity>
        {loading ? (
          <View style={styles.loader}>
            <Spinner
              color={globalColors.primary}
              size={width * 0.25}
              type="Wave"
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 0,
    margin: 0,
  },
  cameraContainer: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff70',
    zIndex: 9,
  },
  icon: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    backgroundColor: globalColors.white,
    padding: 10,
    borderRadius: 50,
  },
});

export default QRScanner;

