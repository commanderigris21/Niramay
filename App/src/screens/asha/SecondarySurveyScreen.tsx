import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text, Button, TextInput } from 'react-native-paper';
import { colors } from '../../styles/theme';

// Questions to display
const secondarySurveyQuestions = [
  'Blood pressure reading',
  'Hemoglobin level',
  'Weight (kg)',
  'Fundal height measurement',
  'Fetal heart rate',
  'Urine protein test result',
  'Blood sugar level',
];

// Risk highlight placeholders
const placeholders = {
  bloodpressurereading: '>140/90 mmHg = risky',
  hemoglobinlevel: '<10 g/dl = risky',
  weightkg: '<1kg/month or >1.5kg/month = abnormal',
  fundalheightmeasurement: 'Mismatch >2 weeks = risky',
  fetalheartrate: '110–160 bpm = normal',
  urineproteintestresult: 'Detected = risky',
  bloodsugarlevel: 'FBS >95 / RBS >140 mg/dL = risky',
};

const SecondarySurveyScreen = ({ navigation, route }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const patientId = route?.params?.patientId;
  const patientName = route?.params?.patientName;

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Secondary Survey Submitted:', data);

    const riskLevel = calculateRiskLevel(data);
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Format findings for better display
    const formattedFindings = Object.entries(data).map(([key, value]) => {
      // Convert camelCase to Title Case with spaces
      const readableKey = key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/([a-z])([a-z]*)/g, (g) => g[0].toUpperCase() + g.slice(1));
      
      return `${readableKey}: ${value}`;
    });

    // Create survey object
    const surveyData = {
      id: 's' + Date.now(),
      date: currentDate,
      type: 'secondary',
      findings: formattedFindings,
    };

    // Initialize global.patients if it doesn't exist
    if (!global.patients) {
      global.patients = [];
    }

    // Initialize global.surveys if it doesn't exist
    if (!global.surveys) {
      global.surveys = [];
    }

    // Add survey to global surveys
    global.surveys.push({
      ...surveyData,
      patientId: patientId
    });

    const patientIndex = global.patients.findIndex(p => p.id === patientId);
    
    if (patientIndex !== -1) {
      // Update existing patient
      global.patients[patientIndex].riskLevel = riskLevel;
      global.patients[patientIndex].lastSurvey = surveyData;
      
      // Add to surveys array if it exists, otherwise create it
      if (!global.patients[patientIndex].surveys) {
        global.patients[patientIndex].surveys = [];
      }
      global.patients[patientIndex].surveys.push(surveyData);
      
      // Add to timeline if it exists, otherwise create it
      if (!global.patients[patientIndex].timeline) {
        global.patients[patientIndex].timeline = [];
      }
      global.patients[patientIndex].timeline.push({
        date: currentDate,
        event: 'Secondary Survey Conducted',
        type: 'survey',
      });
    } else {
      // Create new patient if not found
      const newPatient = {
        id: patientId,
        name: patientName,
        riskLevel: riskLevel,
        lastSurvey: surveyData,
        surveys: [surveyData],
        timeline: [
          {
            date: currentDate,
            event: 'Initial Registration',
            type: 'registration',
          },
          {
            date: currentDate,
            event: 'Secondary Survey Conducted',
            type: 'survey',
          }
        ]
      };
      global.patients.push(newPatient);
    }

    alert('Secondary survey completed successfully!');
    
    // Navigate to PatientDetail with the patientId
    navigation.navigate('PatientDetail', { 
      patientId: patientId,
      patientName: patientName,
      refresh: true // Add a refresh flag to force data reload
    });
  };

  // Sample logic to determine risk
  const calculateRiskLevel = (data) => {
    const bp = parseFloat(data.bloodpressurereading || '0');
    const hb = parseFloat(data.hemoglobinlevel || '0');

    if (bp > 140 || bp < 90 || hb < 9) {
      return 'high';
    } else if (bp > 130 || bp < 100 || hb < 10) {
      return 'medium';
    } else {
      return 'low';
    }
  };

  // Renders each question input
  const renderQuestion = (question) => {
    const fieldName = question.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const placeholder = placeholders[fieldName] || 'Enter value';

    return (
      <View key={fieldName} style={styles.questionBlock}>
        <Text style={styles.label}>{question}</Text>
        <Controller
          control={control}
          name={fieldName}
          rules={{ 
            required: true,
            validate: value => {
              // Allow empty string for initial state
              if (value === '') return true;
              
              // Check if the value is a valid integer
              const isInteger = /^\d+$/.test(value);
              return isInteger || 'Please enter only integers';
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(text) => {
                // Only allow digits
                const numericValue = text.replace(/[^0-9]/g, '');
                onChange(numericValue);
              }}
              value={value}
              placeholder={placeholder}
              style={styles.input}
              error={!!errors[fieldName]}
              keyboardType="numeric"
            />
          )}
        />
        {errors[fieldName] && (
          <Text style={styles.error}>
            {errors[fieldName].type === 'validate' 
              ? 'Please enter only integers' 
              : 'This field is required'}
          </Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Secondary Survey</Text>

      {patientName && (
        <Text style={styles.patientName}>Patient: {patientName}</Text>
      )}

      {secondarySurveyQuestions.map(renderQuestion)}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
          labelStyle={styles.submitLabel}
        >
          Complete Survey & View Patient Profile
        </Button>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.primary,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.primary,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  questionBlock: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.surface,
  },
  error: {
    marginTop: 4,
    color: colors.error,
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitLabel: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecondarySurveyScreen;
