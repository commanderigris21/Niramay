import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  BackHandler
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getLetterAvatar } from '../utils/avatarUtils';
import styles from './RegisterPatient.styles';
import Header from './Header';
import Navigation from './Navigation';

const RegisterPatient = ({ navigation }) => {
  const { t } = useTranslation();
  const [patientData, setPatientData] = useState({
    fullName: '',
    age: '',
    phoneNumber: '',
    address: '',
    trimester: '',
    photo: null
  });
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Handle back button press to close camera if active
  useEffect(() => {
    const backAction = () => {
      if (isCameraActive) {
        setIsCameraActive(false);
        return true; // Prevent default back action
      }
      return false; // Let default back action happen
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isCameraActive]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: t('register.cameraPermissionTitle'),
            message: t('register.cameraPermissionMessage'),
            buttonNeutral: t('register.askMeLater'),
            buttonNegative: t('register.cancel'),
            buttonPositive: t('register.ok')
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS handles permissions differently
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      Alert.alert(
        t('register.permissionDenied'),
        t('register.cameraPermissionRequired')
      );
      return;
    }
    
    setIsCameraActive(true);
    
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
      quality: 0.8,
      saveToPhotos: false,
      cameraType: 'front',
      durationLimit: 0, // Set to 0 to take a single shot
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      presentationStyle: 'fullScreen',
      includeExtra: true
    };

    try {
      const result = await launchCamera(options);
      setIsCameraActive(false);
      
      if (result.didCancel) {
        console.log('User cancelled camera');
      } else if (result.errorCode) {
        console.log('Camera Error: ', result.errorMessage);
        Alert.alert('Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        console.log('Photo taken successfully', result.assets[0].uri);
        setPatientData({ ...patientData, photo: { uri: result.assets[0].uri } });
      }
    } catch (error) {
      setIsCameraActive(false);
      console.log('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleSelectFromGallery = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
      quality: 0.8,
      presentationStyle: 'fullScreen',
      selectionLimit: 1
    };

    try {
      const result = await launchImageLibrary(options);
      
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        console.log('Image selected successfully', result.assets[0].uri);
        setPatientData({ ...patientData, photo: { uri: result.assets[0].uri } });
      }
    } catch (error) {
      console.log('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const handleSubmit = () => {
    console.log('Patient Data:', patientData);
    // Navigate to PatientsList after registration
    navigation.navigate('PatientsList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('register.title')} navigation={navigation} showBackButton={true} />

      <ScrollView style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('register.personalInfo')}</Text>
          
          {/* Photo/Avatar section */}
          <View style={styles.photoContainer}>
            {patientData.photo ? (
              <Image source={patientData.photo} style={styles.photoPreview} />
            ) : patientData.fullName.trim() !== '' ? (
              <View 
                style={[styles.avatarPreview, { backgroundColor: getLetterAvatar(patientData.fullName).backgroundColor }]}
              >
                <Text style={styles.avatarPreviewText}>{getLetterAvatar(patientData.fullName).initials}</Text>
              </View>
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>👤</Text>
              </View>
            )}
            
            <View style={styles.photoButtonsContainer}>
              <TouchableOpacity 
                style={styles.photoButton} 
                onPress={handleTakePhoto}
                disabled={isCameraActive}
              >
                <Text style={styles.photoButtonText}>{t('register.takePhoto')}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.photoButton} 
                onPress={handleSelectFromGallery}
                disabled={isCameraActive}
              >
                <Text style={styles.photoButtonText}>{t('register.selectFromGallery')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.fullName')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.enterFullName')}
              value={patientData.fullName}
              onChangeText={(text) => setPatientData({...patientData, fullName: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.age')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.enterAge')}
              keyboardType="numeric"
              value={patientData.age}
              onChangeText={(text) => setPatientData({...patientData, age: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.phoneNumber')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.enterPhoneNumber')}
              keyboardType="phone-pad"
              value={patientData.phoneNumber}
              onChangeText={(text) => setPatientData({...patientData, phoneNumber: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.address')}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t('register.enterAddress')}
              multiline
              numberOfLines={3}
              value={patientData.address}
              onChangeText={(text) => setPatientData({...patientData, address: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('register.trimester')}</Text>
            <Picker
              selectedValue={patientData.trimester}
              style={styles.picker}
              onValueChange={(itemValue) => setPatientData({...patientData, trimester: itemValue})}
            >
              <Picker.Item label={t('register.selectTrimester')} value="" />
              <Picker.Item label={t('register.firstTrimester')} value="first" />
              <Picker.Item label={t('register.secondTrimester')} value="second" />
              <Picker.Item label={t('register.thirdTrimester')} value="third" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
          <Text style={styles.registerButtonText}>{t('register.registerPatient')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.registerButton, {borderWidth: 1, borderColor: '#e74c3c', backgroundColor: '#fff', marginTop: 10}]} onPress={() => navigation.navigate('PatientCard', { patientId: '#12345' })}>
          <Text style={[styles.registerButtonText, {color: '#e74c3c'}]}>{t('register.viewPatientCard')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Navigation navigation={navigation} activeScreen="PatientsList" />
    </SafeAreaView>
  );
};

export default RegisterPatient;