import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../styles/theme';

const AddPatientScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      age: '',
      phone: '',
      address: '',
      trimester: '1',
    }
  });
  
  // Function to handle form submission without using context
  const onSubmit = (data) => {
    // Create a new patient object
    const newPatient = {
      id: Date.now().toString(), // Simple ID generation
      name: data.name,
      age: parseInt(data.age),
      phone: data.phone,
      address: data.address,
      trimester: parseInt(data.trimester),
      riskLevel: 'low', // Default risk level
      lastSurvey: {
        date: new Date().toISOString().split('T')[0],
        type: 'primary',
        findings: [],
      },
      surveys: [],
      dietPlan: {
        recommendations: [],
        lastUpdated: new Date().toISOString().split('T')[0],
      },
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          event: 'Patient Registered',
          type: 'survey',
        },
      ],
    };
    
    // Store the new patient in global patients array for the Dashboard to access later
    if (!global.patients) {
      global.patients = [];
    }
    global.patients.push(newPatient);
    
    // Show a success message
    alert('Patient added successfully! Proceeding to Primary Survey.');
    
    // Navigate directly to the PrimarySurveyScreen with the new patient ID
    navigation.navigate('PrimarySurvey', { 
      patientId: newPatient.id,
      patientName: newPatient.name
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Add New Patient</Text>
      
      <Controller
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            error={!!errors.name}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
      
      <Controller
        control={control}
        rules={{ 
          required: 'Age is required',
          pattern: { value: /^\d+$/, message: 'Please enter a valid age' }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Age"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            style={styles.input}
            error={!!errors.age}
          />
        )}
        name="age"
      />
      {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}
      
      <Controller
        control={control}
        rules={{ 
          required: 'Phone number is required',
          pattern: { value: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Phone Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
            style={styles.input}
            error={!!errors.phone}
          />
        )}
        name="phone"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
      
      <Controller
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={3}
            style={styles.input}
            error={!!errors.address}
          />
        )}
        name="address"
      />
      {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}
      
      <Text style={styles.label}>Trimester</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <SegmentedButtons
            value={value}
            onValueChange={onChange}
            buttons={[
              { value: '1', label: '1st' },
              { value: '2', label: '2nd' },
              { value: '3', label: '3rd' },
            ]}
            style={styles.segmentedButton}
          />
        )}
        name="trimester"
      />
      
      <Button 
        mode="contained" 
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Add Patient
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: 24,
    color: colors.primary,
  },
  input: {
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.textPrimary,
  },
  segmentedButton: {
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: colors.primary,
  },
  errorText: {
    color: colors.error,
    marginBottom: 8,
  },
});

export default AddPatientScreen;
