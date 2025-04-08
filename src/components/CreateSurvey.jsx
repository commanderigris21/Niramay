import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Switch
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import styles from './CreateSurvey.styles';

const CreateSurvey = ({ navigation }) => {
  const [surveyData, setSurveyData] = useState({
    title: '',
    patientName: '',
    patientId: '',
    // Maternal Health Factors
    age: '',
    bmi: '',
    gravida: '', // Total pregnancies including current
    parity: '', // Previous live births
    
    // Vital Signs & Blood Markers
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    hemoglobinLevel: '',
    bloodSugarFasting: '',
    urineProtein: 'Negative',
    
    // Fetal Health Indicators
    fetalHeartRate: '',
    
    // Medical History
    pastStillbirth: false,
    pastMiscarriage: false,
    pastCSection: false,
    historyPreeclampsia: false,
    historyGestationalDiabetes: false,
    historyAnemia: false,
    
    // Existing Health Conditions
    thyroidIssues: false,
    chronicDiseases: '',
    
    // Lifestyle & Environmental Factors
    physicalActivityLevel: 'Low',
    
    // Original fields
    pregnancyStage: 'First Trimester',
    symptoms: {
      nausea: false,
      fatigue: false,
      headache: false
    },
    painLevel: 0
  });

  const handleSymptomToggle = (symptom) => {
    setSurveyData(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptom]: !prev.symptoms[symptom]
      }
    }));
  };

  const handlePublish = () => {
    console.log('Survey Data:', surveyData);
    // In a real app, this would save the survey data to a database
    // and associate it with the patient
    
    // Navigate back to PatientsList after publishing with survey data
    navigation.navigate('PatientsList', { surveyData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NIRAMAY Survey Creation</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Survey Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter survey title"
            value={surveyData.title}
            onChangeText={(text) => setSurveyData({...surveyData, title: text})}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Patient Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter patient name"
            value={surveyData.patientName}
            onChangeText={(text) => setSurveyData({...surveyData, patientName: text})}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Patient ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter patient ID"
            value={surveyData.patientId}
            onChangeText={(text) => setSurveyData({...surveyData, patientId: text})}
          />
        </View>

        <Text style={styles.sectionTitle}>Maternal Health Factors</Text>
        
        <View style={styles.questionCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              keyboardType="numeric"
              value={surveyData.age}
              onChangeText={(text) => setSurveyData({...surveyData, age: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>BMI (Body Mass Index)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter BMI"
              keyboardType="numeric"
              value={surveyData.bmi}
              onChangeText={(text) => setSurveyData({...surveyData, bmi: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gravida (Total pregnancies including current)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number"
              keyboardType="numeric"
              value={surveyData.gravida}
              onChangeText={(text) => setSurveyData({...surveyData, gravida: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Parity (Previous live births)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number"
              keyboardType="numeric"
              value={surveyData.parity}
              onChangeText={(text) => setSurveyData({...surveyData, parity: text})}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Vital Signs & Blood Markers</Text>
        
        <View style={styles.questionCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Pressure (Systolic)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter systolic BP (mmHg)"
              keyboardType="numeric"
              value={surveyData.bloodPressureSystolic}
              onChangeText={(text) => setSurveyData({...surveyData, bloodPressureSystolic: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Pressure (Diastolic)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter diastolic BP (mmHg)"
              keyboardType="numeric"
              value={surveyData.bloodPressureDiastolic}
              onChangeText={(text) => setSurveyData({...surveyData, bloodPressureDiastolic: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hemoglobin Level</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter hemoglobin (g/dL)"
              keyboardType="numeric"
              value={surveyData.hemoglobinLevel}
              onChangeText={(text) => setSurveyData({...surveyData, hemoglobinLevel: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Sugar (Fasting)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter blood sugar (mg/dL)"
              keyboardType="numeric"
              value={surveyData.bloodSugarFasting}
              onChangeText={(text) => setSurveyData({...surveyData, bloodSugarFasting: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Urine Protein</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={surveyData.urineProtein}
                style={styles.picker}
                onValueChange={(value) => setSurveyData({...surveyData, urineProtein: value})}
              >
                <Picker.Item label="Negative" value="Negative" />
                <Picker.Item label="Trace" value="Trace" />
                <Picker.Item label="1+" value="1+" />
                <Picker.Item label="2+" value="2+" />
                <Picker.Item label="3+" value="3+" />
                <Picker.Item label="4+" value="4+" />
              </Picker>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Fetal Health Indicators</Text>
        
        <View style={styles.questionCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fetal Heart Rate</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter heart rate (bpm)"
              keyboardType="numeric"
              value={surveyData.fetalHeartRate}
              onChangeText={(text) => setSurveyData({...surveyData, fetalHeartRate: text})}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Medical History</Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.label}>Select all that apply:</Text>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setSurveyData({...surveyData, pastStillbirth: !surveyData.pastStillbirth})}
            >
              <View style={[styles.checkbox, surveyData.pastStillbirth && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Past Stillbirth</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setSurveyData({...surveyData, pastMiscarriage: !surveyData.pastMiscarriage})}
            >
              <View style={[styles.checkbox, surveyData.pastMiscarriage && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Past Miscarriage</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setSurveyData({...surveyData, pastCSection: !surveyData.pastCSection})}
            >
              <View style={[styles.checkbox, surveyData.pastCSection && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Past C-section</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setSurveyData({...surveyData, historyPreeclampsia: !surveyData.historyPreeclampsia})}
            >
              <View style={[styles.checkbox, surveyData.historyPreeclampsia && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>History of Preeclampsia</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setSurveyData({...surveyData, historyGestationalDiabetes: !surveyData.historyGestationalDiabetes})}
            >
              <View style={[styles.checkbox, surveyData.historyGestationalDiabetes && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>History of Gestational Diabetes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setSurveyData({...surveyData, historyAnemia: !surveyData.historyAnemia})}
            >
              <View style={[styles.checkbox, surveyData.historyAnemia && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>History of Anemia</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Existing Health Conditions</Text>
        
        <View style={styles.questionCard}>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setSurveyData({...surveyData, thyroidIssues: !surveyData.thyroidIssues})}
            >
              <View style={[styles.checkbox, surveyData.thyroidIssues && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Thyroid Issues</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chronic Diseases (if any)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter details of any chronic diseases"
              multiline
              numberOfLines={3}
              value={surveyData.chronicDiseases}
              onChangeText={(text) => setSurveyData({...surveyData, chronicDiseases: text})}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Lifestyle & Environmental Factors</Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.label}>Physical Activity Level</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={surveyData.physicalActivityLevel}
              style={styles.picker}
              onValueChange={(value) => setSurveyData({...surveyData, physicalActivityLevel: value})}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Moderate" value="Moderate" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Additional Information</Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.label}>Pregnancy Stage</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={surveyData.pregnancyStage}
              style={styles.picker}
              onValueChange={(value) => setSurveyData({...surveyData, pregnancyStage: value})}
            >
              <Picker.Item label="First Trimester" value="First Trimester" />
              <Picker.Item label="Second Trimester" value="Second Trimester" />
              <Picker.Item label="Third Trimester" value="Third Trimester" />
            </Picker>
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.label}>Current Symptoms</Text>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => handleSymptomToggle('nausea')}
            >
              <View style={[styles.checkbox, surveyData.symptoms.nausea && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Nausea</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => handleSymptomToggle('fatigue')}
            >
              <View style={[styles.checkbox, surveyData.symptoms.fatigue && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Fatigue</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => handleSymptomToggle('headache')}
            >
              <View style={[styles.checkbox, surveyData.symptoms.headache && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Headache</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.label}>Pain Level</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            value={surveyData.painLevel}
            onValueChange={(value) => setSurveyData({...surveyData, painLevel: value})}
            minimumTrackTintColor="#e74c3c"
            maximumTrackTintColor="#ddd"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>No Pain</Text>
            <Text style={styles.sliderLabel}>Severe Pain</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish Survey</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text>🏠</Text>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PatientsList')}>
          <Text>👥</Text>
          <Text>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text>📋</Text>
          <Text>Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmergencyReferral')}>
          <Text>⚠️</Text>
          <Text>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text>👤</Text>
          <Text>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateSurvey;