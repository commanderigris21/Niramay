import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './Profile.styles';
import Header from './Header';
import Navigation from './Navigation';
import { getLetterAvatar } from '../utils/avatarUtils';

const Profile = ({ navigation }) => {
  const { t } = useTranslation();
  // Mock user data - in a real app, this would come from authentication context or API
  const [userData, setUserData] = useState({
    name: t('profile.ashaWorkerName'),
    ashaId: 'ASHA123456',
    pincode: '400001',
    mobile: '9876543210',
    region: t('profile.region'),
    joinDate: '15 Jan 2023',
    surveysCompleted: 45,
    patientsRegistered: 32
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Get avatar for the user
  const avatar = getLetterAvatar(userData.name);

  const handleLogout = () => {
    Alert.alert(
      t('profile.logout'),
      t('profile.logoutConfirmation'),
      [
        {
          text: t('profile.cancel'),
          style: 'cancel',
        },
        {
          text: t('profile.logout'),
          onPress: () => {
            // In a real app, this would clear authentication tokens
            navigation.navigate('Login');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('profile.myProfile')} navigation={navigation} />

      <ScrollView style={styles.contentContainer}>
        <Animated.View 
          style={[
            styles.profileHeader,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Profile Avatar */}
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: avatar.backgroundColor }]}>
              <Text style={styles.avatarText}>{avatar.initials}</Text>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userRole}>{t('profile.ashaWorker')}</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.infoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>{t('profile.personalInformation')}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('profile.ashaId')}</Text>
            <Text style={styles.infoValue}>{userData.ashaId}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('profile.mobileNumber')}</Text>
            <Text style={styles.infoValue}>{userData.mobile}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('profile.region')}</Text>
            <Text style={styles.infoValue}>{userData.region}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('profile.pincode')}</Text>
            <Text style={styles.infoValue}>{userData.pincode}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('profile.joinedDate')}</Text>
            <Text style={styles.infoValue}>{userData.joinDate}</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>{t('profile.activityStatistics')}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.surveysCompleted}</Text>
              <Text style={styles.statLabel}>{t('profile.surveysCompleted')}</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.patientsRegistered}</Text>
              <Text style={styles.statLabel}>{t('profile.patientsRegistered')}</Text>
            </View>
          </View>
        </Animated.View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>{t('profile.logout')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Navigation navigation={navigation} activeScreen="Profile" />
    </SafeAreaView>
  );
};

export default Profile;