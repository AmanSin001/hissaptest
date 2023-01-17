import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  AppState
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { getAllEvents } from '../../redux/Events/actions';
import { socket } from '../../Config/WebSockets';

const { width, height } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  const { events, events_loading, events_error, marked_dates } = useSelector(
    state => state.events,
  );

  const { auth } = useSelector(state => state.auth);

  const renderEvent = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.event}
        onPress={() =>
          navigation.push('Event', {
            id: item?.id,
          })
        }>
        <View style={styles.singleEvent}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              marginTop: 5,
              marginRight: 10,
              backgroundColor: item?.badgeColor,
            }}></View>
          <View>
            <Text style={styles.eventTitle}>
              {item?.client_first_name} {item?.client_last_name}
            </Text>
            <Text>
              {'De '}
              {moment(item?.start).format('HH:mm')}
              {moment(item?.start).format('LL') !=
                moment(item?.end).format('LL') &&
                ' le ' + moment(item?.start).format('LL') + '\n'}
              {' à '}
              {moment(item?.end).format('HH:mm')}
              {moment(item?.start).format('LL') !=
                moment(item?.end).format('LL') &&
                ' le ' + moment(item?.end).format('LL')}
            </Text>
            <Text>{item?.libelle}</Text>
            <Text>
              {moment(item?.start).format('LLL')} -{' '}
              {moment(item?.end).format('LLL')}
            </Text>
          </View>
          <View style={styles.buttonView}>
            <MaterialCommunityIcons name="eye" size={23} color="#abcfe7" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const upcomingEvents = events?.events?.filter((item, index) => {
    return moment(item?.start).isAfter(new Date());
  });

  useEffect(() => {
    Alert.alert("ds aert")
    const token = auth?.token;
    checkNotification()
    function handleAppStateChange(nextAppState) {
      if (nextAppState === 'active') {
        checkNotification()
      }
    }
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
    dispatch(getAllEvents(token));
  }, []);

  async function checkNotification() {
    const notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
      let eventId = notificationOpen.data?.eventId
      if(eventId) {
        function sendToEvent() {
          if(socket.readyState == 1) {
            navigation.push('Event', {
              id: eventId
            })
          }
          else {
            setTimeout(() => {
              console.log(socket.readyState)
            }, 1000)
          }
        }
        sendToEvent()
      }
    }
  }

  navigation.addListener('focus', () => {
    console.log("Focused")
  });
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Events</Text>

      <FlatList
        data={upcomingEvents?.splice(0, 5)}
        renderItem={renderEvent}
        style={styles.events}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(index, key) => key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  events: {
    flex: 1,
    // paddingTop: 10,
    // paddingHorizontal: width * 0.03,
  },
  event: {
    marginVertical: 7,
    marginHorizontal: width * 0.03,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#7e9db3',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },
  singleEvent: {
    flexDirection: 'row',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  eventTitle: {
    fontWeight: 'bold',
  },
});

export default Dashboard;
