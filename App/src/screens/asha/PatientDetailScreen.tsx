import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip, Divider, List, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Sample data to use instead of context
const samplePatients = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 25,
    phone: '9876543210',
    address: 'Village Amravati, Maharashtra',
    trimester: '2',
    riskLevel: 'medium',
    lastSurvey: {
      date: '2023-04-10',
      type: 'primary',
      findings: ['Mild anemia', 'Normal blood pressure'],
    },
    surveys: [
      {
        id: 's1',
        date: '2023-04-10',
        type: 'primary',
        findings: ['Mild anemia', 'Normal blood pressure'],
      }
    ],
    dietPlan: {
      recommendations: ['Increase iron intake', 'Stay hydrated'],
      lastUpdated: '2023-04-10',
    },
    timeline: [
      {
        date: '2023-04-10',
        event: 'Initial Registration',
        type: 'registration',
      },
      {
        date: '2023-04-10',
        event: 'Primary Survey Conducted',
        type: 'survey',
      }
    ],
  },
  {
    id: '2',
    name: 'Meera Patel',
    age: 28,
    phone: '8765432109',
    address: 'Nagpur, Maharashtra',
    trimester: 1,
    riskLevel: 'low',
    lastSurvey: {
      date: '2023-04-15',
      type: 'primary',
      findings: ['Normal vitals'],
    },
    surveys: [
      {
        id: 's2',
        date: '2023-04-15',
        type: 'primary',
        findings: ['Normal vitals'],
      }
    ],
    dietPlan: {
      recommendations: ['Balanced diet', 'Folic acid supplements'],
      lastUpdated: '2023-04-15',
    },
    timeline: [
      {
        date: '2023-04-15',
        event: 'Initial Registration',
        type: 'registration',
      },
      {
        date: '2023-04-15',
        event: 'Primary Survey Conducted',
        type: 'survey',
      }
    ],
  },
  {
    id: '3',
    name: 'Anjali Desai',
    age: 22,
    phone: '7654321098',
    address: 'Pune, Maharashtra',
    trimester: 3,
    riskLevel: 'high',
    lastSurvey: {
      date: '2023-04-05',
      type: 'primary',
      findings: ['High blood pressure', 'Swelling in feet'],
    },
    surveys: [
      {
        id: 's3',
        date: '2023-04-05',
        type: 'primary',
        findings: ['High blood pressure', 'Swelling in feet'],
      }
    ],
    dietPlan: {
      recommendations: ['Low sodium diet', 'Regular small meals'],
      lastUpdated: '2023-04-05',
    },
    timeline: [
      {
        date: '2023-04-05',
        event: 'Initial Registration',
        type: 'registration',
      },
      {
        date: '2023-04-05',
        event: 'Primary Survey Conducted',
        type: 'survey',
      }
    ],
  }
];

