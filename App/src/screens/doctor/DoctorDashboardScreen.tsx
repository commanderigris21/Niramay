import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Chip, Searchbar, SegmentedButtons, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/theme';

interface Patient {
  id: string;
  name: string;
  age: number;
  trimester: number;
  riskLevel: 'low' | 'medium' | 'high';
  ashaWorker: string;
  lastUpdate: string;
  pendingReview: boolean;
}

const DoctorDashboardScreen = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      // TODO: Replace with actual API call
      setLoading(true);
      // Mock data
      setPatients([
        {
          id: '1',
          name: 'Priya Sharma',
          age: 25,
          trimester: 2,
          riskLevel: 'high',
          ashaWorker: 'Meena',
          lastUpdate: '2025-04-10',
          pendingReview: true,
        },
        {
          id: '2',
          name: 'Anjali Patel',
          age: 28,
          trimester: 1,
          riskLevel: 'low',
          ashaWorker: 'Radha',
          lastUpdate: '2025-04-11',
          pendingReview: false,
        },
        // Add more mock data
      ]);
    } catch (error) {
      console.error('Failed to load patients:', error);
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

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.ashaWorker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ||
                         (filter === 'pending' && patient.pendingReview) ||
                         (filter === 'high_risk' && patient.riskLevel === 'high');
    return matchesSearch && matchesFilter;
  });

  const renderPatientCard = ({ item }: { item: Patient }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('DoctorPatientDetail', { patientId: item.id })}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <View>
            <Text variant="titleMedium">{item.name}</Text>
            <Text variant="bodyMedium" style={styles.ashaText}>
              ASHA: {item.ashaWorker}
            </Text>
          </View>
          {item.pendingReview && (
            <Chip icon="clock" style={styles.pendingChip}>
              Review Needed
            </Chip>
          )}
        </View>
        
        <View style={styles.cardDetails}>
          <Chip icon="calendar">Trimester {item.trimester}</Chip>
          <Chip
            icon="alert-circle"
            style={{ backgroundColor: getRiskColor(item.riskLevel) + '20' }}
            textStyle={{ color: getRiskColor(item.riskLevel) }}
          >
            {item.riskLevel.toUpperCase()}
          </Chip>
          <Text variant="bodySmall" style={styles.updateText}>
            Updated: {item.lastUpdate}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search patients or ASHA workers"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          { value: 'all', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'high_risk', label: 'High Risk' },
        ]}
        style={styles.filterButtons}
      />

      <FlatList
        data={filteredPatients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  filterButtons: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ashaText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  pendingChip: {
    backgroundColor: colors.warning + '20',
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  updateText: {
    color: colors.textSecondary,
    marginLeft: 'auto',
  },
});

export default DoctorDashboardScreen;
