import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Dashboard from './src/components/Dashboard';
import RegisterPatient from './src/components/RegisterPatient';
import CreateSurvey from './src/components/CreateSurvey';
import PatientCard from './src/components/PatientCard';
import EmergencyReferral from './src/components/EmergencyReferral';
import PatientsList from './src/components/PatientsList';
import Login from './src/components/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login" 
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal'
          }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Register" component={RegisterPatient} />
        <Stack.Screen name="PatientCard" component={PatientCard} />
        <Stack.Screen name="Survey" component={CreateSurvey} />
        <Stack.Screen name="EmergencyReferral" component={EmergencyReferral} />
        <Stack.Screen name="PatientsList" component={PatientsList} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}