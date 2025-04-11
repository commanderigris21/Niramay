import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './Navigation.styles';

const Navigation = ({ navigation, activeScreen }) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'Dashboard' && styles.activeNavItem]}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text>🏠</Text>
        <Text>{t('common.home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'PatientsList' && styles.activeNavItem]}
        onPress={() => navigation.navigate('PatientsList')}
      >
        <Text>👥</Text>
        <Text>{t('common.patients')}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'EmergencyReferral' && styles.activeNavItem]}
        onPress={() => navigation.navigate('EmergencyReferral')}
      >
        <Text>⚠️</Text>
        <Text>{t('common.anc')}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.navItem, activeScreen === 'Profile' && styles.activeNavItem]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text>👤</Text>
        <Text>{t('common.profile')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;