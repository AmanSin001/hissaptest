import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ header: () => null, cardStyle: { backgroundColor: '#fff' } }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
