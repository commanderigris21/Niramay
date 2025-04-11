import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './PatientCard.styles';
import Header from './Header';
import Navigation from './Navigation';
import { getLetterAvatar } from '../utils/avatarUtils';

const PatientCard = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { patientId } = route.params;
  
  // Create patient data - in a real app, this would be fetched from an API
  const patientData = {
    name: t('patientData.patientName'),
    id: '#23456',
    riskLevel: t('patientsList.riskLevels.highrisk')
  };
  
  // Generate letter avatar from patient name
  const avatar = getLetterAvatar(patientData.name);
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('patientDetails.patientDetails')} navigation={navigation} showBackButton={true} />
      
      <View style={styles.patientHeader}>
        <Text style={styles.patientName}>{t('patientData.patientName')}</Text>
        <View style={styles.riskBadge}>
          <Text style={styles.riskText}>{t('patientsList.riskLevels.highrisk')}</Text>
        </View>
      </View>
      
      <View style={styles.idContainer}>
        <Text style={styles.idText}>{t('patientsList.id')}: #23456</Text>
      </View>

      <View style={styles.profileSection}>
        {/* Letter avatar based on patient name */}
        <View style={[styles.profileImage, { backgroundColor: avatar.backgroundColor }]}>
          <Text style={styles.profileAvatarText}>{avatar.initials}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.infoText}>{t('patientDetails.age')}: 28 years</Text>
          <Text style={styles.infoText}>{t('patientDetails.bloodGroup')}: B+</Text>
          <Text style={styles.infoText}>{t('patientDetails.lastVisit')}: 15 Jan 2025</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{t('patientDetails.currentConditions')}</Text>
        <View style={styles.conditionItem}>
          <View style={[styles.conditionIndicator, styles.redIndicator]} />
          <Text style={styles.conditionText}>{t('patientData.condition1')}</Text>
        </View>
        <View style={styles.conditionItem}>
          <View style={[styles.conditionIndicator, styles.orangeIndicator]} />
          <Text style={styles.conditionText}>{t('patientData.condition2')}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{t('patientDetails.recentVitals')}</Text>
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>{t('patientDetails.bloodPressure')}</Text>
            <Text style={styles.vitalValue}>120/80 mmHg</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>{t('patientDetails.hemoglobin')}</Text>
            <Text style={[styles.vitalValue, styles.alertValue]}>8.5 g/dL</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>{t('patientDetails.weight')}</Text>
            <Text style={styles.vitalValue}>65 kg</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>{t('patientDetails.glucose')}</Text>
            <Text style={[styles.vitalValue, styles.warningValue]}>140 mg/dL</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.emergencyButton} onPress={() => navigation.navigate('EmergencyReferral')}>
        <Text style={styles.emergencyButtonText}>🚑 {t('patientDetails.emergencyAmbulance')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyButtonText}>{t('patientDetails.viewMedicalHistory')}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.survey1Button} 
        onPress={() => navigation.navigate('PrimarySurvey', { patientId })}>
        <Text style={styles.survey1ButtonText}>{t('patientDetails.primarySurvey')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.survey2Button} 
        onPress={() => navigation.navigate('SecondarySurvey', { patientId })}>
        <Text style={styles.survey2ButtonText}>{t('patientDetails.secondarySurvey')}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.dietButton} 
        onPress={() => navigation.navigate('Diet', { patientId })}>
        <Text style={styles.dietButtonText}>{t('patientDetails.diet')}</Text>
      </TouchableOpacity>
      

      <Navigation navigation={navigation} activeScreen="PatientsList" />
    </SafeAreaView>
  );
};

export default PatientCard;