import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Chip, Portal, Modal, List } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../styles/theme';

interface DietPlanFormData {
  recommendations: string[];
  supplements: string[];
  restrictions: string[];
  notes: string;
}

const EditDietPlanScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  // State for managing lists
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [supplements, setSupplements] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  
  // State for new items
  const [newRecommendation, setNewRecommendation] = useState('');
  const [newSupplement, setNewSupplement] = useState('');
  const [newRestriction, setNewRestriction] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<DietPlanFormData>();

  const addItem = (list: string[], setList: (items: string[]) => void, newItem: string, setNewItem: (value: string) => void) => {
    if (newItem.trim()) {
      setList([...list, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (list: string[], setList: (items: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: DietPlanFormData) => {
    try {
      setLoading(true);
      // TODO: Implement API call to update diet plan
      const dietPlan = {
        ...data,
        recommendations,
        supplements,
        restrictions,
        patientId,
      };
      console.log('Updating diet plan:', dietPlan);
      setShowConfirm(true);
    } catch (error) {
      console.error('Failed to update diet plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderConfirmationModal = () => (
    <Portal>
      <Modal
        visible={showConfirm}
        onDismiss={() => {
          setShowConfirm(false);
          navigation.goBack();
        }}
        contentContainerStyle={styles.modalContainer}
      >
        <Text variant="headlineSmall" style={styles.modalTitle}>
          Diet Plan Updated
        </Text>
        <Text variant="bodyMedium" style={styles.modalText}>
          The patient's diet plan has been successfully updated.
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            setShowConfirm(false);
            navigation.goBack();
          }}
          style={styles.modalButton}
        >
          Done
        </Button>
      </Modal>
    </Portal>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text variant="titleLarge" style={styles.title}>Update Diet Plan</Text>

        <List.Accordion
          title="Diet Recommendations"
          left={props => <List.Icon {...props} icon="food-apple" />}
          style={styles.accordion}
        >
          <View style={styles.accordionContent}>
            <TextInput
              mode="outlined"
              label="Add Recommendation"
              value={newRecommendation}
              onChangeText={setNewRecommendation}
              right={
                <TextInput.Icon
                  icon="plus"
                  onPress={() => addItem(recommendations, setRecommendations, newRecommendation, setNewRecommendation)}
                />
              }
              style={styles.input}
            />
            <View style={styles.chipContainer}>
              {recommendations.map((item, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(recommendations, setRecommendations, index)}
                  style={styles.chip}
                >
                  {item}
                </Chip>
              ))}
            </View>
          </View>
        </List.Accordion>

        <List.Accordion
          title="Supplements"
          left={props => <List.Icon {...props} icon="pill" />}
          style={styles.accordion}
        >
          <View style={styles.accordionContent}>
            <TextInput
              mode="outlined"
              label="Add Supplement"
              value={newSupplement}
              onChangeText={setNewSupplement}
              right={
                <TextInput.Icon
                  icon="plus"
                  onPress={() => addItem(supplements, setSupplements, newSupplement, setNewSupplement)}
                />
              }
              style={styles.input}
            />
            <View style={styles.chipContainer}>
              {supplements.map((item, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(supplements, setSupplements, index)}
                  style={styles.chip}
                >
                  {item}
                </Chip>
              ))}
            </View>
          </View>
        </List.Accordion>

        <List.Accordion
          title="Dietary Restrictions"
          left={props => <List.Icon {...props} icon="food-off" />}
          style={styles.accordion}
        >
          <View style={styles.accordionContent}>
            <TextInput
              mode="outlined"
              label="Add Restriction"
              value={newRestriction}
              onChangeText={setNewRestriction}
              right={
                <TextInput.Icon
                  icon="plus"
                  onPress={() => addItem(restrictions, setRestrictions, newRestriction, setNewRestriction)}
                />
              }
              style={styles.input}
            />
            <View style={styles.chipContainer}>
              {restrictions.map((item, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(restrictions, setRestrictions, index)}
                  style={[styles.chip, styles.restrictionChip]}
                >
                  {item}
                </Chip>
              ))}
            </View>
          </View>
        </List.Accordion>

        <Text variant="titleMedium" style={styles.sectionTitle}>Additional Notes</Text>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              style={styles.input}
            />
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.button}
        >
          Update Diet Plan
        </Button>
      </View>
      {renderConfirmationModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    color: colors.primary,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
    color: colors.secondary,
  },
  accordion: {
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.primary + '20',
  },
  restrictionChip: {
    backgroundColor: colors.error + '20',
  },
  button: {
    marginTop: 24,
    paddingVertical: 6,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 16,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    marginTop: 8,
  },
});

export default EditDietPlanScreen;
