import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, Chip, Portal, Modal } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../styles/theme';

interface DiagnosisFormData {
  riskLevel: 'low' | 'medium' | 'high';
  conditions: string[];
  notes: string;
}

const EditDiagnosisScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<DiagnosisFormData>({
    defaultValues: {
      riskLevel: 'low',
      conditions: [],
      notes: '',
    },
  });

  const addCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: DiagnosisFormData) => {
    try {
      setLoading(true);
      // TODO: Implement API call to update diagnosis
      console.log('Updating diagnosis:', {
        ...data,
        conditions,
        patientId,
      });
      setShowConfirm(true);
    } catch (error) {
      console.error('Failed to update diagnosis:', error);
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
          Diagnosis Updated
        </Text>
        <Text variant="bodyMedium" style={styles.modalText}>
          The patient's diagnosis has been successfully updated.
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
        <Text variant="titleLarge" style={styles.title}>Update Diagnosis</Text>

        <Text variant="titleMedium" style={styles.sectionTitle}>Risk Level</Text>
        <Controller
          control={control}
          name="riskLevel"
          rules={{ required: 'Risk level is required' }}
          render={({ field: { onChange, value } }) => (
            <SegmentedButtons
              value={value}
              onValueChange={onChange}
              buttons={[
                {
                  value: 'low',
                  label: 'Low',
                  style: { backgroundColor: value === 'low' ? colors.success + '20' : undefined },
                },
                {
                  value: 'medium',
                  label: 'Medium',
                  style: { backgroundColor: value === 'medium' ? colors.warning + '20' : undefined },
                },
                {
                  value: 'high',
                  label: 'High',
                  style: { backgroundColor: value === 'high' ? colors.error + '20' : undefined },
                },
              ]}
              style={styles.segmentedButton}
            />
          )}
        />

        <Text variant="titleMedium" style={styles.sectionTitle}>Medical Conditions</Text>
        <View style={styles.conditionInput}>
          <TextInput
            mode="outlined"
            label="Add Condition"
            value={newCondition}
            onChangeText={setNewCondition}
            right={
              <TextInput.Icon
                icon="plus"
                onPress={addCondition}
              />
            }
            style={styles.input}
          />
        </View>

        <View style={styles.conditionsList}>
          {conditions.map((condition, index) => (
            <Chip
              key={index}
              onClose={() => removeCondition(index)}
              style={styles.conditionChip}
            >
              {condition}
            </Chip>
          ))}
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>Notes</Text>
        <Controller
          control={control}
          name="notes"
          rules={{ required: 'Notes are required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              error={!!errors.notes}
              style={styles.input}
            />
          )}
        />
        {errors.notes && (
          <Text style={styles.errorText}>{errors.notes.message}</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.button}
        >
          Update Diagnosis
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
  input: {
    marginBottom: 16,
  },
  segmentedButton: {
    marginBottom: 16,
  },
  conditionInput: {
    marginBottom: 8,
  },
  conditionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  conditionChip: {
    backgroundColor: colors.primary + '20',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 8,
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

export default EditDiagnosisScreen;
