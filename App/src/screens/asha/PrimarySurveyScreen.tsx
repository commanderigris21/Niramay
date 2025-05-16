import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';
import { Text, Button } from 'react-native-paper';
import { colors } from '../../styles/theme'; // your custom theme

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const trimesterQuestions = {
  '1': [
    'Age of mother (adolescent/advanced age risk)',
    'History of miscarriage, stillbirth, cesarean',
    'Previous high-risk pregnancy',
    'Excessive nausea/vomiting (hyperemesis gravidarum)',
    'Abdominal cramping or bleeding',
    'Short birth spacing',
    'Tobacco/alcohol usage',
    'No antenatal care registration by 12 weeks',
  ],
  '2': [
    'Swelling of hands, face, or feet (possible preeclampsia)',
    'Severe/persistent headaches',
    'Blurred vision',
    'High blood pressure history or symptoms',
    'Rapid weight gain or visible undernutrition',
    'Fetal movement absent after 20 weeks',
    'Dizziness, fatigue, shortness of breath',
  ],
  '3': [
    'Reduced fetal movement',
    'Convulsions or seizures (sign of eclampsia)',
    'Vaginal bleeding',
    'Severe abdominal pain',
    'Water breaking early (rupture of membranes)',
    'Lack of ANC till third trimester',
    'Signs of anemia or fatigue',
    'Birth preparedness missing (no referral/transport plan)',
  ],
};

const PrimarySurveyScreen = ({ navigation, route }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [trimesterOpen, setTrimesterOpen] = useState(false);
  const [trimesterValue, setTrimesterValue] = useState(null);

  // Get patient info from route params
  const patientId = route?.params?.patientId;
  const patientName = route?.params?.patientName;

  const questions = trimesterValue ? trimesterQuestions[trimesterValue] : [];

  const onSubmit = (data) => {
    console.log('Survey Submitted:', data);
    // You can send data to your backend here
    
    // Show success message
    alert('Primary survey saved successfully!');
  };

  const renderQuestion = (question, index) => {
    const fieldName = question.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const isOpen = openDropdowns[fieldName] || false;
    const zIndex = 10000 - index * 10;
  
    return (
      <View key={fieldName} style={[styles.questionBlock, { zIndex }]}>
        <Text style={styles.label}>{question}</Text>
        <Controller
          control={control}
          name={fieldName}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              open={isOpen}
              value={value}
              items={yesNoItems}
              setOpen={(open) =>
                setOpenDropdowns(prev => {
                  const closed = Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {});
                  return { ...closed, [fieldName]: open };
                })
              }
              setValue={(cb) => onChange(cb(value))}
              placeholder="Select"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownBox}
              zIndex={zIndex}
              zIndexInverse={zIndex - 1}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
            />
          )}
        />
        {errors[fieldName] && (
          <Text style={styles.error}>This field is required</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {patientName && (
        <Text style={styles.patientName}>Patient: {patientName}</Text>
      )}
      
      <View style={{ zIndex: 10000, marginBottom: 20 }}>
        <Text style={styles.label}>Select Trimester</Text>
        <DropDownPicker
          open={trimesterOpen}
          value={trimesterValue}
          items={[
            { label: 'Trimester 1', value: '1' },
            { label: 'Trimester 2', value: '2' },
            { label: 'Trimester 3', value: '3' },
          ]}
          setOpen={setTrimesterOpen}
          setValue={setTrimesterValue}
          placeholder="Choose Trimester"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          dropDownDirection="BOTTOM"
          listMode="SCROLLVIEW"
        />
      </View>

      {questions.map((q, index) => renderQuestion(q, index))}

      {trimesterValue && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
            labelStyle={styles.submitLabel}
          >
            Save Survey
          </Button>
          
          <Button 
            mode="outlined" 
            onPress={() => {
              // First save the primary survey
              handleSubmit((data) => {
                onSubmit(data);
                // Then navigate to secondary survey
                navigation.navigate('SecondarySurvey', { 
                  patientId: patientId,
                  patientName: patientName
                });
              })();
            }}
            style={styles.secondaryButton}
          >
            Start Secondary Survey
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
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
  dropdown: {
    borderColor: colors.outline,
    backgroundColor: colors.surface,
  },
  dropdownBox: {
    borderColor: colors.outline,
    backgroundColor: colors.surface,
  },
  error: {
    marginTop: 4,
    color: colors.error,
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
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
  secondaryButton: {
    borderColor: colors.primary,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.primary,
  },
});

export default PrimarySurveyScreen;
