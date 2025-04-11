import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import i18n configuration
import './src/utils/i18n';

// Screens
import Dashboard from './src/components/Dashboard';
import RegisterPatient from './src/components/RegisterPatient';
import PatientCard from './src/components/PatientCard';
import EmergencyReferral from './src/components/EmergencyReferral';
import PatientsList from './src/components/PatientsList';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Profile from './src/components/Profile';
import PrimarySurvey from './src/components/PrimarySurvey';
import SecondarySurvey from './src/components/SecondarySurvey';
import Diet from './src/components/Diet';
import LanguageSelection from './src/components/LanguageSelection';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="LanguageSelection"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Register" component={RegisterPatient} />
          <Stack.Screen name="PatientCard" component={PatientCard} />
          <Stack.Screen name="EmergencyReferral" component={EmergencyReferral} />
          <Stack.Screen name="PatientsList" component={PatientsList} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PrimarySurvey" component={PrimarySurvey} />
          <Stack.Screen name="SecondarySurvey" component={SecondarySurvey} />
          <Stack.Screen name="Diet" component={Diet} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
