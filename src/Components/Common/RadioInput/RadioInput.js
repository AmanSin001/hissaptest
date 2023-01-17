import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RadioInput = ({ options = [], label, state, setState, name }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>
          {label ? label : 'Please select one'}
        </Text>
      </View>
      <View style={styles.radioContainer}>
        {options.map((option, i) => {
          return (
            <BouncyCheckbox
              key={i}
              size={18}
              fillColor="#3c4b64"
              unfillColor="#FFFFFF"
              text={option?.text}
              style={styles.radio}
              disableBuiltInState={true}
              isChecked={state[name] === option?.value}
              iconStyle={{ borderColor: '#3c4b64' }}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 15,
              }}
              onPress={() => {
                setState({
                  ...state,
                  [name]: option?.value,
                });
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  labelContainer: {},
  labelText: {},
  radioContainer: {},
  radio: {
    marginTop: 10,
  },
});

export default RadioInput;
