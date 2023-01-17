import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckboxInput = ({ options = [], label, state, setState, name }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>
          {label ? label : 'Please select one'}
        </Text>
      </View>
      <View style={styles.radioContainer}>
        {options.map((option, i) => {
          let checked = false
          if(state[name]) {
            if(state[name].includes(option?.value)) {
              checked = true
            }
          }
          return (
            <BouncyCheckbox
              key={i}
              size={18}
              fillColor="#3c4b64"
              unfillColor="#FFFFFF"
              text={option?.text}
              style={styles.radio}
              disableBuiltInState={true}
              isChecked={checked}
              iconStyle={{ borderColor: '#3c4b64', borderRadius: 4 }}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 15,
              }}
              onPress={() => {
                console.log('start function', state[name]);
                let index = state[name].indexOf(option?.value);
                if (index !== -1) {
                  let filtered = state[name].filter((value, index) => {
                    return value !== option?.value;
                  });
                  console.log('Filtered', filtered);
                  setState({
                    ...state,
                    [name]: [...filtered],
                  });
                } else {
                  setState({
                    ...state,
                    [name]: [...state[name], option?.value],
                  });
                }
                console.log('end function', state[name]);
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

export default CheckboxInput;
