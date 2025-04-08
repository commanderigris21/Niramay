import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList 
} from 'react-native';
import { getLetterAvatar } from '../utils/avatarUtils';
import styles from './PatientsList.styles';

const PatientsList = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState(route.params?.filter || 'all');
  const [patients, setPatients] = useState([
    // Initial sample patient data
    {
      id: '#12345',
      name: 'Sarah Johnson',
      riskLevel: 'High Risk',
      riskColor: '#f8d7da',
      riskTextColor: '#721c24',
      nextVisit: 'Today',
      surveyStatus: 'Survey Due',
      surveyComplete: false
    },
    {
      id: '#12346',
      name: 'Emily Davis',
      riskLevel: 'Medium Risk',
      riskColor: '#fff3cd',
      riskTextColor: '#856404',
      nextVisit: 'Tomorrow',
      surveyStatus: 'Survey Complete',
      surveyComplete: true
    },
    {
      id: '#12347',
      name: 'Lisa Wong',
      riskLevel: 'Low Risk',
      riskColor: '#d4edda',
      riskTextColor: '#155724',
      nextVisit: 'Next Week',
      surveyStatus: 'Survey Complete',
      surveyComplete: true
    }
  ]);
  
  // Apply filter when route params change
  useEffect(() => {
    if (route.params?.filter) {
      setFilterType(route.params.filter);
    }
  }, [route.params?.filter]);

  // Check if a new survey was created and update patient data
  useEffect(() => {
    if (route.params?.surveyData) {
      const { patientName, patientId } = route.params.surveyData;
      
      // Check if patient already exists
      const existingPatientIndex = patients.findIndex(p => p.id === patientId);
      
      if (existingPatientIndex >= 0) {
        // Update existing patient
        const updatedPatients = [...patients];
        updatedPatients[existingPatientIndex] = {
          ...updatedPatients[existingPatientIndex],
          surveyStatus: 'Survey Complete',
          surveyComplete: true
        };
        setPatients(updatedPatients);
      } else if (patientName && patientId) {
        // Add new patient with completed survey
        const newPatient = {
          id: patientId,
          name: patientName,
          riskLevel: 'Medium Risk', // Default risk level
          riskColor: '#fff3cd',
          riskTextColor: '#856404',
          nextVisit: 'Not Scheduled',
          surveyStatus: 'Survey Complete',
          surveyComplete: true
        };
        setPatients([...patients, newPatient]);
      }
    }
  }, [route.params?.surveyData]);

  // Filter patients based on search query and filter type
  const filteredPatients = patients.filter(patient => {
    // First apply search query filter
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Then apply category filter
    switch(filterType) {
      case 'high_risk':
        return patient.riskLevel === 'High Risk';
      case 'surveys_due':
        return !patient.surveyComplete;
      case 'all':
      default:
        return true;
    }
  });

  // Letter Avatar component for patients
  const LetterAvatar = ({ name, style }) => {
    const avatar = getLetterAvatar(name);
    return (
      <View style={[style, { backgroundColor: avatar.backgroundColor }]}>
        <Text style={styles.patientAvatarText}>{avatar.initials}</Text>
      </View>
    );
  };

  const renderPatientItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.patientCard} 
      onPress={() => navigation.navigate('PatientCard', { patientId: item.id })}
    >
      <View style={styles.patientInfo}>
        <LetterAvatar 
          name={item.name} 
          style={styles.patientImage} 
        />
        <View style={styles.patientDetails}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={styles.patientId}>ID: {item.id}</Text>
        </View>
        <View style={[styles.riskBadge, { backgroundColor: item.riskColor }]}>
          <Text style={[styles.riskText, { color: item.riskTextColor }]}>{item.riskLevel}</Text>
        </View>
      </View>
      
      <View style={styles.patientStatus}>
        <View style={styles.statusItem}>
          <Text style={styles.statusIcon}>📅</Text>
          <Text style={styles.statusText}>Next Visit: {item.nextVisit}</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusIcon}>{item.surveyComplete ? '✓' : '!'}</Text>
          <Text style={[styles.statusText, item.surveyComplete ? styles.completedText : styles.pendingText]}>
            {item.surveyStatus}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/NL.png')} 
              style={styles.logoIcon} 
            />
          </View>
          <Text style={styles.headerTitle}>NIRAMAY Patients</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPatients}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.patientsList}
      />

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.addButton, styles.surveyButton]} 
          onPress={() => navigation.navigate('Survey')}
        >
          <Text style={styles.addButtonText}>📋</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text>🏠</Text>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text>👥</Text>
          <Text>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Survey')}>
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

export default PatientsList;