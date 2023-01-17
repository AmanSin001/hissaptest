import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Client from '../Screens/Client/Client';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

function ClientStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3c4b64',
        },
        headerTitleStyle: { color: '#fff' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="Client" component={Client} />
    </Stack.Navigator>
  );
}

export default ClientStack;
