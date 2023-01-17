import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import { globalColors } from '../../../Constants/Constants';

const { width, height } = Dimensions.get('window');
const Loading = () => {
  return (
    <View style={styles.mainContainer}>
      <Spinner color={globalColors.primary} size={width * 0.12} type="Circle" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
