import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardStack from '../Navigations/DashboardStack';
import ClientStack from '../Navigations/ClientStack';
import CalendarStack from '../Navigations/CalendarStack';

const Tab = createMaterialBottomTabNavigator();

function buttonMenu() {
  return (
    <TouchableOpacity style={{ marginLeft: 10 }}>
      <Icon name="bars" size={20} color="#768192" />
    </TouchableOpacity>
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      activeColor="#fff"
      // sceneAnimationEnabled={true}
      barStyle={{ backgroundColor: '#3c4b64' }}
      shifting={true}>
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Tableau de bord',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="ClientTab"
        component={ClientStack}
        options={{
          tabBarLabel: 'Clients',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-box-multiple"
              color={color}
              size={26}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="CalendarTab"
        component={CalendarStack}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-month"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
