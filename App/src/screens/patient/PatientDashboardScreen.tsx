import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, ProgressBar, Chip, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

interface HealthData {
  trimester: number;
  weeksPassed: number;
  nextCheckup: string;
  riskLevel: 'low' | 'medium' | 'high';
  recentUpdates: Array<{
    date: string;
    title: string;
    type: 'checkup' | 'diet' | 'test';
  }>;
  vitals: {
    weight: string;
    bloodPressure: string;
    hemoglobin: string;
  };
  doctorInfo: {
    name: string;
    designation: string;
    phone: string;
  };
  ashaInfo: {
    name: string;
    phone: string;
  };
}

const PatientDashboardScreen = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      // TODO: Replace with actual API call
      setLoading(true);
      // Mock data
      setHealthData({
        trimester: 2,
        weeksPassed: 18,
        nextCheckup: '2025-04-15',
        riskLevel: 'low',
        recentUpdates: [
          {
            date: '2025-04-10',
            title: 'Monthly Checkup Completed',
            type: 'checkup',
          },
          {
            date: '2025-04-08',
            title: 'Diet Plan Updated',
            type: 'diet',
          },
          {
            date: '2025-04-05',
            title: 'Blood Tests Results',
            type: 'test',
          },
        ],
        vitals: {
          weight: '58 kg',
          bloodPressure: '110/70',
          hemoglobin: '11.2',
        },
        doctorInfo: {
          name: 'Dr. Mehta',
          designation: 'PHC Doctor',
          phone: '9876543210',
        },
        ashaInfo: {
          name: 'Meena',
          phone: '9876543211',
        },
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

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'checkup':
        return 'stethoscope';
      case 'diet':
        return 'food-apple';
      case 'test':
        return 'test-tube';
      default:
        return 'information';
    }
  };

  if (!healthData) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.welcomeTitle}>
            Welcome, Priya!
          </Text>
          <View style={styles.pregnancyProgress}>
            <View style={styles.trimesterInfo}>
              <Text variant="titleMedium">Trimester {healthData.trimester}</Text>
              <Text variant="bodyMedium" style={styles.weeksText}>
                Week {healthData.weeksPassed}
              </Text>
            </View>
            <ProgressBar
              progress={healthData.weeksPassed / 40}
              color={colors.primary}
              style={styles.progressBar}
            />
          </View>
          <View style={styles.nextCheckup}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={24}
              color={colors.primary}
            />
            <Text variant="bodyMedium" style={styles.nextCheckupText}>
              Next Checkup: {healthData.nextCheckup}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Current Vitals</Text>
          <View style={styles.vitalsGrid}>
            <View style={styles.vitalItem}>
              <MaterialCommunityIcons name="scale" size={24} color={colors.primary} />
              <Text variant="bodyMedium">Weight</Text>
              <Text variant="titleMedium">{healthData.vitals.weight}</Text>
            </View>
            <View style={styles.vitalItem}>
              <MaterialCommunityIcons name="heart-pulse" size={24} color={colors.primary} />
              <Text variant="bodyMedium">BP</Text>
              <Text variant="titleMedium">{healthData.vitals.bloodPressure}</Text>
            </View>
            <View style={styles.vitalItem}>
              <MaterialCommunityIcons name="water" size={24} color={colors.primary} />
              <Text variant="bodyMedium">Hemoglobin</Text>
              <Text variant="titleMedium">{healthData.vitals.hemoglobin}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Recent Updates</Text>
          {healthData.recentUpdates.map((update, index) => (
            <View key={index} style={styles.updateItem}>
              <MaterialCommunityIcons
                name={getUpdateIcon(update.type)}
                size={24}
                color={colors.primary}
              />
              <View style={styles.updateContent}>
                <Text variant="bodyMedium">{update.title}</Text>
                <Text variant="bodySmall" style={styles.dateText}>
                  {update.date}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Healthcare Team</Text>
          
          <View style={styles.contactCard}>
            <Avatar.Icon size={40} icon="doctor" style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text variant="titleSmall">{healthData.doctorInfo.name}</Text>
              <Text variant="bodySmall">{healthData.doctorInfo.designation}</Text>
            </View>
            <Button
              mode="contained-tonal"
              icon="phone"
              onPress={() => {}}
              style={styles.callButton}
            >
              Call
            </Button>
          </View>

          <View style={styles.contactCard}>
            <Avatar.Icon size={40} icon="account-heart" style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text variant="titleSmall">{healthData.ashaInfo.name}</Text>
              <Text variant="bodySmall">ASHA Worker</Text>
            </View>
            <Button
              mode="contained-tonal"
              icon="phone"
              onPress={() => {}}
              style={styles.callButton}
            >
              Call
            </Button>
          </View>
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
  welcomeTitle: {
    color: colors.primary,
    marginBottom: 16,
  },
  pregnancyProgress: {
    marginBottom: 16,
  },
  trimesterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weeksText: {
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  nextCheckup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
  },
  nextCheckupText: {
    marginLeft: 8,
  },
  sectionTitle: {
    marginBottom: 16,
    color: colors.primary,
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  vitalItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  updateContent: {
    marginLeft: 12,
    flex: 1,
  },
  dateText: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: colors.primary + '20',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  callButton: {
    marginLeft: 8,
  },
});

export default PatientDashboardScreen;
