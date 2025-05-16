import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { colors } from '../../styles/theme';

interface DietPlanProps {
  route: {
    params: {
      patientId: string;
      patientName: string;
      trimester: string;
    };
  };
}

const DietPlanScreen: React.FC<DietPlanProps> = ({ route }) => {
  const { patientName, trimester } = route.params;

  const getDietRecommendations = (trimester: string) => {
    switch (trimester) {
      case '1':
        return [
          'Small, frequent meals to manage morning sickness',
          'Folic acid-rich foods (leafy greens, fortified cereals)',
          'Iron-rich foods (lean meats, beans)',
          'Fresh fruits and vegetables',
          'Stay hydrated with water and fresh juices',
        ];
      case '2':
        return [
          'Calcium-rich foods (dairy, leafy greens)',
          'Protein (lean meats, eggs, legumes)',
          'Omega-3 fatty acids (fish, nuts)',
          'Whole grains and fiber',
          'Vitamin C rich fruits',
        ];
      case '3':
        return [
          'High-fiber foods to prevent constipation',
          'Iron-rich foods for blood volume',
          'Protein for baby\'s growth',
          'Healthy fats (avocados, olive oil)',
          'Limited portion sizes to manage heartburn',
        ];
      default:
        return ['Please consult with your healthcare provider for personalized diet recommendations.'];
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.name}>{patientName}</Text>
          <Text variant="titleMedium" style={styles.subtitle}>Trimester {trimester}</Text>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Recommended Diet Plan
        </Text>
        {getDietRecommendations(trimester).map((item, index) => (
          <Card key={index} style={styles.recommendationCard}>
            <Card.Content>
              <Text variant="bodyLarge">• {item}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.note}>
          Note: This is a general diet plan. Please consult with your healthcare provider
          for personalized recommendations based on your specific needs.
        </Text>
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
    elevation: 2,
  },
  name: {
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.primary,
    marginBottom: 16,
  },
  recommendationCard: {
    marginBottom: 12,
    elevation: 1,
  },
  note: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});

export default DietPlanScreen;
