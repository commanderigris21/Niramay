import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

// Screens
import PatientDashboardScreen from '../screens/patient/PatientDashboardScreen';
import HealthSummaryScreen from '../screens/patient/HealthSummaryScreen';
import DietPlanScreen from '../screens/patient/DietPlanScreen';
import NotificationsScreen from '../screens/patient/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PatientTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={PatientDashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Health"
        component={HealthSummaryScreen}
        options={{
          title: 'Health Summary',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart-pulse" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Diet"
        component={DietPlanScreen}
        options={{
          title: 'Diet Plan',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const PatientNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientHome"
        component={PatientTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PatientNavigator;
