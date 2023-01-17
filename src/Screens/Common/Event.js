import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../../Assets/photo-1511367461989-f85a21fda167.png';
import { globalColors } from '../../Constants/Constants';
import { getAllEvents, getAllEventsbyIC } from '../../redux/Events/actions';
import Toast from 'react-native-toast-message';
import EventTable from '../../Components/Event/EventTable/EventTable';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import { socket } from '../../Config/WebSockets';

const Event = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { id } = route.params;
  const { auth } = useSelector(state => state.auth);
  const { events, updatedEvent } = useSelector(state => state.events);
  const userType = auth?.user?.userType;
  const [showAddessAndButton, setShowAddessAndButton] = useState(false)
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  let onlyText = false

  useEffect(() => {
    if(updatedEvent) {
      console.log("updated events")
      if(eventData) {
        console.log("EVENT DATA")
        if(updatedEvent.id == eventData.id) {
          console.log("DONE")
          setEventData(updatedEvent)
          const token = auth?.token;
          const id = auth?.user?.id;
        }
      }
    }
  }, [updatedEvent])

  const openMapHandler = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const address = `${eventData?.client_latitude},${eventData?.client_longitude}`;
    const url = Platform.select({
      ios: `${scheme}${address}`,
      android: `${scheme}${address}`,
    });

    Linking.openURL(url);
  };

  const activeButtonHandler = () => {
    let now = moment();
    let startTime = moment(eventData?.start);
    let endTime = moment(eventData?.end);
    let difference = startTime.diff(now, 'minutes');
    let differenceTime = endTime.diff(startTime, 'minutes');

    if (userType === 'Administrateur') {
      return false;
    } else if (userType === 'Responsables de secteur') {
      return false;
    } else if (eventData?.status === 'Termine') {
      onlyText = true
      return true;
    } else if (eventData?.status === 'En retard') {
      onlyText = true
      return true;
    } else if (eventData?.status === 'Reporté') {
      onlyText = true
      return true;
    } else if (eventData?.status === 'Annuler') {
      onlyText = true
      return true;
    } else if (difference + differenceTime >= 0) {
      return true;
    }
  };

  const eventButtonHandler = () => {
    if (eventData?.status === 'A realiser') { // Start button
      return "Démarrer l'intervention";
    }
    else if (eventData?.status === 'En cours') { // End button
      return "Terminer l'intervention";
    }
    else if(eventData?.status == "Annuler" || eventData?.status == "Termine") {
      return "Cette intervention est terminée";
    }
    else {
      return null;
    }
  };

  const eventHandler = () => {
    if(userType.toLowerCase() == "chauffeurs") {
      if(eventData.status == "En cours") {
        setLoading(true)
        let dropAddress = eventData.idDropAddress
        socket.send(JSON.stringify({ request: 'endEvent', event: { id }, endAddress: dropAddress }))
        socket.addEventListener('message', async ({ data }) => {
          let parsedData = JSON.parse(data)
          if(parsedData.request == "endEvent") {
            let newEventData = parsedData.newEventData
            if(newEventData.id == eventData.id) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Intervention',
                text2: parsedData.message,
                autoHide: true,
                topOffset: 50,
                visibilityTime: 5000,
              });
              navigation.goBack()
            }
          }
        })
      }

      if(eventData.status == "A realiser") {
        setLoading(true)
        socket.send(JSON.stringify({ request: 'startEvent', event: { id } }))
        socket.addEventListener('message', async ({ data }) => {
          let parsedData = JSON.parse(data)
          if(parsedData.request == "startEvent") {
            let newEventData = parsedData.newEventData
            if(newEventData.id == eventData.id) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Intervention',
                text2: parsedData.message,
                autoHide: true,
                topOffset: 50,
                visibilityTime: 5000,
              });
              navigation.goBack()
            }
          }
        })
      }
    }
    if(userType.toLowerCase() == "intervenants") {
      navigation.push('QRScanner', {
        data: eventData,
      })
    }
  };

  console.log(id);
  let index = events?.events?.findIndex(event => event.id === id);
  let data = events?.events?.[index];
  console.log(data);

  useEffect(() => {
    if (index !== -1) {
      console.log('Working Found');
      if(events?.events[index]) {
        if(events?.events[index].idChauffeur > 0) {
          if(userType.toLowerCase() == "administrateur") {
            setShowAddessAndButton(true)
          }
        }
        if(userType.toLowerCase() == "chauffeurs") {
          setShowAddessAndButton(true)
        }
      }
      setEventData(events?.events[index]);
    } else if (index === -1) {
      console.log('Working not found');
      const eventDate = eventData.startTime
      const message = `L'intervention du ${moment(eventDate).format("DD/MM/YYYY")} chez le client ${eventData.client_last_name} ${eventData.client_first_name} a été mise à jour`
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Une intervention a été mise à jour',
        text2: message,
        autoHide: true,
        topOffset: 50,
        visibilityTime: 5000,
      });
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    }
  }, [index, data]);

  const getButtonStyle = () => {
    console.log(globalColors)
    if (eventData?.status === 'A realiser') { // Start button
      return styles.successButtonContainer
    }
    else if (eventData?.status === 'En cours') { // End button
      return styles.dangerButtonContainer
    }
    return styles.buttonContainer
  }

  const eventActionButton = () => {
    if(activeButtonHandler()) {
      if(onlyText) {
        console.log("returned")
        return (
          <Text style={styles.normalText}>{eventButtonHandler()}</Text>
        )
      }
      else {
        return (
          <TouchableOpacity style={getButtonStyle()} onPress={eventHandler}>
            <Text style={styles.button}>{eventButtonHandler()}</Text>
          </TouchableOpacity>
        )
      }
    }
    else {
      return null
    }
  }

  if (index === -1) return null;
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePicture}>
          <Image source={Profile} style={styles.picture} />
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.profileName}>
            <Text style={styles.name}>
              {eventData?.client_first_name} {eventData?.client_last_name}
            </Text>
          </View>

          { showAddessAndButton ? null : (
            <View>
              <View style={styles.profileAddress}>
                <Text style={styles.address}>{eventData?.client_full_address}</Text>
              </View>

              <TouchableOpacity
                style={styles.mapButtonContainer}
                onPress={openMapHandler}>
                <Text style={styles.mapText}>Ouvrir la map</Text>
              </TouchableOpacity>
            </View>
          ) }
        </View>
      </View>

      <EventTable data={data} isChauffeur={showAddessAndButton} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner color={globalColors.primary} size={50} type="Circle" />
        </View>
      ) : null}

      { eventActionButton() }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePicture: {},
  picture: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#D9D9D9',
  },
  profileInfo: {
    width: '60%',
  },
  profileName: {},
  name: {
    fontWeight: 'bold',
  },
  profileAddress: {
    marginTop: 5,
  },
  mapButtonContainer: {
    marginTop: 5,
    backgroundColor: globalColors.primary,
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
  },
  mapText: {
    color: globalColors.white,
  },
  address: {
    fontWeight: 'bold',
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
  buttonContainer: {
    backgroundColor: globalColors.primary,
    padding: 10,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  successButtonContainer: {
    backgroundColor: "#198754",
    padding: 10,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dangerButtonContainer: {
    backgroundColor: "#dc3545",
    padding: 10,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    color: globalColors.white,
  },
  normalText: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    paddingTop: 10
  }
});

export default Event;
