import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Chip, ProgressBar, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

interface DietPlan {
  lastUpdated: string;
  nextUpdate: string;
  trimester: number;
  weekNumber: number;
  recommendations: Array<{
    category: string;
    items: string[];
    importance: 'high' | 'medium' | 'low';
  }>;
  supplements: Array<{
    name: string;
    dosage: string;
    timing: string;
    withMeal: boolean;
  }>;
  restrictions: string[];
  mealPlan: {
    breakfast: string[];
    morningSnack: string[];
    lunch: string[];
    eveningSnack: string[];
    dinner: string[];
  };
  hydrationTarget: {
    target: number;
    current: number;
  };
}

const DietPlanScreen = () => {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | false>(false);

  useEffect(() => {
    loadDietPlan();
  }, []);

  const loadDietPlan = async () => {
    try {
      // TODO: Replace with actual API call
      setLoading(true);
      // Mock data
      setDietPlan({
        lastUpdated: '2025-04-10',
        nextUpdate: '2025-04-24',
        trimester: 2,
        weekNumber: 18,
        recommendations: [
          {
            category: 'Proteins',
            items: ['Lentils', 'Eggs', 'Lean meat', 'Greek yogurt'],
            importance: 'high',
          },
          {
            category: 'Iron-rich Foods',
            items: ['Spinach', 'Beetroot', 'Pomegranate', 'Dates'],
            importance: 'high',
          },
          {
            category: 'Calcium Sources',
            items: ['Milk', 'Cheese', 'Sesame seeds', 'Almonds'],
            importance: 'medium',
          },
        ],
        supplements: [
          {
            name: 'Iron + Folic Acid',
            dosage: '1 tablet',
            timing: 'Morning',
            withMeal: true,
          },
          {
            name: 'Calcium',
            dosage: '500mg',
            timing: 'Night',
            withMeal: true,
          },
          {
            name: 'Vitamin D3',
            dosage: '1 tablet',
            timing: 'Morning',
            withMeal: false,
          },
        ],
        restrictions: [
          'Avoid raw or undercooked eggs',
          'Limit caffeine intake',
          'Avoid unpasteurized dairy',
          'No alcohol',
        ],
        mealPlan: {
          breakfast: [
            'Oatmeal with milk and nuts',
            'Boiled eggs',
            'Fresh fruit',
          ],
          morningSnack: [
            'Greek yogurt',
            'Mixed seeds',
          ],
          lunch: [
            'Dal and rice',
            'Mixed vegetables',
            'Curd',
          ],
          eveningSnack: [
            'Fruit smoothie',
            'Whole grain crackers',
          ],
          dinner: [
            'Chapati with vegetables',
            'Lentil soup',
            'Salad',
          ],
        },
        hydrationTarget: {
          target: 8,
          current: 5,
        },
      });
    } catch (error) {
      console.error('Failed to load diet plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      default:
        return colors.success;
    }
  };

  if (!dietPlan) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View>
              <Text variant="titleMedium">Current Diet Plan</Text>
              <Text variant="bodySmall" style={styles.dateText}>
                Updated: {dietPlan.lastUpdated}
              </Text>
            </View>
            <Chip icon="calendar">Week {dietPlan.weekNumber}</Chip>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.hydrationSection}>
            <View style={styles.hydrationHeader}>
              <MaterialCommunityIcons name="water" size={24} color={colors.primary} />
              <Text variant="titleMedium" style={styles.hydrationTitle}>
                Daily Hydration
              </Text>
            </View>
            <ProgressBar
              progress={dietPlan.hydrationTarget.current / dietPlan.hydrationTarget.target}
              color={colors.primary}
              style={styles.hydrationProgress}
            />
            <Text variant="bodyMedium" style={styles.hydrationText}>
              {dietPlan.hydrationTarget.current} of {dietPlan.hydrationTarget.target} glasses
            </Text>
            <Button
              mode="contained-tonal"
              icon="plus"
              onPress={() => {}}
              style={styles.hydrationButton}
            >
              Add Glass
            </Button>
          </View>
        </Card.Content>
      </Card>

      <List.Section>
        <List.Accordion
          title="Meal Plan"
          left={props => <List.Icon {...props} icon="food-variant" />}
          expanded={expandedSection === 'meals'}
          onPress={() => setExpandedSection(expandedSection === 'meals' ? false : 'meals')}
          style={styles.accordion}
        >
          <Card style={styles.mealCard}>
            <Card.Content>
              <List.Item
                title="Breakfast"
                left={props => <List.Icon {...props} icon="weather-sunny" />}
                description={() => (
                  <View style={styles.mealItems}>
                    {dietPlan.mealPlan.breakfast.map((item, index) => (
                      <Text key={index} style={styles.mealItem}>• {item}</Text>
                    ))}
                  </View>
                )}
              />
              <List.Item
                title="Morning Snack"
                left={props => <List.Icon {...props} icon="food-apple" />}
                description={() => (
                  <View style={styles.mealItems}>
                    {dietPlan.mealPlan.morningSnack.map((item, index) => (
                      <Text key={index} style={styles.mealItem}>• {item}</Text>
                    ))}
                  </View>
                )}
              />
              <List.Item
                title="Lunch"
                left={props => <List.Icon {...props} icon="sun" />}
                description={() => (
                  <View style={styles.mealItems}>
                    {dietPlan.mealPlan.lunch.map((item, index) => (
                      <Text key={index} style={styles.mealItem}>• {item}</Text>
                    ))}
                  </View>
                )}
              />
              <List.Item
                title="Evening Snack"
                left={props => <List.Icon {...props} icon="food-croissant" />}
                description={() => (
                  <View style={styles.mealItems}>
                    {dietPlan.mealPlan.eveningSnack.map((item, index) => (
                      <Text key={index} style={styles.mealItem}>• {item}</Text>
                    ))}
                  </View>
                )}
              />
              <List.Item
                title="Dinner"
                left={props => <List.Icon {...props} icon="weather-night" />}
                description={() => (
                  <View style={styles.mealItems}>
                    {dietPlan.mealPlan.dinner.map((item, index) => (
                      <Text key={index} style={styles.mealItem}>• {item}</Text>
                    ))}
                  </View>
                )}
              />
            </Card.Content>
          </Card>
        </List.Accordion>

        <List.Accordion
          title="Recommended Foods"
          left={props => <List.Icon {...props} icon="food-apple-outline" />}
          expanded={expandedSection === 'recommendations'}
          onPress={() => setExpandedSection(expandedSection === 'recommendations' ? false : 'recommendations')}
          style={styles.accordion}
        >
          {dietPlan.recommendations.map((rec, index) => (
            <Card key={index} style={styles.recommendationCard}>
              <Card.Content>
                <View style={styles.recommendationHeader}>
                  <Text variant="titleSmall">{rec.category}</Text>
                  <Chip
                    style={{ backgroundColor: getImportanceColor(rec.importance) + '20' }}
                    textStyle={{ color: getImportanceColor(rec.importance) }}
                  >
                    {rec.importance.toUpperCase()}
                  </Chip>
                </View>
                <View style={styles.recommendationItems}>
                  {rec.items.map((item, idx) => (
                    <Text key={idx} style={styles.recommendationItem}>• {item}</Text>
                  ))}
                </View>
              </Card.Content>
            </Card>
          ))}
        </List.Accordion>

        <List.Accordion
          title="Supplements"
          left={props => <List.Icon {...props} icon="pill" />}
          expanded={expandedSection === 'supplements'}
          onPress={() => setExpandedSection(expandedSection === 'supplements' ? false : 'supplements')}
          style={styles.accordion}
        >
          {dietPlan.supplements.map((supplement, index) => (
            <Card key={index} style={styles.supplementCard}>
              <Card.Content>
                <View style={styles.supplementHeader}>
                  <Text variant="titleSmall">{supplement.name}</Text>
                  <Chip icon={supplement.withMeal ? 'food' : 'food-off'}>
                    {supplement.withMeal ? 'With meal' : 'Empty stomach'}
                  </Chip>
                </View>
                <View style={styles.supplementDetails}>
                  <Text variant="bodyMedium">Dosage: {supplement.dosage}</Text>
                  <Text variant="bodyMedium">Timing: {supplement.timing}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </List.Accordion>

        <List.Accordion
          title="Restrictions"
          left={props => <List.Icon {...props} icon="food-off" />}
          expanded={expandedSection === 'restrictions'}
          onPress={() => setExpandedSection(expandedSection === 'restrictions' ? false : 'restrictions')}
          style={styles.accordion}
        >
          <Card style={styles.restrictionsCard}>
            <Card.Content>
              {dietPlan.restrictions.map((restriction, index) => (
                <View key={index} style={styles.restrictionItem}>
                  <MaterialCommunityIcons name="close-circle" size={20} color={colors.error} />
                  <Text variant="bodyMedium" style={styles.restrictionText}>
                    {restriction}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        </List.Accordion>
      </List.Section>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  hydrationSection: {
    alignItems: 'center',
    padding: 8,
  },
  hydrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hydrationTitle: {
    marginLeft: 8,
    color: colors.primary,
  },
  hydrationProgress: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    marginBottom: 8,
  },
  hydrationText: {
    marginBottom: 16,
  },
  hydrationButton: {
    width: '50%',
  },
  accordion: {
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  mealCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  mealItems: {
    marginTop: 8,
  },
  mealItem: {
    marginBottom: 4,
  },
  recommendationCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationItems: {
    marginLeft: 8,
  },
  recommendationItem: {
    marginBottom: 4,
  },
  supplementCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  supplementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  supplementDetails: {
    marginLeft: 8,
  },
  restrictionsCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  restrictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  restrictionText: {
    marginLeft: 8,
    flex: 1,
  },
});

export default DietPlanScreen;
