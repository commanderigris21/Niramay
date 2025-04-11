import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  TextInput,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import styles from './Diet.styles';
import Header from './Header';
import Navigation from './Navigation';

const Diet = ({ navigation, route }) => {
  const { patientId } = route.params || {};
  const { t } = useTranslation();

  const [dietData, setDietData] = useState({
    mealsPerDay: '',
    greenLeafyVegetables: '',
    fruits: '',
    dairyProducts: '',
    pulses: '',
    nonVeg: '',
    packagedFood: '',
    ironRichFood: '',
    ifaTablets: '',
    stapleFood: '',
    oilUsed: '',
    glassesOfWater: '',
    teaCoffeeIntake: '',
    foodBudget: '',
    foodsNotConsumed: 'no',
    foodsNotConsumedList: '',
    region: ''
  });

  const handleSubmit = () => {
    console.log('Diet Data:', dietData);
    // Navigate back to patient card
    if (patientId) {
      navigation.navigate('PatientCard', { patientId });
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const handleReset = () => {
    setDietData({
      mealsPerDay: '',
      greenLeafyVegetables: '',
      fruits: '',
      dairyProducts: '',
      pulses: '',
      nonVeg: '',
      packagedFood: '',
      ironRichFood: '',
      ifaTablets: '',
      stapleFood: '',
      oilUsed: '',
      glassesOfWater: '',
      teaCoffeeIntake: '',
      foodBudget: '',
      foodsNotConsumed: 'no',
      foodsNotConsumedList: '',
      region: ''
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={t('diet.title')} 
        navigation={navigation} 
        showBackButton={true} 
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        {/* Diet assessment form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{t('diet.dietaryIntake')}</Text>
          
          {/* Meals per day */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.mealsPerDay')}</Text>
            <Picker
              selectedValue={dietData.mealsPerDay}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, mealsPerDay: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.mealsPerDayOptions.one')} value="one" />
              <Picker.Item label={t('diet.mealsPerDayOptions.two')} value="two" />
              <Picker.Item label={t('diet.mealsPerDayOptions.three')} value="three" />
              <Picker.Item label={t('diet.mealsPerDayOptions.moreThanThree')} value="moreThanThree" />
            </Picker>
          </View>

          <Text style={styles.subSectionTitle}>{t('diet.frequencyTitle')}</Text>
          
          {/* Green leafy vegetables */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.greenLeafyVegetables')}</Text>
            <Picker
              selectedValue={dietData.greenLeafyVegetables}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, greenLeafyVegetables: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.never')} value="never" />
              <Picker.Item label={t('diet.frequencyOptions.occasionally')} value="occasionally" />
              <Picker.Item label={t('diet.frequencyOptions.daily')} value="daily" />
            </Picker>
          </View>

          {/* Fruits */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.fruits')}</Text>
            <Picker
              selectedValue={dietData.fruits}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, fruits: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.never')} value="never" />
              <Picker.Item label={t('diet.frequencyOptions.occasionally')} value="occasionally" />
              <Picker.Item label={t('diet.frequencyOptions.daily')} value="daily" />
            </Picker>
          </View>

          {/* Dairy products */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.dairyProducts')}</Text>
            <Picker
              selectedValue={dietData.dairyProducts}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, dairyProducts: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.never')} value="never" />
              <Picker.Item label={t('diet.frequencyOptions.occasionally')} value="occasionally" />
              <Picker.Item label={t('diet.frequencyOptions.daily')} value="daily" />
            </Picker>
          </View>

          {/* Pulses / Dals */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.pulses')}</Text>
            <Picker
              selectedValue={dietData.pulses}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, pulses: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.never')} value="never" />
              <Picker.Item label={t('diet.frequencyOptions.occasionally')} value="occasionally" />
              <Picker.Item label={t('diet.frequencyOptions.daily')} value="daily" />
            </Picker>
          </View>

          {/* Non-veg */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.nonVeg')}</Text>
            <Picker
              selectedValue={dietData.nonVeg}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, nonVeg: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.yes')} value="yes" />
              <Picker.Item label={t('diet.frequencyOptions.no')} value="no" />
              <Picker.Item label={t('diet.frequencyOptions.weekly')} value="weekly" />
            </Picker>
          </View>

          {/* Packaged or fried food */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.packagedFood')}</Text>
            <Picker
              selectedValue={dietData.packagedFood}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, packagedFood: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.rare')} value="rare" />
              <Picker.Item label={t('diet.frequencyOptions.frequent')} value="frequent" />
            </Picker>
          </View>

          <Text style={styles.sectionTitle}>{t('diet.micronutrientTitle')}</Text>

          {/* Iron-rich food */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.ironRichFood')}</Text>
            <Picker
              selectedValue={dietData.ironRichFood}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, ironRichFood: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.yes')} value="yes" />
              <Picker.Item label={t('diet.frequencyOptions.no')} value="no" />
              <Picker.Item label={t('diet.frequencyOptions.dontKnow')} value="dontKnow" />
            </Picker>
          </View>

          {/* IFA tablets */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.ifaTablets')}</Text>
            <Picker
              selectedValue={dietData.ifaTablets}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, ifaTablets: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.frequencyOptions.yes')} value="yes" />
              <Picker.Item label={t('diet.frequencyOptions.no')} value="no" />
              <Picker.Item label={t('diet.frequencyOptions.sometimes')} value="sometimes" />
            </Picker>
          </View>

          <Text style={styles.sectionTitle}>{t('diet.quantityTitle')}</Text>

          {/* Staple food */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.stapleFood')}</Text>
            <Picker
              selectedValue={dietData.stapleFood}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, stapleFood: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.servingSizes.small')} value="small" />
              <Picker.Item label={t('diet.servingSizes.medium')} value="medium" />
              <Picker.Item label={t('diet.servingSizes.large')} value="large" />
            </Picker>
          </View>

          {/* Oil used */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.oilUsed')}</Text>
            <Picker
              selectedValue={dietData.oilUsed}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, oilUsed: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.oilOptions.none')} value="none" />
              <Picker.Item label={t('diet.oilOptions.lessThanTwo')} value="lessThanTwo" />
              <Picker.Item label={t('diet.oilOptions.moreThanTwo')} value="moreThanTwo" />
            </Picker>
          </View>

          <Text style={styles.sectionTitle}>{t('diet.waterFluidsTitle')}</Text>

          {/* Glasses of water */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.glassesOfWater')}</Text>
            <Picker
              selectedValue={dietData.glassesOfWater}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, glassesOfWater: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.waterOptions.lessThanFour')} value="lessThanFour" />
              <Picker.Item label={t('diet.waterOptions.fourToSix')} value="fourToSix" />
              <Picker.Item label={t('diet.waterOptions.moreThanSix')} value="moreThanSix" />
            </Picker>
          </View>

          {/* Tea/coffee intake */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.teaCoffeeIntake')}</Text>
            <Picker
              selectedValue={dietData.teaCoffeeIntake}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, teaCoffeeIntake: value})}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label={t('diet.teaCoffeeOptions.none')} value="none" />
              <Picker.Item label={t('diet.teaCoffeeOptions.oneToTwo')} value="oneToTwo" />
              <Picker.Item label={t('diet.teaCoffeeOptions.frequently')} value="frequently" />
            </Picker>
          </View>

          <Text style={styles.sectionTitle}>{t('diet.affordabilityTitle')}</Text>

          {/* Food budget */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.foodBudget')}</Text>
            <TextInput
              style={styles.input}
              value={dietData.foodBudget}
              onChangeText={(text) => setDietData({...dietData, foodBudget: text})}
              keyboardType="numeric"
            />
          </View>

          {/* Foods not consumed */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.foodsNotConsumed')}</Text>
            <Picker
              selectedValue={dietData.foodsNotConsumed}
              style={styles.picker}
              onValueChange={(value) => setDietData({...dietData, foodsNotConsumed: value})}
            >
              <Picker.Item label={t('diet.frequencyOptions.yes')} value="yes" />
              <Picker.Item label={t('diet.frequencyOptions.no')} value="no" />
            </Picker>
          </View>

          {/* Foods not consumed list */}
          {dietData.foodsNotConsumed === 'yes' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('diet.ifYesSpecify')}</Text>
              <TextInput
                style={styles.input}
                value={dietData.foodsNotConsumedList}
                onChangeText={(text) => setDietData({...dietData, foodsNotConsumedList: text})}
              />
            </View>
          )}

          <Text style={styles.sectionTitle}>{t('diet.regionTitle')}</Text>

          {/* Region */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('diet.stateDistrict')}</Text>
            <TextInput
              style={styles.input}
              value={dietData.region}
              onChangeText={(text) => setDietData({...dietData, region: text})}
            />
          </View>

          {/* Submit and Reset buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{t('diet.submit')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>{t('diet.reset')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Navigation navigation={navigation} activeScreen="PatientsList" />
    </SafeAreaView>
  );
};

export default Diet;