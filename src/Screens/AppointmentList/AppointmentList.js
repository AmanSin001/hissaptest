import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointments } from '../../redux/Appointments/actions';
import { getCurrentLocation, globalColors } from '../../Constants/Constants';
import BackHeader from '../../Components/Common/BackHeader/BackHeader';
import moment from 'moment';
import Loading from '../../Components/Common/Loading/Loading';

const AppointmentList = ({ navigation }) => {
  const { appointments, appointments_loading } = useSelector(
    state => state.appointments,
  );
  const { auth } = useSelector(state => state.auth);

  let token = auth?.token;

  const dispatch = useDispatch();

  // console.log('Appointments', appointments);

  const appointmentHandler = appointment => {
    navigation.navigate('AppointmentForm', {
      appointmentData: appointment,
      forEdit: true,
    });
  };

  const renderList = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.appointmentContainer}
        onPress={() => appointmentHandler(item)}>
        <View style={styles.appointment}>
          <View style={styles.indexContainer}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {moment(item?.date).format('L')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getAllAppointments(token));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <BackHeader navigation={navigation} label="Prospects" />
      {appointments_loading ? <Loading /> : null}

      <FlatList
        style={styles.listContainer}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        data={appointments?.appointments}
        keyExtractor={(item, index) => index}
        renderItem={renderList}
        refreshControl={
          <RefreshControl
            onRefresh={() => dispatch(getAllAppointments(token))}
            refreshing={appointments_loading}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  appointmentContainer: {
    backgroundColor: globalColors.white,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  appointment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexContainer: {
    backgroundColor: globalColors.primary,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    color: globalColors.white,
  },
  dateContainer: {
    marginLeft: 20,
  },
  dateText: {
    fontSize: 18,
  },
});

export default AppointmentList;
