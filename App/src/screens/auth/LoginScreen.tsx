import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Snackbar, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../store/AuthContext';
import { authAPI } from '../../services/api';
import { colors } from '../../styles/theme';

interface LoginError {
  phone?: string;
  password?: string;
  general?: string;
}

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginError>({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: LoginError = {};
    
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showError = (message: string) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authAPI.login(phone, password);
      if (response && typeof response === 'object' && 'role' in response && 'token' in response) {
        await login(response.role as 'patient' | 'asha' | 'doctor', response.token as string);
      } else {
        showError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      showError('Login failed. Please check your connection and try again.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/NL.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="headlineMedium" style={styles.title}>NIRAMAY</Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Rural Maternal Healthcare Platform
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Phone Number"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setErrors(prev => ({ ...prev, phone: undefined }));
          }}
          keyboardType="phone-pad"
          error={!!errors.phone}
          style={styles.input}
          disabled={loading}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors(prev => ({ ...prev, password: undefined }));
          }}
          secureTextEntry
          error={!!errors.password}
          style={styles.input}
          disabled={loading}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Text style={styles.hint}>Test Credentials:</Text>
        <Text style={styles.hint}>Patient: 1234567890</Text>
        <Text style={styles.hint}>ASHA: 2234567890</Text>
        <Text style={styles.hint}>Doctor: 3234567890</Text>
        <Text style={styles.hint}>Password: any</Text>
      </View>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => setShowSnackbar(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
});

export default LoginScreen;
