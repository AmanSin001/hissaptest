import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Dashboard from '../Screens/Dashboard/Dashboard';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Event from '../Screens/Common/Event';

const Stack = createStackNavigator();

function DashboardStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3c4b64',
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Tableau de bord"
        component={Dashboard}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 5 }}
              onPress={() => navigation.openDrawer()}>
              <MaterialCommunityIcons name="menu" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
}

export default DashboardStack;
