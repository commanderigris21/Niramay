import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './RegisterPatient.styles';

const RegisterPatient = ({ navigation }) => {
  const [patientData, setPatientData] = useState({
    fullName: '',
    age: '',
    phoneNumber: '',
    bloodGroup: '',
    medicalHistory: ''
  });

  const handleSubmit = () => {
    console.log('Patient Data:', patientData);
    // Navigate to PatientsList after registration
    navigation.navigate('PatientsList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NIRAMAY Patient Registration</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter patient's full name"
              value={patientData.fullName}
              onChangeText={(text) => setPatientData({...patientData, fullName: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              keyboardType="numeric"
              value={patientData.age}
              onChangeText={(text) => setPatientData({...patientData, age: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={patientData.phoneNumber}
              onChangeText={(text) => setPatientData({...patientData, phoneNumber: text})}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Group</Text>
            <Picker
              selectedValue={patientData.bloodGroup}
              style={styles.picker}
              onValueChange={(itemValue) => setPatientData({...patientData, bloodGroup: itemValue})}
            >
              <Picker.Item label="Select blood group" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medical History</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter relevant medical history"
              multiline
              numberOfLines={4}
              value={patientData.medicalHistory}
              onChangeText={(text) => setPatientData({...patientData, medicalHistory: text})}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
          <Text style={styles.registerButtonText}>Register Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.registerButton, {borderWidth: 1, borderColor: '#e74c3c', backgroundColor: '#fff', marginTop: 10}]} onPress={() => navigation.navigate('PatientCard', { patientId: '#12345' })}>
          <Text style={[styles.registerButtonText, {color: '#e74c3c'}]}>View Patient Card</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text>🏠</Text>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text>👥</Text>
          <Text>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Survey')}
        >
          <Text>📋</Text>
          <Text>Surveys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmergencyReferral')}>
          <Text>⚠️</Text>
          <Text>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Text>👤</Text>
          <Text>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPatient;