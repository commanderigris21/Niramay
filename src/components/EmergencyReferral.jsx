import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './EmergencyReferral.styles';
import Header from './Header';
import Navigation from './Navigation';

const EmergencyReferral = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedFacility, setSelectedFacility] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('emergency.title')} navigation={navigation} showBackButton={true} />
      
      <View style={styles.idContainer}>
        <Text style={styles.idText}>{t('emergency.patientId')}: #23456</Text>
      </View>

      <ScrollView style={styles.facilitiesContainer}>
        {/* Nearest PHC with highlighted section */}
        <TouchableOpacity 
          onPress={() => setSelectedFacility('phc')} 
          activeOpacity={0.8}
        >
          <View style={[styles.facilityCard, selectedFacility === 'phc' ? styles.highlightedFacility : null]}>
            <View style={styles.facilityHeader}>
              <Text style={styles.facilityTitle}>{t('emergency.nearestPHC')}</Text>
              <Text style={styles.distanceText}>{t('emergency.distanceAway', { distance: '1.2' })}</Text>
            </View>
            <Text style={styles.facilityName}>{t('emergency.cityPHC')}</Text>
            <Text style={styles.facilityAddress}>{t('emergency.cityPHCAddress')}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>📞 {t('emergency.callPHC')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.directionsButton}>
                <Text style={styles.directionsButtonText}>📍 {t('emergency.getDirections')}</Text>
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
              <Text style={styles.facilityTitle}>{t('emergency.districtHospital')}</Text>
              <Text style={styles.distanceText}>{t('emergency.distanceAway', { distance: '3.5' })}</Text>
            </View>
            <Text style={styles.facilityName}>{t('emergency.districtGeneralHospital')}</Text>
            <Text style={styles.facilityAddress}>{t('emergency.districtHospitalAddress')}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📞 {t('emergency.call')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📍 {t('emergency.directions')}</Text>
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
              <Text style={styles.facilityTitle}>{t('emergency.ruralHealthCenter')}</Text>
              <Text style={styles.distanceText}>{t('emergency.distanceAway', { distance: '5.8' })}</Text>
            </View>
            <Text style={styles.facilityName}>{t('emergency.villagePHC')}</Text>
            <Text style={styles.facilityAddress}>{t('emergency.villagePHCAddress')}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📞 {t('emergency.call')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>📍 {t('emergency.directions')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity 
        style={styles.ambulanceButton}
        onPress={() => {
          // In a real app, this would call an ambulance service API
          alert(t('emergency.ambulanceNotified'));
        }}
      >
        <Text style={styles.ambulanceButtonText}>🚑 {t('emergency.bookAmbulance')}</Text>
      </TouchableOpacity>


      <Navigation navigation={navigation} activeScreen="EmergencyReferral" />
    </SafeAreaView>
  );
};

export default EmergencyReferral;