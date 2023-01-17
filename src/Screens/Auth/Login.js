import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import Logo from '../../Assets/hissap-logo.png';
import { globalStyles } from '../../Constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../../redux/Auth/actions';
import Spinner from 'react-native-spinkit';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('chauffeur_2');
  const [password, setPassword] = useState('testpass');
  const [error, setError] = useState('');

  let dispatch = useDispatch();

  const { auth, auth_loading, auth_error } = useSelector(state => state.auth);

  console.log('Login', auth);
  console.log(auth_loading);
  console.log(auth_error);

  const loginHandler = async () => {
    if (!auth_loading) {
      if (username && password) {
        Keyboard.dismiss();
        dispatch(authenticateUser(username, password));
      } else {
        setError('All fields are required');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={Logo} style={styles.image} />
      </View>
      <View style={styles.allInputs}>
        <View style={styles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Nom d'utilisateur"
            value={username}
            onChangeText={val => setUsername(val)}
            autoCapitalize="none"
          />
        </View>
        <View>
          <TextInput
            style={[
              globalStyles.input,
              {
                marginTop: 15,
              },
            ]}
            placeholder="Mot de passe"
            secureTextEntry={true}
            value={password}
            onChangeText={val => setPassword(val)}
          />
        </View>
        {auth_error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{auth_error?.message}</Text>
          </View>
        ) : null}

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : null}

        {auth_loading ? (
          <View style={styles.loader}>
            <Spinner color="#4090be" size={40} type="Circle" />
          </View>
        ) : null}
        <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
          <Text style={styles.loginText}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    // paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  allInputs: {
    // flex: 1,
    marginTop: 30,
  },
  inputContainer: {
    // margin: 20,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#d8dbe0',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  loader: {
    alignItems: 'center',
    marginTop: 30,
  },
  loginButton: {
    marginTop: 40,
    backgroundColor: '#4090be',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginText: {
    color: '#fff',
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  error: {
    color: '#4090be',
  },
});
export default Login;
