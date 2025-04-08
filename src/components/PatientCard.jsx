import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import styles from './PatientCard.styles';

const PatientCard = ({ navigation, route }) => {
  const { patientId } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>←</Text>
        </TouchableOpacity>
        <View style={styles.patientHeader}>
          <Text style={styles.patientName}>Sarah Johnson</Text>
          <View style={styles.riskBadge}>
            <Text style={styles.riskText}>High Risk</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.idContainer}>
        <Text style={styles.idText}>ID: #23456</Text>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={require('../../assets/niramay-logo.svg')} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.infoText}>Age: 28 years</Text>
          <Text style={styles.infoText}>Blood Group: B+</Text>
          <Text style={styles.infoText}>Last Visit: 15 Jan 2025</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Current Conditions</Text>
        <View style={styles.conditionItem}>
          <View style={[styles.conditionIndicator, styles.redIndicator]} />
          <Text style={styles.conditionText}>Severe Anemia (Diagnosed: Jan 2025)</Text>
        </View>
        <View style={styles.conditionItem}>
          <View style={[styles.conditionIndicator, styles.orangeIndicator]} />
          <Text style={styles.conditionText}>Gestational Diabetes (Week 24)</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Vitals</Text>
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Blood Pressure</Text>
            <Text style={styles.vitalValue}>120/80 mmHg</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Hemoglobin</Text>
            <Text style={[styles.vitalValue, styles.alertValue]}>8.5 g/dL</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Weight</Text>
            <Text style={styles.vitalValue}>65 kg</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Glucose</Text>
            <Text style={[styles.vitalValue, styles.warningValue]}>140 mg/dL</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.emergencyButton} onPress={() => navigation.navigate('EmergencyReferral')}>
        <Text style={styles.emergencyButtonText}>🚑 Emergency Ambulance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyButtonText}>View Full Medical History</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text>🏠</Text>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]} onPress={() => navigation.navigate('PatientsList')}>
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
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text>👤</Text>
          <Text>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PatientCard;