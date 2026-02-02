import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import AddBMIScreen from './AddBMIScreen'; // ใช้ index.tsx เป็นหน้าเพิ่ม/คำนวณ
import DeleteBMIScreen from './DeleteBMIScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any ;
          if (route.name === 'Calculate') {
            iconName = 'calculator';
          } else if (route.name === 'History') {
            iconName = 'list';
          } else if (route.name === 'Manage') {
            iconName = 'trash';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4DB6AC',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Calculate" component={AddBMIScreen} />
      <Tab.Screen name="History" component={HomeScreen} />
      <Tab.Screen name="Manage" component={DeleteBMIScreen} />
    </Tab.Navigator>
  );
}