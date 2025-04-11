import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { getLetterAvatar } from '../utils/avatarUtils';
import styles from './Dashboard.styles';
import Header from './Header';
import Navigation from './Navigation';

const Dashboard = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalPatients: 0,
    highRiskPatients: 0,
    surveysDue: 0
  });
  
  const [patients, setPatients] = useState([
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
  
  // Update stats when patients data changes
  useEffect(() => {
    // Calculate dashboard statistics
    const highRiskCount = patients.filter(p => p.riskLevel === t('patientsList.riskLevels.highrisk')).length;
    const surveysDueCount = patients.filter(p => !p.surveyComplete).length;
    
    setStats({
      totalPatients: patients.length,
      highRiskPatients: highRiskCount,
      surveysDue: surveysDueCount
    });
  }, [patients, t]);
  
  // Check if a new patient was registered and update patient data
  useEffect(() => {
    if (route.params?.newPatient) {
      // Add new patient to the list
      setPatients(prevPatients => [...prevPatients, route.params.newPatient]);
    }
    
    // Check if a survey was completed
    if (route.params?.surveyData) {
      const { patientId } = route.params.surveyData;
      
      // Update patient survey status
      setPatients(prevPatients => {
        return prevPatients.map(patient => {
          if (patient.id === patientId) {
            return {
              ...patient,
              surveyStatus: t('patientsList.surveyStatus.complete'),
              surveyComplete: true
            };
          }
          return patient;
        });
      });
    }
  }, [route.params?.newPatient, route.params?.surveyData, t]);
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('dashboard.dashboardTitle')} navigation={navigation} />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={[styles.statCard, styles.patientsCard]}
            onPress={() => navigation.navigate('PatientsList', { filter: 'all' })}
          >
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>👥</Text>
            </View>
            <Text style={styles.statLabel}>{t('dashboard.today')}</Text>
            <Text style={styles.statValue}>{stats.totalPatients}</Text>
            <Text style={styles.statDescription}>{t('dashboard.totalPatients')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.statCard, styles.highRiskCard]}
            onPress={() => navigation.navigate('PatientsList', { filter: 'high_risk' })}
          >
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>⚠️</Text>
            </View>
            <Text style={styles.statLabel}>{t('dashboard.critical')}</Text>
            <Text style={styles.statValue}>{stats.highRiskPatients}</Text>
            <Text style={styles.statDescription}>{t('dashboard.highRisk')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.statCard, styles.surveysCard, styles.fullWidthCard]}
          onPress={() => navigation.navigate('PatientsList', { filter: 'surveys_due' })}
        >
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>📋</Text>
          </View>
          <Text style={styles.statLabel}>{t('dashboard.pending')}</Text>
          <Text style={styles.statValue}>{stats.surveysDue}</Text>
          <Text style={styles.statDescription}>{t('dashboard.surveysDueToday')}</Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('dashboard.quickActions')}</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.addPatientButton, { width: '100%' }]} 
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.actionButtonIcon}>👤</Text>
              <Text style={styles.actionButtonText}>{t('dashboard.addPatient')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('dashboard.recentActivity')}</Text>
          
          {patients.slice(0, 3).map((patient, index) => {
            const avatar = getLetterAvatar(patient.name);
            return (
              <TouchableOpacity 
                key={patient.id} 
                style={styles.activityItem}
                onPress={() => navigation.navigate('PatientCard', { patientId: patient.id })}
              >
                <View style={[styles.activityAvatar, { backgroundColor: avatar.backgroundColor }]}>
                  <Text style={styles.activityAvatarText}>{avatar.initials}</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityName}>{patient.name}</Text>
                  <Text style={styles.activityDescription}>
                    {patient.surveyComplete ? t('dashboard.surveyCompleted') : t('dashboard.surveyPending')} • {index === 0 ? t('dashboard.timeAgo.hours', {hours: 2}) : index === 1 ? t('dashboard.timeAgo.hours', {hours: 4}) : t('dashboard.timeAgo.days', {days: 1})}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          
          {patients.length === 0 && (
            <View style={styles.activityItem}>
              <View style={styles.activityContent}>
                <Text style={styles.activityDescription}>{t('dashboard.noRecentActivity')}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <Navigation navigation={navigation} activeScreen="Dashboard" />
    </SafeAreaView>
  );
};

export default Dashboard;