const PatientDetailScreen = ({ route, navigation }) => {
  const { patientId, patientName, trimester } = route.params;
  const [patientData, setPatientData] = useState(null);
  const theme = useTheme();
  
  // Refresh patient data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Find patient from global data
      if (global.patients) {
        const foundPatient = global.patients.find(p => p.id === patientId);
        if (foundPatient) {
          // Make sure to include any survey data that might have been added
          const updatedPatient = {
            ...foundPatient,
            // If there are surveys, set the most recent one as lastSurvey
            lastSurvey: foundPatient.surveys && foundPatient.surveys.length > 0 
              ? foundPatient.surveys[foundPatient.surveys.length - 1] 
              : foundPatient.lastSurvey
          };
          setPatientData(updatedPatient);
          return;
        }
      }
      
      // Check if we have survey data in global state
      if (global.surveys) {
        const patientSurveys = global.surveys.filter(s => s.patientId === patientId);
        
        if (patientSurveys.length > 0) {
          // Create or update patient with survey data
          const lastSurvey = patientSurveys[patientSurveys.length - 1];
          
          // Fallback to sample data first
          const samplePatient = samplePatients.find(p => p.id === patientId);
          
          if (samplePatient) {
            setPatientData({
              ...samplePatient,
              surveys: patientSurveys,
              lastSurvey: lastSurvey
            });
          } else if (patientName && patientId) {
            // Create a new patient with the survey data
            setPatientData({
              id: patientId,
              name: patientName,
              trimester: trimester || 'Unknown',
              riskLevel: lastSurvey.riskLevel || 'low',
              age: 'N/A',
              phone: 'N/A',
              address: 'N/A',
              lastSurvey: lastSurvey,
              surveys: patientSurveys,
              dietPlan: null,
              timeline: [
                {
                  date: new Date().toISOString().split('T')[0],
                  event: 'Initial Registration',
                  type: 'registration',
                },
                {
                  date: lastSurvey.date || new Date().toISOString().split('T')[0],
                  event: `${lastSurvey.type} Survey Conducted`,
                  type: 'survey',
                }
              ],
            });
          }
          return;
        }
      }
      
      // Fallback to sample data or create a new patient object from route params
      const samplePatient = samplePatients.find(p => p.id === patientId);
      
      if (samplePatient) {
        setPatientData(samplePatient);
      } else if (patientName && patientId) {
        // Create a new patient object from route params if no existing patient is found
        setPatientData({
          id: patientId,
          name: patientName,
          trimester: trimester || 'Unknown',
          riskLevel: 'low', // Default risk level
          age: 'N/A',
          phone: 'N/A',
          address: 'N/A',
          // Initialize empty structures for new patient
          lastSurvey: null,
          surveys: [],
          dietPlan: null,
          timeline: [
            {
              date: new Date().toISOString().split('T')[0],
              event: 'Initial Registration',
              type: 'registration',
            }
          ],
        });
      }
    }, [patientId, patientName, trimester, route.params?.refresh])  // Add refresh param to dependencies
  );
  
  if (!patientData) {
    return (
      <View style={styles.container}>
        <Text>Patient not found</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Go Back
        </Button>
      </View>
    );
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      default:
        return colors.success;
    }
  };

  const handlePrimarySurvey = () => {
    navigation.navigate('PrimarySurvey', {
      patientId: patientData.id,
      patientName: patientData.name,
      trimester: patientData.trimester,
    });
  };

  const handleSecondarySurvey = () => {
    navigation.navigate('SecondarySurvey', {
      patientId: patientData.id,
      patientName: patientData.name,
      trimester: patientData.trimester,
    });
  };

  const handleDietPlan = () => {
    navigation.navigate('DietPlan', {
      patientId: patientData.id,
      patientName: patientData.name,
      trimester: patientData.trimester,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.name}>{patientData.name}</Text>
          <View style={styles.basicInfo}>
            <Chip icon="cake-variant">{patientData.age} years</Chip>
            <Chip icon="phone">{patientData.phone || 'N/A'}</Chip>
            {patientData.riskLevel && (
              <Chip 
                icon="alert-circle"
                style={{ backgroundColor: getRiskColor(patientData.riskLevel) + '20' }}
                textStyle={{ color: getRiskColor(patientData.riskLevel) }}
              >
                {patientData.riskLevel.toUpperCase()} RISK
              </Chip>
            )}
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Patient ID:</Text>
              <Text style={styles.detailValue}>{patientData.id || 'N/A'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Trimester:</Text>
              <Text style={styles.detailValue}>{patientData.trimester || 'N/A'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Address:</Text>
              <Text style={styles.detailValue}>{patientData.address || 'N/A'}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handlePrimarySurvey}
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
          icon="clipboard-text"
        >
          Primary Survey
        </Button>

        <Button
          mode="contained"
          onPress={handleSecondarySurvey}
          style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
          contentStyle={styles.buttonContent}
          icon="clipboard-pulse"
        >
          Secondary Survey
        </Button>

        <Button
          mode="contained"
          onPress={handleDietPlan}
          style={[styles.actionButton, { backgroundColor: colors.success }]}
          contentStyle={styles.buttonContent}
          icon="food-apple"
        >
          Diet Plan
        </Button>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Recent Survey</Text>
          <Button 
            mode="contained-tonal" 
            onPress={() => navigation.navigate('SurveyHistory', { patientId: patientData.id })}
            compact
          >
            View All
          </Button>
        </View>
        
        {patientData.lastSurvey ? (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.surveyHeader}>
                <Text variant="titleMedium">
                  {patientData.lastSurvey.type ? 
                    patientData.lastSurvey.type.charAt(0).toUpperCase() + patientData.lastSurvey.type.slice(1) : 
                    'Unknown'} Survey
                </Text>
                <Chip size="small">{patientData.lastSurvey.date || 'N/A'}</Chip>
              </View>
              
              <Text variant="bodyMedium" style={styles.findingsTitle}>Findings:</Text>
              {patientData.lastSurvey.findings && patientData.lastSurvey.findings.length > 0 ? (
                patientData.lastSurvey.findings.map((finding, index) => (
                  <Text key={index} style={styles.finding}>• {finding}</Text>
                ))
              ) : (
                <Text style={styles.finding}>No findings recorded</Text>
              )}
            </Card.Content>
            <Card.Actions>
              {patientData.lastSurvey.type === 'primary' ? (
                <Button onPress={handleSecondarySurvey}>
                  Conduct Secondary Survey
                </Button>
              ) : (
                <Button onPress={handlePrimarySurvey}>
                  Conduct New Survey
                </Button>
              )}
            </Card.Actions>
          </Card>
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Text>No survey data available</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={handlePrimarySurvey}>
                Conduct First Survey
              </Button>
            </Card.Actions>
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Diet Plan</Text>
        </View>
        
        {patientData.dietPlan ? (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="bodyMedium">Last Updated: {patientData.dietPlan.lastUpdated || 'N/A'}</Text>
              <Text variant="bodyMedium" style={styles.findingsTitle}>Recommendations:</Text>
              {patientData.dietPlan.recommendations && patientData.dietPlan.recommendations.length > 0 ? (
                patientData.dietPlan.recommendations.map((rec, index) => (
                  <Text key={index} style={styles.finding}>• {rec}</Text>
                ))
              ) : (
                <Text style={styles.finding}>No recommendations yet</Text>
              )}
            </Card.Content>
            <Card.Actions>
              <Button onPress={handleDietPlan} icon="pencil">
                Update Diet Plan
              </Button>
            </Card.Actions>
          </Card>
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Text>No diet plan available</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={handleDietPlan} icon="plus">
                Create Diet Plan
              </Button>
            </Card.Actions>
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Timeline</Text>
        </View>
        
        <Card style={styles.card}>
          <Card.Content>
            {patientData.timeline && patientData.timeline.length > 0 ? (
              patientData.timeline.map((event, index) => (
                <React.Fragment key={index}>
                  <View style={styles.timelineItem}>
                    <Text variant="bodyMedium" style={styles.timelineDate}>{event.date}</Text>
                    <View style={styles.timelineEvent}>
                      <MaterialCommunityIcons 
                        name={event.type === 'survey' ? 'clipboard-text' : 'account-plus'} 
                        size={20} 
                        color={colors.primary} 
                        style={styles.timelineIcon}
                      />
                      <Text variant="bodyMedium">{event.event}</Text>
                    </View>
                  </View>
                  {index < patientData.timeline.length - 1 && <Divider style={styles.divider} />}
                </React.Fragment>
              ))
            ) : (
              <Text>No timeline events available</Text>
            )}
          </Card.Content>
        </Card>
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
    marginBottom: 16,
    elevation: 4,
  },
  name: {
    color: colors.primary,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
  basicInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  detailsContainer: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
    color: colors.textSecondary,
  },
  detailValue: {
    flex: 1,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  actionButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.primary,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  findingsTitle: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  finding: {
    marginLeft: 8,
    marginTop: 4,
  },
  timelineItem: {
    paddingVertical: 8,
  },
  timelineDate: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  timelineEvent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineIcon: {
    marginRight: 8,
  },
  divider: {
    marginVertical: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PatientDetailScreen;
