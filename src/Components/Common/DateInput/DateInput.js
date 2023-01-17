import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../Constants/Constants';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DateInput = ({ label, state, setState, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[globalStyles.input, styles.dateContainer]}
        onPress={() => {
          console.log('WOrking');
          setOpen(true);
        }}>
        <Text>{moment(state[name]).format('L')}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={state[name]}
        onConfirm={date => {
          setOpen(false);
          setState({
            ...state,
            [name]: date,
          });
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  label: {
    marginBottom: 10,
  },
  dateContainer: {
    justifyContent: 'center',
  },
  input: {
    // backgroundColor: 'blue',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default DateInput;
