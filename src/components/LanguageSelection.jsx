import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSelection = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    try {
      // Change language
      i18n.changeLanguage(lng);
      
      // Navigate to Login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('languageSelection.title')}</Text>
        <Text style={styles.subtitle}>{t('languageSelection.subtitle')}</Text>

        <View style={styles.languageOptions}>
          <TouchableOpacity 
            style={styles.languageButton} 
            onPress={() => changeLanguage('en')}
          >
            <View style={styles.languageContent}>
              <View style={[styles.flagIndicator, styles.englishFlag]}>
                <Text style={styles.flagText}>EN</Text>
              </View>
              <View style={styles.languageTextContainer}>
                <Text style={styles.languageName}>English</Text>
                <Text style={styles.nativeLanguageName}>English</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.languageButton} 
            onPress={() => changeLanguage('hi')}
          >
            <View style={styles.languageContent}>
              <View style={[styles.flagIndicator, styles.hindiFlag]}>
                <Text style={styles.flagText}>हि</Text>
              </View>
              <View style={styles.languageTextContainer}>
                <Text style={styles.languageName}>Hindi</Text>
                <Text style={styles.nativeLanguageName}>हिंदी</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  languageOptions: {
    width: '100%',
  },
  languageButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  englishFlag: {
    backgroundColor: '#1a4d8c', // Dark blue color for English
  },
  hindiFlag: {
    backgroundColor: '#ff9933', // Saffron color for Hindi
  },
  flagText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nativeLanguageName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default LanguageSelection;
