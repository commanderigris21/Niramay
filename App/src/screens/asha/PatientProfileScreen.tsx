import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AshaStackParamList } from '../../navigation/AshaNavigator';
import { colors } from '../../styles/theme';

interface PatientProfileProps {
  route: {
    params: {
      patientId: string;
      patientName: string;
      trimester: string;
    };
  };
}

const PatientProfileScreen: React.FC<PatientProfileProps> = ({ route }) => {
  const { patientId, patientName, trimester } = route.params;
  const navigation = useNavigation<NavigationProp<AshaStackParamList>>();
  const theme = useTheme();

  const handlePrimarySurvey = () => {
    navigation.navigate('PrimarySurvey', {
      patientId,
      patientName,
      trimester,
    } as never);
  };

  const handleSecondarySurvey = () => {
    navigation.navigate('SecondarySurvey', {
      patientId,
      patientName,
      trimester,
    } as never);
  };

  const handleDietPlan = () => {
    navigation.navigate('DietPlan', {
      patientId,
      patientName,
      trimester,
    } as never);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.name}>{patientName}</Text>
          <Text variant="titleMedium" style={styles.detail}>Trimester: {trimester}</Text>
          <Text variant="titleMedium" style={styles.detail}>Patient ID: {patientId}</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handlePrimarySurvey}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
        >
          Primary Survey
        </Button>

        <Button
          mode="contained"
          onPress={handleSecondarySurvey}
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          contentStyle={styles.buttonContent}
        >
          Secondary Survey
        </Button>

        <Button
          mode="contained"
          onPress={handleDietPlan}
          style={[styles.button, { backgroundColor: colors.success }]}
          contentStyle={styles.buttonContent}
        >
          Diet Plan
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  profileCard: {
    marginBottom: 24,
    elevation: 4,
  },
  name: {
    color: colors.primary,
    marginBottom: 8,
  },
  detail: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default PatientProfileScreen;
