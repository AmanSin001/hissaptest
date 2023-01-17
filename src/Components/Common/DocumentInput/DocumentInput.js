import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles } from '../../../Constants/Constants';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const DocumentInput = ({ label, state, setState, name }) => {
  const [file, setFile] = useState('');

  const documentPickerHandler = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setFile(res);
      setState({
        ...state,
        [name]: res,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {state[name] ? (
          <View style={styles.fileContainer}>
            <Text style={styles.fileText}>{state[name]?.name}</Text>
            <TouchableOpacity
              style={styles.fileIcon}
              onPress={() => {
                setState({
                  ...state,
                  [name]: '',
                });
              }}>
              <Entypo
                name="circle-with-cross"
                color={globalColors.primary}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={documentPickerHandler}>
          <Ionicons
            style={styles.icon}
            name="document-outline"
            size={20}
            color={globalColors.primary}
          />
          <Text>Choose File</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  label: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#d8dbe0',
    padding: 10,
    borderRadius: 10,
  },
  fileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fileText: {},
  fileIcon: {
    marginLeft: 5,
  },
  input: {
    // backgroundColor: 'blue',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default DocumentInput;
