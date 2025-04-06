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
import Slider from '@react-native-community/slider';  // Changed this line
import { Picker } from '@react-native-picker/picker';
import styles from './CreateSurvey.styles';

const CreateSurvey = () => {
  const [surveyData, setSurveyData] = useState({
    title: '',
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Survey</Text>
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

        <Text style={styles.sectionTitle}>Survey Questions</Text>

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
            minimumTrackTintColor="#f45"
            maximumTrackTintColor="#ddd"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>No Pain</Text>
            <Text style={styles.sliderLabel}>Severe Pain</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addQuestionButton}>
          <Text style={styles.addQuestionText}>+ Add Question</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish Survey</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text>🏠</Text>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>👥</Text>
          <Text>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text>📋</Text>
          <Text>Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>⚠️</Text>
          <Text>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>👤</Text>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateSurvey;