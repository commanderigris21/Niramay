import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './Header.styles';

const Header = ({ title, navigation, showBackButton = false, onBackPress }) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={() => onBackPress ? onBackPress() : navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/NL.png')} 
            style={styles.logoIcon} 
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>{title || t('common.appName')}</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Text>🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;