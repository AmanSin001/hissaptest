import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../../../Constants/Constants';

const BackHeader = ({ navigation, label, forEdit }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          if (forEdit) {
            navigation.navigate('AppointmentList');
          } else {
            navigation.goBack();
          }
        }}>
        <Ionicons name="arrow-back" size={30} color={globalColors.white} />
      </TouchableOpacity>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#3c4b64',
    paddingVertical: 12,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: 15,
    color: globalColors.white,
    fontSize: 20,
    fontWeight: '500',
  },
});

export default BackHeader;
