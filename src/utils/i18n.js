import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  common: {
    appName: 'Niramay',
    selectLanguage: 'Select Language',
    english: 'English',
    hindi: 'Hindi',
    continue: 'Continue',
    back: 'Back',
    home: 'Home',
    patients: 'Patients',
    profile: 'Profile',
    login: 'Login',
    signUp: 'Sign Up',
    logout: 'Logout',
    anc: 'ANC',
  },
  languageSelection: {
    title: 'Choose Your Language',
    subtitle: 'Please select your preferred language',
  },
  login: {
    username: 'Username',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    createAccount: 'Create Account',
    loginToAccount: 'Login to your account',
    termsAgreement: 'By continuing, you agree to our Terms of Service and Privacy Policy',
  },
  patientData: {
    patientName: 'Sarah Johnson',
    patient1: 'Sarah Johnson',
    patient2: 'Emily Davis',
    patient3: 'Lisa Wong',
    condition1: 'Severe Anemia (Diagnosed: Jan 2025)',
    condition2: 'Gestational Diabetes (Week 24)'
  },
  profile: {
    myProfile: 'My Profile',
    ashaWorkerName: 'Asha Worker',
    ashaWorker: 'ASHA Worker',
    region: 'Mumbai Central',
    personalInformation: 'Personal Information',
    ashaId: 'ASHA ID',
    mobileNumber: 'Mobile Number',
    pincode: 'Pincode',
    joinedDate: 'Joined Date',
    activityStatistics: 'Activity Statistics',
    surveysCompleted: 'Surveys Completed',
    patientsRegistered: 'Patients Registered',
    logout: 'Logout',
    logoutConfirmation: 'Are you sure you want to logout?',
    cancel: 'Cancel'
  },
  dashboard: {
    dashboardTitle: 'Niramay Dashboard',
    welcome: 'Welcome',
    totalPatients: 'Total Patients',
    criticalCases: 'Critical Cases',
    pendingSurveys: 'Pending Surveys',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
    today: 'Today',
    critical: 'Critical',
    highRisk: 'High Risk',
    pending: 'Pending',
    surveysDueToday: 'Surveys Due Today',
    quickActions: 'Quick Actions',
    addPatient: 'Add Patient',
    surveyCompleted: 'Survey completed',
    surveyPending: 'Survey pending',
    noRecentActivity: 'No recent activity',
    timeAgo: {
      hours: '{{hours}}h ago',
      days: '{{days}}d ago'
    }
  },
  patientDetails: {
    patientDetails: 'Patient Details',
    age: 'Age',
    bloodGroup: 'Blood Group',
    lastVisit: 'Last Visit',
    currentConditions: 'Current Conditions',
    recentVitals: 'Recent Vitals',
    bloodPressure: 'Blood Pressure',
    hemoglobin: 'Hemoglobin',
    weight: 'Weight',
    glucose: 'Glucose',
    emergencyAmbulance: 'Emergency Ambulance',
    viewMedicalHistory: 'View Full Medical History',
    primarySurvey: 'Primary Survey',
    secondarySurvey: 'Secondary Survey',
    diet: 'Diet',
  },
  patientsList: {
    title: 'Niramay Patients',
    searchPlaceholder: 'Search patients...',
    id: 'ID',
    riskLevels: {
      highrisk: 'High Risk',
      mediumrisk: 'Medium Risk',
      lowrisk: 'Low Risk'
    },
    nextVisit: 'Next Visit',
    visitTimes: {
      today: 'Today',
      tomorrow: 'Tomorrow',
      nextweek: 'Next Week',
      notscheduled: 'Not Scheduled'
    },
    surveyStatus: {
      complete: 'Survey Complete',
      due: 'Survey Due'
    }
  },
  register: {
    title: 'Niramay Patient Registration',
    personalInfo: 'Personal Information',
    avatarPreview: 'Avatar Preview',
    fullName: 'Full Name',
    enterFullName: "Enter patient's full name",
    age: 'Age',
    enterAge: 'Enter age',
    phoneNumber: 'Phone Number',
    enterPhoneNumber: 'Enter phone number',
    medicalInfo: 'Medical Information',
    bloodGroup: 'Blood Group',
    selectBloodGroup: 'Select blood group',
    medicalHistory: 'Medical History',
    enterMedicalHistory: 'Enter relevant medical history',
    address: 'Address',
    enterAddress: 'Enter address',
    trimester: 'Trimester',
    selectTrimester: 'Select trimester',
    firstTrimester: '1st Trimester',
    secondTrimester: '2nd Trimester',
    thirdTrimester: '3rd Trimester',
    photo: 'Photo',
    takePhoto: 'Take Photo',
    selectFromGallery: 'Select from Gallery',
    registerPatient: 'Register Patient',
    viewPatientCard: 'View Patient Card',
    cameraPermissionTitle: 'Camera Permission',
    cameraPermissionMessage: 'App needs access to your camera to take patient photos',
    askMeLater: 'Ask Me Later',
    cancel: 'Cancel',
    ok: 'OK',
    permissionDenied: 'Permission Denied',
    cameraPermissionRequired: 'Camera permission is required to take photos',
  },
  emergency: {
    title: 'Niramay Emergency Referral',
    patientId: 'Patient ID',
    nearestPHC: 'Nearest PHC',
    distanceAway: '{{distance}} km away',
    cityPHC: 'City Primary Health Center',
    cityPHCAddress: '123 Healthcare Avenue, City Area',
    callPHC: 'Call PHC',
    getDirections: 'Get Directions',
    districtHospital: 'District Hospital',
    districtGeneralHospital: 'District General Hospital',
    districtHospitalAddress: '456 Hospital Road, District Area',
    call: 'Call',
    directions: 'Directions',
    ruralHealthCenter: 'Rural Health Center',
    villagePHC: 'Village Primary Health Center',
    villagePHCAddress: '789 Rural Road, Village Area',
    bookAmbulance: 'Book 108 Ambulance',
    ambulanceNotified: 'Ambulance service has been notified!'
  },
  primarySurvey: {
    title: 'Primary Survey',
    patientAssessment: 'Patient Assessment',
  },
  secondarySurvey: {
    title: 'Secondary Survey',
    detailedAssessment: 'Detailed Assessment',
  },
  diet: {
    title: 'Diet Analyzer',
    dietaryInformation: 'Dietary Information',
    dietaryIntake: 'Dietary Intake Pattern (Past 3 days or week)',
    mealsPerDay: 'Number of meals per day',
    mealsPerDayOptions: {
      one: '1 meal',
      two: '2 meals',
      three: '3 meals',
      moreThanThree: 'More than 3 meals'
    },
    frequencyTitle: 'Frequency of:',
    greenLeafyVegetables: 'Green leafy vegetables',
    fruits: 'Fruits',
    dairyProducts: 'Milk or dairy products',
    pulses: 'Pulses / Dals',
    nonVeg: 'Non-veg (Eggs / Fish / Meat)',
    packagedFood: 'Packaged or fried food',
    frequencyOptions: {
      never: 'Never',
      occasionally: 'Occasionally',
      daily: 'Daily',
      yes: 'Yes',
      no: 'No',
      weekly: 'Weekly',
      rare: 'Rare',
      frequent: 'Frequent',
      sometimes: 'Sometimes',
      dontKnow: 'Don\'t know'
    },
    micronutrientTitle: 'Micronutrient Awareness',
    ironRichFood: 'Iron-rich food consumed?',
    ifaTablets: 'IFA tablets taken?',
    quantityTitle: 'Quantity Estimation (approx.)',
    stapleFood: 'Rice/Bajra/Chapati',
    servingSizes: {
      small: 'Small servings',
      medium: 'Medium servings',
      large: 'Large servings'
    },
    oilUsed: 'Oil used daily',
    oilOptions: {
      none: 'None',
      lessThanTwo: 'Less than 2 tbsp',
      moreThanTwo: 'More than 2 tbsp'
    },
    waterFluidsTitle: 'Water & Fluids',
    glassesOfWater: 'Glasses of water per day',
    waterOptions: {
      lessThanFour: 'Less than 4',
      fourToSix: '4-6 glasses',
      moreThanSix: 'More than 6'
    },
    teaCoffeeIntake: 'Intake of tea/coffee',
    teaCoffeeOptions: {
      none: 'None',
      oneToTwo: '1-2 times',
      frequently: 'Frequently'
    },
    affordabilityTitle: 'Affordability Constraints',
    foodBudget: 'Monthly food budget range (optional)',
    foodsNotConsumed: 'Any foods not consumed due to cost?',
    ifYesSpecify: 'If yes, please specify (e.g., milk, fruits)',
    regionTitle: 'Region',
    stateDistrict: 'State/District',
    submit: 'Submit Diet Analysis',
    reset: 'Reset Form'
  },
};

