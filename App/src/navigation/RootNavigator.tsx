import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../store/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';

// Role-based Navigation
import AshaNavigator from './AshaNavigator';
import DoctorNavigator from './DoctorNavigator';
import PatientNavigator from './PatientNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={LoginScreen} />
      ) : (
        <>
          {userRole === 'asha' && <Stack.Screen name="AshaFlow" component={AshaNavigator} />}
          {userRole === 'doctor' && <Stack.Screen name="DoctorFlow" component={DoctorNavigator} />}
          {userRole === 'patient' && <Stack.Screen name="PatientFlow" component={PatientNavigator} />}
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
