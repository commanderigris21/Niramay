import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, Searchbar, FAB, Chip, SegmentedButtons, IconButton } from 'react-native-paper';
import { colors } from '../../styles/theme';

// Sample data to use instead of context
const initialPatients = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 25,
    phone: '9876543210',
    address: 'Village Amravati, Maharashtra',
    trimester: 2,
    riskLevel: 'medium',
  },
  {
    id: '2',
    name: 'Meera Patel',
    age: 28,
    phone: '8765432109',
    address: 'Nagpur, Maharashtra',
    riskLevel: 'low',
  },
  {
    id: '3',
    name: 'Anjali Desai',
    age: 22,
    phone: '7654321098',
    address: 'Pune, Maharashtra',
    riskLevel: 'high',
  }
];

// Create a global variable to store patients that persists between renders
if (!global.patients) {
  global.patients = [...initialPatients];
}

const DashboardScreen = ({ navigation, route }) => {
  // Use the global patients array
  const [patients, setPatients] = useState(global.patients);
  const [searchQuery, setSearchQuery] = useState('');
  // Add a new state for risk filter
  const [riskFilter, setRiskFilter] = useState('all');

  // Check if we're coming back from adding a patient
  useEffect(() => {
    if (route.params?.newPatient) {
      // Add the new patient to our global array
      global.patients.push(route.params.newPatient);
      // Update state to trigger re-render
      setPatients([...global.patients]);
      // Clear the params to avoid duplicate additions
      navigation.setParams({ newPatient: null });
    }
  }, [route.params?.newPatient]);

  // Update the filtered patients to include risk filtering
  const filteredPatients = patients.filter(patient => {
    // First apply the search filter
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);
    
    // Then apply the risk filter if it's not 'all'
    const matchesRisk = riskFilter === 'all' || patient.riskLevel === riskFilter;
    
    // Return true only if both conditions are met
    return matchesSearch && matchesRisk;
  });

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

  const renderPatientCard = ({ item }) => (
    <Card 
      style={styles.patientCard}
      onPress={() => navigation.navigate('PatientDetail', { patientId: item.id })}
    >
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <View style={styles.patientInfo}>
          <Text variant="bodyMedium">{item.age} years</Text>
          <Text variant="bodyMedium">{item.phone}</Text>
          <Chip 
            style={{ backgroundColor: getRiskColor(item.riskLevel) + '20' }}
            textStyle={{ color: getRiskColor(item.riskLevel) }}
          >
            {item.riskLevel.toUpperCase()}
          </Chip>
        </View>
        <Text variant="bodySmall" style={styles.address}>{item.address}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>ASHA Dashboard</Text>
      
      <Searchbar
        placeholder="Search patients..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      {/* Add risk filter below search bar */}
      <View style={styles.filterContainer}>
        <Text variant="bodyMedium" style={styles.filterLabel}>Filter by Risk:</Text>
        <SegmentedButtons
          value={riskFilter}
          onValueChange={setRiskFilter}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          style={styles.riskFilter}
        />
      </View>
      
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Patients ({filteredPatients.length})
      </Text>
      
      <FlatList
        data={filteredPatients}
        renderItem={renderPatientCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.patientList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text>No patients found</Text>
          </View>
        }
      />
      
      {/* Add a Floating Action Button (FAB) for adding new patients */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Add Patient')}
        color={colors.onPrimary}
      />
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    color: colors.primary,
  },
  searchBar: {
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    marginBottom: 8,
  },
  riskFilter: {
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    marginBottom: 12,
    color: colors.secondary,
  },
  patientList: {
    paddingBottom: 80, // Space for FAB
  },
  patientCard: {
    marginBottom: 12,
  },
  patientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 4,
  },
  address: {
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default DashboardScreen;