// Hindi translations
const hiTranslations = {
  common: {
    appName: 'निरामय',
    selectLanguage: 'भाषा चुनें',
    english: 'अंग्रेज़ी',
    hindi: 'हिंदी',
    continue: 'जारी रखें',
    back: 'वापस',
    home: 'होम',
    patients: 'मरीज़',
    profile: 'प्रोफाइल',
    login: 'लॉगिन',
    signUp: 'साइन अप',
    logout: 'लॉगआउट',
    anc: 'एएनसी',
  },
  languageSelection: {
    title: 'अपनी भाषा चुनें',
    subtitle: 'कृपया अपनी पसंदीदा भाषा चुनें',
  },
  login: {
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    createAccount: 'खाता बनाएं',
    loginToAccount: 'अपने खाते में लॉगिन करें',
    termsAgreement: 'जारी रखकर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं',
  },
  patientData: {
    patientName: 'सारा जॉनसन',
    patient1: 'सारा जॉनसन',
    patient2: 'एमिली डेविस',
    patient3: 'लिसा वोंग',
    condition1: 'गंभीर एनीमिया (निदान: जनवरी 2025)',
    condition2: 'गर्भकालीन मधुमेह (सप्ताह 24)'
  },
  profile: {
    myProfile: 'मेरा प्रोफाइल',
    ashaWorkerName: 'आशा वर्कर',
    ashaWorker: 'आशा वर्कर',
    region: 'मुंबई सेंट्रल',
    personalInformation: 'व्यक्तिगत जानकारी',
    ashaId: 'आशा आईडी',
    mobileNumber: 'मोबाइल नंबर',
    pincode: 'पिनकोड',
    joinedDate: 'ज्वाइन की तारीख',
    activityStatistics: 'गतिविधि आंकड़े',
    surveysCompleted: 'सर्वेक्षण पूरे',
    patientsRegistered: 'मरीज़ पंजीकृत',
    logout: 'लॉगआउट',
    logoutConfirmation: 'क्या आप लॉगआउट करना चाहते हैं?',
    cancel: 'रद्द करें'
  },
  dashboard: {
    dashboardTitle: 'निरामय डैशबोर्ड',
    welcome: 'स्वागत है',
    totalPatients: 'कुल मरीज़',
    criticalCases: 'गंभीर मामले',
    pendingSurveys: 'लंबित सर्वेक्षण',
    recentActivity: 'हाल की गतिविधि',
    viewAll: 'सभी देखें',
    today: 'आज',
    critical: 'गंभीर',
    highRisk: 'उच्च जोखिम',
    pending: 'लंबित',
    surveysDueToday: 'आज देय सर्वेक्षण',
    quickActions: 'त्वरित कार्य',
    addPatient: 'रोगी जोड़ें',
    surveyCompleted: 'सर्वेक्षण पूरा हुआ',
    surveyPending: 'सर्वेक्षण लंबित',
    noRecentActivity: 'कोई हालिया गतिविधि नहीं',
    timeAgo: {
      hours: '{{hours}} घंटे पहले',
      days: '{{days}} दिन पहले'
    }
  },
  patientDetails: {
    patientDetails: 'मरीज का विवरण',
    age: 'उम्र',
    bloodGroup: 'रक्त समूह',
    lastVisit: 'अंतिम विजिट',
    currentConditions: 'वर्तमान स्थिति',
    recentVitals: 'हाल के महत्वपूर्ण अंक',
    bloodPressure: 'रक्तचाप',
    hemoglobin: 'हीमोग्लोबिन',
    weight: 'वजन',
    glucose: 'ग्लूकोज',
    emergencyAmbulance: 'आपातकालीन एम्बुलेंस',
    viewMedicalHistory: 'पूरा चिकित्सा इतिहास देखें',
    primarySurvey: 'प्राथमिक सर्वेक्षण',
    secondarySurvey: 'माध्यमिक सर्वेक्षण',
    diet: 'आहार',
  },
  patientsList: {
    title: 'निरामय मरीज़',
    searchPlaceholder: 'मरीज़ों की खोज करें...',
    id: 'आईडी',
    riskLevels: {
      highrisk: 'उच्च जोखिम',
      mediumrisk: 'मध्यम जोखिम',
      lowrisk: 'कम जोखिम'
    },
    nextVisit: 'अगली विजिट',
    visitTimes: {
      today: 'आज',
      tomorrow: 'कल',
      nextweek: 'अगले सप्ताह',
      notscheduled: 'निर्धारित नहीं'
    },
    surveyStatus: {
      complete: 'सर्वेक्षण पूरा',
      due: 'सर्वेक्षण देय'
    }
  },
  register: {
    title: 'निरामय मरीज़ पंजीकरण',
    personalInfo: 'व्यक्तिगत जानकारी',
    avatarPreview: 'अवतार पूर्वावलोकन',
    fullName: 'पूरा नाम',
    enterFullName: "मरीज़ का पूरा नाम दर्ज करें",
    age: 'उम्र',
    enterAge: 'उम्र दर्ज करें',
    phoneNumber: 'मोबाइल नंबर',
    enterPhoneNumber: 'मोबाइल नंबर दर्ज करें',
    medicalInfo: 'चिकित्सा जानकारी',
    bloodGroup: 'रक्त समूह',
    selectBloodGroup: 'रक्त समूह चुनें',
    medicalHistory: 'चिकित्सा इतिहास',
    enterMedicalHistory: 'प्रासंगिक चिकित्सा इतिहास दर्ज करें',
    address: 'पता',
    enterAddress: 'पता दर्ज करें',
    trimester: 'तिमाही',
    selectTrimester: 'तिमाही चुनें',
    firstTrimester: 'पहली तिमाही',
    secondTrimester: 'दूसरी तिमाही',
    thirdTrimester: 'तीसरी तिमाही',
    photo: 'फोटो',
    takePhoto: 'फोटो लें',
    selectFromGallery: 'गैलरी से चुनें',
    registerPatient: 'मरीज़ पंजीकृत करें',
    viewPatientCard: 'मरीज़ कार्ड देखें',
    cameraPermissionTitle: 'कैमरा अनुमति',
    cameraPermissionMessage: 'रोगी की तस्वीरें लेने के लिए ऐप को आपके कैमरे तक पहुंच की आवश्यकता है',
    askMeLater: 'बाद में पूछें',
    cancel: 'रद्द करें',
    ok: 'ठीक है',
    permissionDenied: 'अनुमति अस्वीकृत',
    cameraPermissionRequired: 'तस्वीरें लेने के लिए कैमरा अनुमति आवश्यक है',
  },
  emergency: {
    title: 'निरामय आपातकालीन रेफरल',
    patientId: 'मरीज़ आईडी',
    nearestPHC: 'निकटतम पीएचसी',
    distanceAway: '{{distance}} किमी दूर',
    cityPHC: 'शहर प्राथमिक स्वास्थ्य केंद्र',
    cityPHCAddress: '123 हेल्थकेयर एवेन्यू, सिटी एरिया',
    callPHC: 'पीएचसी को कॉल करें',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    districtHospital: 'जिला अस्पताल',
    districtGeneralHospital: 'जिला सामान्य अस्पताल',
    districtHospitalAddress: '456 हॉस्पिटल रोड, जिला क्षेत्र',
    call: 'कॉल करें',
    directions: 'दिशा-निर्देश',
    ruralHealthCenter: 'ग्रामीण स्वास्थ्य केंद्र',
    villagePHC: 'गांव प्राथमिक स्वास्थ्य केंद्र',
    villagePHCAddress: '789 ग्रामीण रोड, गांव क्षेत्र',
    bookAmbulance: '108 एम्बुलेंस बुक करें',
    ambulanceNotified: 'एम्बुलेंस सेवा को सूचित कर दिया गया है!'
  },
  primarySurvey: {
    title: 'प्राथमिक सर्वेक्षण',
    patientAssessment: 'मरीज का मूल्यांकन',
  },
  secondarySurvey: {
    title: 'माध्यमिक सर्वेक्षण',
    detailedAssessment: 'विस्तृत मूल्यांकन',
  },
  diet: {
    title: 'आहार विश्लेषक',
    dietaryInformation: 'आहार संबंधी जानकारी',
    dietaryIntake: 'आहार सेवन पैटर्न (पिछले 3 दिन या सप्ताह)',
    mealsPerDay: 'प्रति दिन भोजन की संख्या',
    mealsPerDayOptions: {
      one: '1 भोजन',
      two: '2 भोजन',
      three: '3 भोजन',
      moreThanThree: '3 से अधिक भोजन'
    },
    frequencyTitle: 'आवृत्ति:',
    greenLeafyVegetables: 'हरी पत्तेदार सब्जियां',
    fruits: 'फल',
    dairyProducts: 'दूध या डेयरी उत्पाद',
    pulses: 'दालें',
    nonVeg: 'नॉन-वेज (अंडे / मछली / मांस)',
    packagedFood: 'पैकेज्ड या तला हुआ खाना',
    frequencyOptions: {
      never: 'कभी नहीं',
      occasionally: 'कभी-कभी',
      daily: 'रोजाना',
      yes: 'हां',
      no: 'नहीं',
      weekly: 'साप्ताहिक',
      rare: 'दुर्लभ',
      frequent: 'अक्सर',
      sometimes: 'कभी-कभी',
      dontKnow: 'पता नहीं'
    },
    micronutrientTitle: 'सूक्ष्म पोषक तत्व जागरूकता',
    ironRichFood: 'आयरन युक्त खाद्य पदार्थ खाया?',
    ifaTablets: 'आईएफए टैबलेट लिया?',
    quantityTitle: 'मात्रा अनुमान (लगभग)',
    stapleFood: 'चावल/बाजरा/रोटी',
    servingSizes: {
      small: 'छोटी सर्विंग',
      medium: 'मध्यम सर्विंग',
      large: 'बड़ी सर्विंग'
    },
    oilUsed: 'दैनिक उपयोग किया जाने वाला तेल',
    oilOptions: {
      none: 'कोई नहीं',
      lessThanTwo: '2 बड़े चम्मच से कम',
      moreThanTwo: '2 बड़े चम्मच से अधिक'
    },
    waterFluidsTitle: 'पानी और तरल पदार्थ',
    glassesOfWater: 'प्रति दिन पानी के गिलास',
    waterOptions: {
      lessThanFour: '4 से कम',
      fourToSix: '4-6 गिलास',
      moreThanSix: '6 से अधिक'
    },
    teaCoffeeIntake: 'चाय/कॉफी का सेवन',
    teaCoffeeOptions: {
      none: 'कोई नहीं',
      oneToTwo: '1-2 बार',
      frequently: 'अक्सर'
    },
    affordabilityTitle: 'वहन क्षमता बाधाएं',
    foodBudget: 'मासिक खाद्य बजट सीमा (वैकल्पिक)',
    foodsNotConsumed: 'क्या कीमत के कारण कोई खाद्य पदार्थ नहीं खाया जाता है?',
    ifYesSpecify: 'यदि हां, तो कृपया निर्दिष्ट करें (जैसे, दूध, फल)',
    regionTitle: 'क्षेत्र',
    stateDistrict: 'राज्य/जिला',
    submit: 'आहार विश्लेषण जमा करें',
    reset: 'फॉर्म रीसेट करें'
  },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
