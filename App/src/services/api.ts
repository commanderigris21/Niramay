import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your actual API base URL
const BASE_URL = 'https://api.niramay.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (phone: string, password: string) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-token-123',
          role: phone.startsWith('1') ? 'patient' : phone.startsWith('2') ? 'asha' : 'doctor',
        });
      }, 1000);
    });
  },
};

export const surveyAPI = {
  submitPrimarySurvey: async (data: any) => {
    return api.post('/ml/analyzePrimary', data);
  },
  submitSecondarySurvey: async (data: any) => {
    return api.post('/ml/analyzeSecondary', data);
  },
};

export const patientAPI = {
  getPatients: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: '1',
              name: 'Priya Sharma',
              age: 25,
              trimester: 2,
              riskLevel: 'low',
            },
            // Add more mock data as needed
          ],
        });
      }, 1000);
    });
  },

  getHealthSummary: async (patientId: string) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
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
          ],
        });
      }, 1000);
    });
  },

  getDietPlan: async (patientId: string) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
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
          ],
          restrictions: [
            'Avoid raw or undercooked eggs',
            'Limit caffeine intake',
            'Avoid unpasteurized dairy',
          ],
          hydrationTarget: {
            target: 8,
            current: 5,
          },
        });
      }, 1000);
    });
  },

  updateHydration: async (patientId: string, glasses: number) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  getNotifications: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: '1',
              title: 'Upcoming Appointment',
              message: 'You have a checkup scheduled for tomorrow at 10:00 AM with Dr. Mehta.',
              type: 'appointment',
              timestamp: '2025-04-11T15:30:00',
              read: false,
            },
            {
              id: '2',
              title: 'Take Your Supplements',
              message: 'Time to take your iron and folic acid supplement.',
              type: 'reminder',
              timestamp: '2025-04-11T09:00:00',
              read: true,
            },
          ],
        });
      }, 1000);
    });
  },

  markNotificationAsRead: async (notificationId: string) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};

export default api;
