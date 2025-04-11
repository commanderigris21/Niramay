import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from './PrimarySurvey.styles';

const PrimarySurvey = ({ navigation, route }) => {
  const { patientId } = route.params || {};
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{t('primarySurvey.title')}</Text>
          {patientId && <Text style={styles.patientIdText}>{t('common.patients')} ID: {patientId}</Text>}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Add your survey form components here */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{t('primarySurvey.patientAssessment')}</Text>
          
          {/* Add form fields here */}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text>{t('common.home')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('PatientsList')}
        >
          <Ionicons name="people-outline" size={24} color="#666" />
          <Text>{t('common.patients')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-outline" size={24} color="#e74c3c" />
          <Text style={{ color: '#e74c3c' }}>{t('common.profile')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrimarySurvey;