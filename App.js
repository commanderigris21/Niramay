import React, { useState } from 'react';
import { Animated } from 'react-native';
import RegisterPatient from './src/components/RegisterPatient';
import CreateSurvey from './src/components/CreateSurvey';

export default function App() {
  const [showRegister, setShowRegister] = useState(true);
  const slideAnim = useState(new Animated.Value(0))[0];

  const handleCreateSurvey = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,  // Increased duration
      useNativeDriver: true,
    }).start(() => {
      setShowRegister(false);
      slideAnim.setValue(0);  // Reset animation value
    });
  };

  return (
    <Animated.View style={{
      flex: 1,
      transform: [{
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -500]  // Increased slide distance
        })
      }]
    }}>
      {showRegister ? 
        <RegisterPatient onCreateSurvey={handleCreateSurvey} /> : 
        <CreateSurvey />
      }
    </Animated.View>
  );
}