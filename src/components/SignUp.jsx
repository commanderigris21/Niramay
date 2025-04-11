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
  TextInput,
  Alert
} from 'react-native';
import styles from './SignUp.styles';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [ashaId, setAshaId] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
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

    // Start loading animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const handleRegister = () => {
    // Validate inputs
    if (!name || !ashaId || !pincode || !mobile) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Validate pincode (6 digits)
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      Alert.alert('Error', 'Pincode must be 6 digits');
      return;
    }

    // Validate mobile number (10 digits)
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      Alert.alert('Error', 'Mobile number must be 10 digits');
      return;
    }
    
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
    setIsRegistering(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsRegistering(false);
      Alert.alert(
        'Registration Successful', 
        'Your account has been created successfully!',
        [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
      );
    }, 1500);
  }

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
            <Text style={styles.inputLabel}>Create your account</Text>
            
            {/* Name Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                keyboardType="default"
                value={name}
                onChangeText={setName}
              />
            </View>
            
            {/* ASHA ID Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="ASHA ID"
                keyboardType="default"
                value={ashaId}
                onChangeText={setAshaId}
              />
            </View>
            
            {/* Pincode Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Region Pincode (6 digits)"
                keyboardType="numeric"
                maxLength={6}
                value={pincode}
                onChangeText={setPincode}
              />
            </View>
            
            {/* Mobile Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
              />
            </View>
            
            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }], width: '100%', marginTop: 20 }}>
              <TouchableOpacity 
                style={[styles.button, (!name || !ashaId || !pincode || !mobile) && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={!name || !ashaId || !pincode || !mobile || isRegistering}
              >
                {isRegistering ? (
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
                  <Text style={styles.buttonText}>Register</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Text style={styles.termsText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.termsText, { color: '#3498db', fontWeight: '600' }]}>Login</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.termsText, { marginTop: 20 }]}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </Animated.View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;