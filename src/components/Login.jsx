import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './Login.styles';

const Login = ({ navigation }) => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
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

  const handleLogin = () => {
    if (!userId || !password) return;
    
    
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    
    Keyboard.dismiss();
    setIsLoggingIn(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoggingIn(false);
      navigation.navigate('Dashboard');
    }, 1500);
  }

  const handleSignUp = () => {
    // Animation for signup button
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    
    // Navigate to SignUp page
    navigation.navigate('SignUp');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          enabled
        >
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Image 
              source={require('../../assets/NL.png')} 
              style={styles.logoIcon} 
              resizeMode="contain"
            />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.inputContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.inputLabel}>{t('login.loginToAccount')}</Text>
            <View style={styles.phoneInputWrapper}>
              <TextInput
                style={styles.phoneInput}
                placeholder={t('login.username')}
                keyboardType="default"
                value={userId}
                onChangeText={setUserId}
              />
            </View>
            
            <View style={styles.phoneInputWrapper}>
              <TextInput
                style={styles.phoneInput}
                placeholder={t('login.password')}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            
            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }], width: '100%', marginTop: 20 }}>
              <TouchableOpacity 
                style={[styles.button, (!userId || !password) && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={!userId || !password || isLoggingIn}
              >
                {isLoggingIn ? (
                  <Animated.View 
                    style={[
                      styles.loadingDot,
                      {
                        transform: [
                          {
                            scale: loadingAnim.interpolate({
                              inputRange: [0, 0.5, 1],
                              outputRange: [1, 1.5, 1]
                            })
                          }
                        ]
                      }
                    ]}
                  />
                ) : (
                  <Text style={styles.buttonText}>{t('common.login')}</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Text style={styles.termsText}>{t('login.noAccount')} </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={[styles.termsText, { color: '#3498db', fontWeight: '600' }]}>{t('common.signUp')}</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.termsText, { marginTop: 20 }]}>
              {t('login.termsAgreement')}
            </Text>
          </Animated.View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;