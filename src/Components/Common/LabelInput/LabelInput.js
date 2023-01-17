import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import moment from "moment"
import { globalStyles } from '../../../Constants/Constants';

const LabelInput = ({ label, state, setState, name }) => {
  if(new Date(state[name]).getDate()) {
    state[name] = moment(new Date(state[name])).format("DD-MM-YYYY HH:mm")
  }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={globalStyles.input}
        value={state[name]}
        onChangeText={text => {
          setState({
            ...state,
            [name]: text,
          });
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
  input: {
    // backgroundColor: 'blue',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default LabelInput;
