import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  AppState
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'
import locale from 'moment/locale/fr'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllEventsbyIC, updateSingleEvent } from '../../redux/Events/actions';
import NextIcon from '../../Assets/next.png';
import PreviousIcon from '../../Assets/previous.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalColors } from '../../Constants/Constants';
import Toast from 'react-native-toast-message';
import { StackActions, CommonActions } from '@react-navigation/native';
import { NavigationContext } from '@react-navigation/native';
import Spinner from 'react-native-spinkit';
import messaging from '@react-native-firebase/messaging';
import { socket } from '../../Config/WebSockets';

const { width, height } = Dimensions.get('window');

const Calendar = ({ navigation }) => {
  const dispatch = useDispatch();
  const { events, events_loading, events_error, marked_dates, newEvent, updatedEvent, deletedEvent } = useSelector(
    state => state.events,
  );
  const { auth } = useSelector(state => state.auth);

  const [date, setDate] = useState(moment());
  const [eventsLoading, setEventLoading] = useState(true)
  const [ gotNotificationEvent, setGotNotificationEvent ] = useState(null)

  // console.log('EVENTS', events);
  // console.log('EVENTS Loading', events_loading);
  // console.log('EVENTS ERROR', events_error);

  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(3, 'days'), // total 4 days enabled
    },
  ];
  let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled
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
  useEffect(() => {
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
  }, [])
  useEffect(() => {
    if(newEvent) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'New event added',
        autoHide: true,
        topOffset: 30,
        visibilityTime: 5000,
        onPress: () => {
          navigation.push('Event', {
            id: newEvent?.id,
          })
        }
      })
    }
  }, [newEvent])

  useEffect(() => {
    if(events?.events) {
      setEventLoading(false)
    }
  }, [events])

  useEffect(() => {
    if(updatedEvent) {
      const eventDate = updatedEvent.startTime
      const message = `L'intervention du ${moment(eventDate).format("DD/MM/YYYY")} chez le client ${updatedEvent.client_last_name} ${updatedEvent.client_first_name} a été mise à jour`
      Toast.show({
        type: 'success',
        position: 'top',
        text1: "Une intervention a été mise à jour",
        text2: message,
        autoHide: true,
        topOffset: 30,
        visibilityTime: 5000,
        onPress: () => {
          navigation.push('Event', {
            id: updatedEvent?.id,
          })
        }
      })
      //updateSingleEvent(updateSingleEvent(updatedEvent))
    }
  }, [updatedEvent])

  useEffect(() => {
    if(deletedEvent) {
      const userType = auth?.user?.userType;
      if (userType === 'Intervenants' || userType === 'Chauffeurs') {
        const eventDate = deletedEvent.startTime
        const message = `L'intervention du ${moment(eventDate).format("DD/MM/YYYY")} chez le client ${deletedEvent.client_last_name} ${deletedEvent.client_first_name} a été supprimée`
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Suppression d’une intervention',
          text2: message,
          autoHide: true,
          topOffset: 50,
          visibilityTime: 5000,
        })
      }
    }
  }, [deletedEvent])

  useEffect(() => {
    const userType = auth?.user?.userType;
    if (userType === 'Intervenants' || userType === 'Chauffeurs') {
      navigation.setOptions({ title: 'Mon agenda' });
    }
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      ),
    });
    const token = auth?.token;
    const id = auth?.user?.id;
    if (userType === 'Intervenants') {
      dispatch(getAllEventsbyIC(token, id, 0));
      console.log('Done intervent');
    } else if (userType === 'Chauffeurs') {
      dispatch(getAllEventsbyIC(token, 0, id));
      console.log('Done chaffeur');
    } else if (userType === 'Administrateur') {
      dispatch(getAllEvents(token));
      console.log('Done Administrateur');
    } else if (userType === 'Responsables de secteur') {
      dispatch(getAllEvents(token));
      console.log('Done Responsables de secteur');
    }
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      const userType = auth?.user?.userType;
      const token = auth?.token;
      const id = auth?.user?.id;
      setEventLoading(true)
      if (userType === 'Intervenants') {
        dispatch(getAllEventsbyIC(token, id, 0));
        console.log('Done intervent');
      } else if (userType === 'Chauffeurs') {
        dispatch(getAllEventsbyIC(token, 0, id));
        console.log('Done chaffeur');
      } else if (userType === 'Administrateur') {
        dispatch(getAllEvents(token));
        console.log('Done Administrateur');
      } else if (userType === 'Responsables de secteur') {
        dispatch(getAllEvents(token));
        console.log('Done Responsables de secteur');
      }
    });
  }, [])

  const yesterdayButtonHandler = () => {
    let yesterday = moment(date).subtract(1, 'day');
    setDate(yesterday);
  };

  const todayButtonHandler = () => {
    console.log('Events', events?.events);
    console.log('Events Length', events?.events?.length);
    console.log('Markdates Length', marked_dates?.length);
    setDate(moment());
  };

  const tomorrowButtonHandler = () => {
    let tomorrow = moment(date).add(1, 'day');
    setDate(tomorrow);
  };

  const renderEvent = ({ item }) => {
    if (moment(item?.startTime).isSame(moment(date), 'day')) {
      let clientName = null
      if(item.client_first_name && item.client_last_name) {
        clientName = item.client_first_name + " " + item.client_last_name
      }
      else if(item.nom && item.prenom) {
        clientName = item.nom + " " + item.prenom
      }
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
                {clientName}
              </Text>
              <Text>
                {'De '}
                {moment(item?.startTime).format('HH:mm')}
                {moment(item?.startTime).format('LL') !=
                  moment(item?.endTime).format('LL') &&
                  ' le ' + moment(item?.startTime).format('LL') + '\n'}
                {' à '}
                {moment(item?.endTime).format('HH:mm')}
                {moment(item?.startTime).format('LL') !=
                  moment(item?.endTime).format('LL') &&
                  ' le ' + moment(item?.endTime).format('LL')}
              </Text>
              <Text>{item?.libelle}</Text>
            </View>
            <View style={styles.buttonView}>
              <MaterialCommunityIcons name="eye" size={23} color="#abcfe7" />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CalendarStrip
        calendarAnimation={{ type: 'sequence' }}
        daySelectionAnimation={{
          type: 'background',
          duration: 200,
        }}
        scrollable={true}
        scrollToOnSetSelectedDate={true}
        // scrollerPaging={true}

        style={{
          height: height * 0.13,
          paddingTop: 10,
          paddingBottom: 0,
          backgroundColor: '#455774',
        }}
        calendarHeaderStyle={{ color: 'white' }}
        calendarColor={'#7743CE'}
        dateNumberStyle={{ color: 'white' }}
        dateNameStyle={{ color: 'white' }}
        highlightDateNumberStyle={{ color: '#3c4b64', fontWeight: 'bold' }}
        highlightDateNameStyle={{ color: '#3c4b64', fontWeight: 'bold' }}
        highlightDateContainerStyle={{
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
        disabledDateNameStyle={{ color: 'grey' }}
        disabledDateNumberStyle={{ color: 'grey' }}
        // datesWhitelist={datesWhitelist}
        // datesBlacklist={datesBlacklist}
        // locale={{ name: 'fr', config: 'fr' }}
        markedDates={marked_dates}
        iconContainer={{ flex: 0.1 }}
        selectedDate={date}
        onDateSelected={date => setDate(date)}
        iconLeft={PreviousIcon}
        iconRight={NextIcon}
      />
      <View style={styles.eventsContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.buttonContainer}
            onPress={yesterdayButtonHandler}>
            <Image style={styles.buttonImage} source={PreviousIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.buttonContainer}
            onPress={todayButtonHandler}>
            <Text style={styles.buttonText}>Aujourd'hui</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.buttonContainer}
            onPress={tomorrowButtonHandler}>
            <Image style={styles.buttonImage} source={NextIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.eventDateContainer}>
          <Text style={styles.eventDateText}>
            Vos interventions du {moment(date).format('LL')}
          </Text>
        </View>

        { eventsLoading ? ( <View style={styles.loadingContainer}>
          <Spinner color={globalColors.primary} size={50} type="Circle" />
        </View> ) : (
          <FlatList
            data={events?.events}
            renderItem={renderEvent}
            style={styles.events}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyExtractor={(index, key) => key}
          /> ) }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    backgroundColor: '#516688',
    width: '33.33%',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  buttonImage: {
    width: 15,
    height: 15,
  },
  eventDateContainer: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: globalColors.white,
  },
  eventDateText: {
    fontSize: 17,
    color: '#3B4B64',
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  events: {
    flex: 1,
    paddingTop: 10,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10
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
  eventTitle: {
    fontWeight: 'bold',
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
});

export default Calendar;
