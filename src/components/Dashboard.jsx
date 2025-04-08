import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView 
} from 'react-native';
import styles from './Dashboard.styles';

const Dashboard = ({ navigation, route }) => {
  // Initialize state for dashboard statistics
  const [stats, setStats] = useState({
    totalPatients: 0,
    highRiskPatients: 0,
    surveysDue: 0
  });
  
  // Sample patient data - in a real app, this would come from a database or API
  const [patients, setPatients] = useState([
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
  
  // Update stats when patients data changes
  useEffect(() => {
    // Calculate dashboard statistics
    const highRiskCount = patients.filter(p => p.riskLevel === 'High Risk').length;
    const surveysDueCount = patients.filter(p => !p.surveyComplete).length;
    
    setStats({
      totalPatients: patients.length,
      highRiskPatients: highRiskCount,
      surveysDue: surveysDueCount
    });
  }, [patients]);
  
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
              surveyStatus: 'Survey Complete',
              surveyComplete: true
            };
          }
          return patient;
        });
      });
    }
  }, [route.params?.newPatient, route.params?.surveyData]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/niramay-logo.svg')} 
            style={styles.logoIcon} 
          />
        </View>
        <Text style={styles.headerTitle}>NIRAMAY Dashboard</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Text>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={[styles.statCard, styles.patientsCard]}
            onPress={() => navigation.navigate('PatientsList', { filter: 'all' })}
          >
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>👥</Text>
            </View>
            <Text style={styles.statLabel}>Today</Text>
            <Text style={styles.statValue}>{stats.totalPatients}</Text>
            <Text style={styles.statDescription}>Total Patients</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.statCard, styles.highRiskCard]}
            onPress={() => navigation.navigate('PatientsList', { filter: 'high_risk' })}
          >
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>⚠️</Text>
            </View>
            <Text style={styles.statLabel}>Critical</Text>
            <Text style={styles.statValue}>{stats.highRiskPatients}</Text>
            <Text style={styles.statDescription}>High Risk</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.statCard, styles.surveysCard, styles.fullWidthCard]}
          onPress={() => navigation.navigate('PatientsList', { filter: 'surveys_due' })}
        >
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>📋</Text>
          </View>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statValue}>{stats.surveysDue}</Text>
          <Text style={styles.statDescription}>Surveys Due Today</Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.addPatientButton]} 
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.actionButtonIcon}>👤</Text>
              <Text style={styles.actionButtonText}>Add Patient</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.createSurveyButton]} 
              onPress={() => navigation.navigate('Survey')}
            >
              <Text style={styles.actionButtonIcon}>📝</Text>
              <Text style={styles.actionButtonText}>Create Survey</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          {patients.slice(0, 3).map((patient, index) => (
            <View key={patient.id} style={styles.activityItem}>
              <Image 
                source={require('../../assets/niramay-logo.svg')} 
                style={styles.activityAvatar} 
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityName}>{patient.name}</Text>
                <Text style={styles.activityDescription}>
                  {patient.surveyComplete ? 'Survey completed' : 'Survey pending'} • {index === 0 ? '2h ago' : index === 1 ? '4h ago' : '1d ago'}
                </Text>
              </View>
            </View>
          ))}
          
          {patients.length === 0 && (
            <View style={styles.activityItem}>
              <View style={styles.activityContent}>
                <Text style={styles.activityDescription}>No recent activity</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text>🏠</Text>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PatientsList')}>
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
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;