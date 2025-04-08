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
import styles from './Login.styles';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const otpSlideAnim = useRef(new Animated.Value(50)).current;
  const otpFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  
  // References for OTP inputs
  const otpInputs = useRef([]);

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

  const handlePhoneSubmit = () => {
    if (phoneNumber.length < 10) return;
    
    // Button press animation
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
    
    // Wait for keyboard to dismiss before starting animations
    setTimeout(() => {
      // Slide out phone input with easing
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        setIsPhoneSubmitted(true);
        
        // Slide in OTP input with smoother animation
        Animated.parallel([
          Animated.timing(otpSlideAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(otpFadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        ]).start(() => {
          // Focus first OTP input
          if (otpInputs.current[0]) {
            otpInputs.current[0].focus();
          }
        });
      });
    }, 100);
  }

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (text && index < 3) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length !== 4) return;
    
    setIsVerifying(true);
    
    // Start loading animation
    Animated.loop(
      Animated.timing(loadingAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
    
    // Simulate verification (replace with actual verification)
    setTimeout(() => {
      setIsVerifying(false);
      navigation.navigate('Dashboard');
    }, 2000);
  };

  const handleResendOtp = () => {
    // Animation for resend button
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
    
    // Reset OTP fields
    setOtp(['', '', '', '']);
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
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
          
          {!isPhoneSubmitted ? (
            <Animated.View 
              style={[
                styles.inputContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.inputLabel}>Enter your phone number (India)</Text>
              <View style={styles.phoneInputWrapper}>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="10-digit mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
              
              <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                <TouchableOpacity 
                  style={[styles.button, phoneNumber.length < 10 && styles.buttonDisabled]}
                  onPress={handlePhoneSubmit}
                  disabled={phoneNumber.length < 10}
                >
                  <Text style={styles.buttonText}>Get OTP</Text>
                </TouchableOpacity>
              </Animated.View>
              
              <Text style={styles.termsText}>
                By continuing, you agree to our Terms of Service and Privacy Policy
              </Text>
            </Animated.View>
          ) : (
            <Animated.View 
              style={[
                styles.otpContainer,
                {
                  opacity: otpFadeAnim,
                  transform: [{ translateY: otpSlideAnim }]
                }
              ]}
            >
              <Text style={styles.otpTitle}>Verification Code</Text>
              <Text style={styles.otpDescription}>
                We've sent a 4-digit OTP to {phoneNumber}
              </Text>
              
              <View style={styles.otpInputsContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => otpInputs.current[index] = ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={text => handleOtpChange(text, index)}
                    onKeyPress={e => handleOtpKeyPress(e, index)}
                  />
                ))}
              </View>
              
              <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                <TouchableOpacity 
                  style={[styles.button, otp.join('').length !== 4 && styles.buttonDisabled]}
                  onPress={handleVerifyOtp}
                  disabled={otp.join('').length !== 4 || isVerifying}
                >
                  {isVerifying ? (
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
                    <Text style={styles.buttonText}>Verify</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
              
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the OTP? </Text>
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={styles.resendButton}>Resend</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.changeNumberButton}
                onPress={() => {
                  setIsPhoneSubmitted(false);
                  setOtp(['', '', '', '']);
                }}
              >
                <Text style={styles.changeNumberText}>Change Phone Number</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;