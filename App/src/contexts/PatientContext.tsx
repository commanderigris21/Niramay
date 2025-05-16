import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface SurveyData {
  date: string;
  type: 'primary' | 'secondary';
  findings: string[];
  data?: any;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  phone: string;
  address: string;
  trimester: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastSurvey: {
    date: string;
    type: 'primary' | 'secondary';
    findings: string[];
  };
  surveys: SurveyData[];
  dietPlan: {
    recommendations: string[];
    lastUpdated: string;
  };
  timeline: Array<{
    date: string;
    event: string;
    type: 'survey' | 'diet' | 'test';
  }>;
}

interface PatientContextType {
  patients: PatientData[];
  addPatient: (patient: PatientData) => void;
  updatePatient: (id: string, updatedData: Partial<PatientData>) => void;
  addSurvey: (patientId: string, survey: SurveyData) => void;
  getPatient: (id: string) => PatientData | undefined;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [patients, setPatients] = useState<PatientData[]>([
    // Sample patient data
    {
      id: '1',
      name: 'Priya Sharma',
      age: 25,
      phone: '9876543210',
      address: 'Village Amravati, Maharashtra',
      trimester: 2,
      riskLevel: 'medium',
      lastSurvey: {
        date: '2023-04-10',
        type: 'primary',
        findings: ['Mild anemia', 'Normal blood pressure'],
      },
      surveys: [
        {
          date: '2023-04-10',
          type: 'primary',
          findings: ['Mild anemia', 'Normal blood pressure'],
          data: { /* Primary survey data */ }
        }
      ],
      dietPlan: {
        recommendations: [
          'Increase iron-rich foods',
          'Add more protein sources',
          'Stay hydrated',
        ],
        lastUpdated: '2023-04-10',
      },
      timeline: [
        {
          date: '2023-04-10',
          event: 'Primary Survey Conducted',
          type: 'survey',
        },
        {
          date: '2023-04-08',
          event: 'Diet Plan Updated',
          type: 'diet',
        },
      ],
    }
  ]);

  const addPatient = (patient: PatientData) => {
    setPatients(prevPatients => [...prevPatients, patient]);
  };

  const updatePatient = (id: string, updatedData: Partial<PatientData>) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === id ? { ...patient, ...updatedData } : patient
      )
    );
  };

  const addSurvey = (patientId: string, survey: SurveyData) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => {
        if (patient.id === patientId) {
          const updatedSurveys = [...patient.surveys, survey];
          return {
            ...patient,
            lastSurvey: survey,
            surveys: updatedSurveys,
            timeline: [
              {
                date: survey.date,
                event: `${survey.type.charAt(0).toUpperCase() + survey.type.slice(1)} Survey Conducted`,
                type: 'survey',
              },
              ...patient.timeline,
            ]
          };
        }
        return patient;
      })
    );
  };

  const getPatient = (id: string) => {
    return patients.find(patient => patient.id === id);
  };

  return (
    <PatientContext.Provider value={{ 
      patients, 
      addPatient, 
      updatePatient, 
      addSurvey,
      getPatient 
    }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return context;
};