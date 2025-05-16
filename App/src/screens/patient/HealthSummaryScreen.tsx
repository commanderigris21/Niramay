import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Timeline, List, Chip, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

interface HealthSummary {
  currentStatus: {
    riskLevel: 'low' | 'medium' | 'high';
    conditions: string[];
    doctorNotes: string;
  };
  vitalsHistory: Array<{
    date: string;
    weight: string;
    bloodPressure: string;
    hemoglobin: string;
  }>;
  healthTimeline: Array<{
    date: string;
    title: string;
    description: string;
    type: 'checkup' | 'test' | 'vaccination';
  }>;
  upcomingActions: Array<{
    date: string;
    action: string;
    type: string;
  }>;
}

const HealthSummaryScreen = () => {
  const [healthData, setHealthData] = useState<HealthSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | false>(false);

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      // TODO: Replace with actual API call
      setLoading(true);
      // Mock data
      setHealthData({
        currentStatus: {
          riskLevel: 'low',
          conditions: ['Mild anemia', 'Low blood pressure'],
          doctorNotes: 'Patient is responding well to iron supplements. Continue current diet plan.',
        },
        vitalsHistory: [
          {
            date: '2025-04-10',
            weight: '58 kg',
            bloodPressure: '110/70',
            hemoglobin: '11.2',
          },
          {
            date: '2025-03-10',
            weight: '57 kg',
            bloodPressure: '108/72',
            hemoglobin: '10.8',
          },
        ],
        healthTimeline: [
          {
            date: '2025-04-10',
            title: 'Regular Checkup',
            description: 'All parameters normal. Prescribed iron supplements.',
            type: 'checkup',
          },
          {
            date: '2025-04-05',
            title: 'Blood Tests',
            description: 'Hemoglobin levels improving.',
            type: 'test',
          },
          {
            date: '2025-03-25',
            title: 'TT Vaccination',
            description: 'Second dose administered.',
            type: 'vaccination',
          },
        ],
        upcomingActions: [
          {
            date: '2025-04-15',
            action: 'Monthly Checkup',
            type: 'checkup',
          },
          {
            date: '2025-04-20',
            action: 'Blood Sugar Test',
            type: 'test',
          },
        ],
      });
    } catch (error) {
      console.error('Failed to load health data:', error);
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

  const getIconForType = (type: string) => {
    switch (type) {
      case 'checkup':
        return 'stethoscope';
      case 'test':
        return 'test-tube';
      case 'vaccination':
        return 'needle';
      default:
        return 'calendar';
    }
  };

  if (!healthData) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Current Status</Text>
          <View style={styles.statusContainer}>
            <Chip
              icon="alert-circle"
              style={{
                backgroundColor: getRiskColor(healthData.currentStatus.riskLevel) + '20',
                alignSelf: 'flex-start',
              }}
              textStyle={{ color: getRiskColor(healthData.currentStatus.riskLevel) }}
            >
              {healthData.currentStatus.riskLevel.toUpperCase()} RISK
            </Chip>
            <View style={styles.conditionsContainer}>
              {healthData.currentStatus.conditions.map((condition, index) => (
                <Chip
                  key={index}
                  style={styles.conditionChip}
                >
                  {condition}
                </Chip>
              ))}
            </View>
            <Text variant="bodyMedium" style={styles.notes}>
              {healthData.currentStatus.doctorNotes}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <List.Section>
        <List.Accordion
          title="Vitals History"
          left={props => <List.Icon {...props} icon="chart-line" />}
          expanded={expandedSection === 'vitals'}
          onPress={() => setExpandedSection(expandedSection === 'vitals' ? false : 'vitals')}
          style={styles.accordion}
        >
          {healthData.vitalsHistory.map((record, index) => (
            <Card key={index} style={styles.vitalCard}>
              <Card.Content>
                <Text variant="bodySmall" style={styles.date}>{record.date}</Text>
                <View style={styles.vitalsGrid}>
                  <View style={styles.vitalItem}>
                    <MaterialCommunityIcons name="scale" size={24} color={colors.primary} />
                    <Text variant="bodyMedium">Weight</Text>
                    <Text variant="titleMedium">{record.weight}</Text>
                  </View>
                  <View style={styles.vitalItem}>
                    <MaterialCommunityIcons name="heart-pulse" size={24} color={colors.primary} />
                    <Text variant="bodyMedium">BP</Text>
                    <Text variant="titleMedium">{record.bloodPressure}</Text>
                  </View>
                  <View style={styles.vitalItem}>
                    <MaterialCommunityIcons name="water" size={24} color={colors.primary} />
                    <Text variant="bodyMedium">Hb</Text>
                    <Text variant="titleMedium">{record.hemoglobin}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </List.Accordion>

        <List.Accordion
          title="Health Timeline"
          left={props => <List.Icon {...props} icon="timeline" />}
          expanded={expandedSection === 'timeline'}
          onPress={() => setExpandedSection(expandedSection === 'timeline' ? false : 'timeline')}
          style={styles.accordion}
        >
          {healthData.healthTimeline.map((event, index) => (
            <Card key={index} style={styles.timelineCard}>
              <Card.Content>
                <View style={styles.timelineItem}>
                  <MaterialCommunityIcons
                    name={getIconForType(event.type)}
                    size={24}
                    color={colors.primary}
                  />
                  <View style={styles.timelineContent}>
                    <Text variant="titleSmall">{event.title}</Text>
                    <Text variant="bodySmall" style={styles.date}>{event.date}</Text>
                    <Text variant="bodyMedium" style={styles.description}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </List.Accordion>
      </List.Section>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Upcoming Actions</Text>
          {healthData.upcomingActions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <MaterialCommunityIcons
                name={getIconForType(action.type)}
                size={24}
                color={colors.primary}
              />
              <View style={styles.actionContent}>
                <Text variant="bodyMedium">{action.action}</Text>
                <Text variant="bodySmall" style={styles.date}>{action.date}</Text>
              </View>
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
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    color: colors.primary,
    marginBottom: 16,
  },
  statusContainer: {
    gap: 12,
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionChip: {
    backgroundColor: colors.primary + '20',
  },
  notes: {
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
  },
  accordion: {
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  vitalCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 8,
  },
  vitalItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
  },
  timelineCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineContent: {
    marginLeft: 12,
    flex: 1,
  },
  date: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  description: {
    marginTop: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionContent: {
    marginLeft: 12,
  },
});

export default HealthSummaryScreen;
