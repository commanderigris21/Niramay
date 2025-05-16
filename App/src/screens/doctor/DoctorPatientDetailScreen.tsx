import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip, Divider, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

interface SurveyData {
  date: string;
  type: 'primary' | 'secondary';
  findings: string[];
  riskLevel: 'low' | 'medium' | 'high';
  validatedBy?: string;
}

interface PatientData {
  id: string;
  name: string;
  age: number;
  phone: string;
  address: string;
  trimester: number;
  ashaWorker: string;
  currentDiagnosis: {
    riskLevel: 'low' | 'medium' | 'high';
    conditions: string[];
    notes: string;
    lastUpdated: string;
  };
  dietPlan: {
    recommendations: string[];
    supplements: string[];
    restrictions: string[];
    lastUpdated: string;
  };
  recentSurveys: SurveyData[];
}

const DoctorPatientDetailScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatientData();
  }, []);

  const loadPatientData = async () => {
    try {
      // TODO: Replace with actual API call
      setLoading(true);
      // Mock data
      setPatient({
        id: patientId,
        name: 'Priya Sharma',
        age: 25,
        phone: '9876543210',
        address: 'Village Amravati, Maharashtra',
        trimester: 2,
        ashaWorker: 'Meena',
        currentDiagnosis: {
          riskLevel: 'medium',
          conditions: ['Mild anemia', 'Gestational diabetes risk'],
          notes: 'Regular monitoring of blood sugar levels required',
          lastUpdated: '2025-04-10',
        },
        dietPlan: {
          recommendations: [
            'High protein diet',
            'Iron-rich foods',
            'Small frequent meals',
          ],
          supplements: [
            'Iron and Folic acid',
            'Calcium',
            'Vitamin D3',
          ],
          restrictions: [
            'Avoid processed sugars',
            'Limit caffeine intake',
          ],
          lastUpdated: '2025-04-10',
        },
        recentSurveys: [
          {
            date: '2025-04-10',
            type: 'primary',
            findings: ['Hemoglobin: 10.5', 'BP: 110/70', 'Weight: 58kg'],
            riskLevel: 'medium',
            validatedBy: 'Dr. Mehta',
          },
          {
            date: '2025-04-05',
            type: 'secondary',
            findings: ['Blood sugar: 140mg/dL', 'Thyroid: Normal'],
            riskLevel: 'low',
            validatedBy: 'Dr. Mehta',
          },
        ],
      });
    } catch (error) {
      console.error('Failed to load patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      default:
        return colors.success;
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={styles.centered}>
        <Text>Patient not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">{patient.name}</Text>
          <View style={styles.basicInfo}>
            <Chip icon="cake-variant">{patient.age} years</Chip>
            <Chip icon="phone">{patient.phone}</Chip>
            <Chip icon="account-heart">ASHA: {patient.ashaWorker}</Chip>
          </View>
          <Text variant="bodyMedium" style={styles.address}>
            {patient.address}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium">Current Diagnosis</Text>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate('EditDiagnosis', { patientId })}
            >
              Update
            </Button>
          </View>
          <Chip
            icon="alert-circle"
            style={{ backgroundColor: getRiskColor(patient.currentDiagnosis.riskLevel) + '20', alignSelf: 'flex-start', marginVertical: 8 }}
            textStyle={{ color: getRiskColor(patient.currentDiagnosis.riskLevel) }}
          >
            {patient.currentDiagnosis.riskLevel.toUpperCase()} RISK
          </Chip>
          <Text variant="titleSmall" style={styles.subtitle}>Conditions:</Text>
          {patient.currentDiagnosis.conditions.map((condition, index) => (
            <Text key={index} style={styles.listItem}>• {condition}</Text>
          ))}
          <Text variant="titleSmall" style={[styles.subtitle, styles.topSpacing]}>Notes:</Text>
          <Text variant="bodyMedium">{patient.currentDiagnosis.notes}</Text>
          <Text variant="bodySmall" style={styles.updateText}>
            Last updated: {patient.currentDiagnosis.lastUpdated}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium">Diet Plan</Text>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate('EditDietPlan', { patientId })}
            >
              Update
            </Button>
          </View>
          
          <Text variant="titleSmall" style={styles.subtitle}>Recommendations:</Text>
          {patient.dietPlan.recommendations.map((rec, index) => (
            <Text key={index} style={styles.listItem}>• {rec}</Text>
          ))}

          <Text variant="titleSmall" style={[styles.subtitle, styles.topSpacing]}>Supplements:</Text>
          {patient.dietPlan.supplements.map((supplement, index) => (
            <Text key={index} style={styles.listItem}>• {supplement}</Text>
          ))}

          <Text variant="titleSmall" style={[styles.subtitle, styles.topSpacing]}>Restrictions:</Text>
          {patient.dietPlan.restrictions.map((restriction, index) => (
            <Text key={index} style={styles.listItem}>• {restriction}</Text>
          ))}

          <Text variant="bodySmall" style={styles.updateText}>
            Last updated: {patient.dietPlan.lastUpdated}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.subtitle}>Recent Surveys</Text>
          {patient.recentSurveys.map((survey, index) => (
            <View key={index}>
              {index > 0 && <Divider style={styles.divider} />}
              <View style={styles.surveyHeader}>
                <View>
                  <Text variant="titleSmall">
                    {survey.type.toUpperCase()} SURVEY
                  </Text>
                  <Text variant="bodySmall">{survey.date}</Text>
                </View>
                <Chip
                  icon="alert-circle"
                  style={{ backgroundColor: getRiskColor(survey.riskLevel) + '20' }}
                  textStyle={{ color: getRiskColor(survey.riskLevel) }}
                >
                  {survey.riskLevel.toUpperCase()}
                </Chip>
              </View>
              {survey.findings.map((finding, idx) => (
                <Text key={idx} style={styles.listItem}>• {finding}</Text>
              ))}
              <Text variant="bodySmall" style={styles.validatedBy}>
                Validated by: {survey.validatedBy}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  basicInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  address: {
    color: colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.primary,
    marginBottom: 8,
  },
  listItem: {
    marginBottom: 4,
  },
  topSpacing: {
    marginTop: 16,
  },
  updateText: {
    color: colors.textSecondary,
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  validatedBy: {
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default DoctorPatientDetailScreen;
