import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PatientProvider } from './contexts/PatientContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screens/asha/DashboardScreen';
import PatientDetailScreen from './screens/asha/PatientDetailScreen';
import AddPatientScreen from './screens/asha/AddPatientScreen';

const Stack = createNativeStackNavigator();

// Create a separate navigator component to ensure proper context wrapping
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen 
        name="PatientDetail" 
        component={PatientDetailScreen} 
        options={{ title: 'Patient Details' }} 
      />
      <Stack.Screen 
        name="AddPatient" 
        component={AddPatientScreen} 
        options={{ title: 'Add New Patient' }} 
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <PatientProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PatientProvider>
  );
};

export default App;