import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Calendar from '../Screens/Calendar/Calendar';
import QRScanner from '../Screens/Calendar/QRScanner';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Event from '../Screens/Common/Event';
import { globalColors } from '../Constants/Constants';

const Stack = createStackNavigator();

function CalendarStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3c4b64',
          elevation: 0,
          borderWidth: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#fff',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Group>
        <Stack.Screen name="Agenda" component={Calendar} />
        <Stack.Screen
          name="Event"
          component={Event}
          options={{ title: 'Intervention' }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}>
        <Stack.Screen
          name="QRScanner"
          component={QRScanner}
          options={{
            headerBackImage: () => (
              <Fontisto name="close-a" color={globalColors.white} size={20} />
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default CalendarStack;
