import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import styles from './EmergencyReferral.styles';

const EmergencyReferral = ({ navigation }) => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NIRAMAY Emergency Referral</Text>
      </View>
      
      <View style={styles.idContainer}>
        <Text style={styles.idText}>Patient ID: #23456</Text>
      </View>

      <ScrollView style={styles.facilitiesContainer}>
        {/* Nearest PHC with highlighted section */}
        <TouchableOpacity 
          onPress={() => setSelectedFacility('phc')} 
          activeOpacity={0.8}
        >
          <View style={[styles.facilityCard, selectedFacility === 'phc' ? styles.highlightedFacility : null]}>
            <View style={styles.facilityHeader}>
              <Text style={styles.facilityTitle}>Nearest PHC</Text>
              <Text style={styles.distanceText}>1.2 km away</Text>
            </View>
            <Text style={styles.facilityName}>City Primary Health Center</Text>
            <Text style={styles.facilityAddress}>123 Healthcare Avenue, City Area</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>📞 Call PHC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.directionsButton}>
                <Text style={styles.directionsButtonText}>📍 Get Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* District Hospital */}
        <TouchableOpacity 
          onPress={() => setSelectedFacility('district')} 
          activeOpacity={0.8}
        >
          <View style={[styles.facilityCard, selectedFacility === 'district' ? styles.highlightedFacility : null]}>
            <View style={styles.facilityHeader}>
              <Text style={styles.facilityTitle}>District Hospital</Text>
              <Text style={styles.distanceText}>3.5 km away</Text>
            </View>
            <Text style={styles.facilityName}>District General Hospital</Text>
            <Text style={styles.facilityAddress}>456 Hospital Road, District Area</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📞 Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📍 Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Rural Health Center */}
        <TouchableOpacity 
          onPress={() => setSelectedFacility('rural')} 
          activeOpacity={0.8}
        >
          <View style={[styles.facilityCard, selectedFacility === 'rural' ? styles.highlightedFacility : null]}>
            <View style={styles.facilityHeader}>
              <Text style={styles.facilityTitle}>Rural Health Center</Text>
              <Text style={styles.distanceText}>5.8 km away</Text>
            </View>
            <Text style={styles.facilityName}>Village Primary Health Center</Text>
            <Text style={styles.facilityAddress}>789 Rural Road, Village Area</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📞 Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📍 Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity 
        style={styles.ambulanceButton}
        onPress={() => {
          // In a real app, this would call an ambulance service API
          alert('Ambulance service has been notified!');
        }}
      >
        <Text style={styles.ambulanceButtonText}>🚑 Book 108 Ambulance</Text>
      </TouchableOpacity>


      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
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
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
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

export default EmergencyReferral;