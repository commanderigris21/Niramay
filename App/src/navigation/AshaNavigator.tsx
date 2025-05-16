import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export type AshaStackParamList = {
  AshaHome: undefined;
  PrimarySurvey: {
    patientId: string;
    patientName: string;
    trimester: string;
  };
  SecondarySurvey: {
    patientId: string;
    patientName: string;
    trimester: string;
  };
  PatientProfile: {
    patientId: string;
    patientName: string;
    trimester: string;
  };
  DietPlan: {
    patientId: string;
    patientName: string;
    trimester: string;
  };
  PatientDetail: {
    patientId: string;
  };
};

// Screens
import DashboardScreen from '../screens/asha/DashboardScreen';
import AddPatientScreen from '../screens/asha/AddPatientScreen';
import PrimarySurveyScreen from '../screens/asha/PrimarySurveyScreen';
import SecondarySurveyScreen from '../screens/asha/SecondarySurveyScreen';
import PatientDetailScreen from '../screens/asha/PatientDetailScreen';
import PatientProfileScreen from '../screens/asha/PatientProfileScreen';
import DietPlanScreen from '../screens/asha/DietPlanScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<AshaStackParamList>();

const AshaTabNavigator = () => {
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
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Patient"
        component={AddPatientScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AshaNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AshaHome"
        component={AshaTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatientScreen}
        options={{ title: 'Add New Patient' }}
      />
      <Stack.Screen
        name="PrimarySurvey"
        component={PrimarySurveyScreen}
        options={{ title: 'Primary Survey' }}
      />
      <Stack.Screen
        name="SecondarySurvey"
        component={SecondarySurveyScreen}
        options={{ title: 'Secondary Survey' }}
      />
      <Stack.Screen
        name="PatientProfile"
        component={PatientProfileScreen}
        options={{ title: 'Patient Profile' }}
      />
      <Stack.Screen
        name="PatientDetail"
        component={PatientDetailScreen}
        options={{ title: 'Patient Details' }}
      />
      <Stack.Screen
        name="DietPlan"
        component={DietPlanScreen}
        options={{ title: 'Diet Plan' }}
      />
    </Stack.Navigator>
  );
};

export default AshaNavigator;
