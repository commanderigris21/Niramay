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
import { useTranslation } from 'react-i18next';
import { getLetterAvatar } from '../utils/avatarUtils';
import styles from './PatientsList.styles';
import Header from './Header';
import Navigation from './Navigation';

const PatientsList = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState(route.params?.filter || 'all');
  const [patients, setPatients] = useState([
    // Initial sample patient data
    {
      id: '#12345',
      name: t('patientData.patient1'),
      riskLevel: t('patientsList.riskLevels.highrisk'),
      riskColor: '#f8d7da',
      riskTextColor: '#721c24',
      nextVisit: 'Today',
      surveyStatus: 'Survey Due',
      surveyComplete: false
    },
    {
      id: '#12346',
      name: t('patientData.patient2'),
      riskLevel: t('patientsList.riskLevels.mediumrisk'),
      riskColor: '#fff3cd',
      riskTextColor: '#856404',
      nextVisit: 'Tomorrow',
      surveyStatus: 'Survey Complete',
      surveyComplete: true
    },
    {
      id: '#12347',
      name: t('patientData.patient3'),
      riskLevel: t('patientsList.riskLevels.lowrisk'),
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
          surveyStatus: t('patientsList.surveyStatus.complete'),
          surveyComplete: true
        };
        setPatients(updatedPatients);
      } else if (patientName && patientId) {
        // Add new patient with completed survey
        const newPatient = {
          id: patientId,
          name: patientName,
          riskLevel: t('patientsList.riskLevels.mediumrisk'), // Default risk level
          riskColor: '#fff3cd',
          riskTextColor: '#856404',
          nextVisit: t('patientsList.visitTimes.notscheduled'),
          surveyStatus: t('patientsList.surveyStatus.complete'),
          surveyComplete: true
        };
        setPatients([...patients, newPatient]);
      }
    }
  }, [route.params?.surveyData, t]);

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
        return patient.riskLevel === t('patientsList.riskLevels.highrisk');
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
          <Text style={styles.patientId}>{t('patientsList.id')}: {item.id}</Text>
        </View>
        <View style={[styles.riskBadge, { backgroundColor: item.riskColor }]}>
          <Text style={[styles.riskText, { color: item.riskTextColor }]}>{item.riskLevel}</Text>
        </View>
      </View>
      
      <View style={styles.patientStatus}>
        <View style={styles.statusItem}>
          <Text style={styles.statusIcon}>📅</Text>
          <Text style={styles.statusText}>{t('patientsList.nextVisit')}: {t(`patientsList.visitTimes.${item.nextVisit.toLowerCase().replace(' ', '')}`)}</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusIcon}>{item.surveyComplete ? '✓' : '!'}</Text>
          <Text style={[styles.statusText, item.surveyComplete ? styles.completedText : styles.pendingText]}>
            {t(`patientsList.surveyStatus.${item.surveyComplete ? 'complete' : 'due'}`)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={t('patientsList.title')} 
        navigation={navigation} 
        showBackButton={true} 
        onBackPress={() => navigation.navigate('Dashboard')} 
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('patientsList.searchPlaceholder')}
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
        <TouchableOpacity style={[styles.addButton, { position: 'relative', right: 0 }]} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Navigation navigation={navigation} activeScreen="PatientsList" />
    </SafeAreaView>
  );
};

export default PatientsList;