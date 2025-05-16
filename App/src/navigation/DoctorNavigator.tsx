import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

// Screens
import DoctorDashboardScreen from '../screens/doctor/DoctorDashboardScreen';
import PatientDetailScreen from '../screens/doctor/DoctorPatientDetailScreen';
import EditDiagnosisScreen from '../screens/doctor/EditDiagnosisScreen';
import EditDietPlanScreen from '../screens/doctor/EditDietPlanScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DoctorTabNavigator = () => {
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
        name="DoctorDashboard"
        component={DoctorDashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard-variant" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DoctorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorHome"
        component={DoctorTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorPatientDetail"
        component={PatientDetailScreen}
        options={{ title: 'Patient Details' }}
      />
      <Stack.Screen
        name="EditDiagnosis"
        component={EditDiagnosisScreen}
        options={{ title: 'Edit Diagnosis' }}
      />
      <Stack.Screen
        name="EditDietPlan"
        component={EditDietPlanScreen}
        options={{ title: 'Edit Diet Plan' }}
      />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
