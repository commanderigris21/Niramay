# NIRAMAY - Rural Maternal Healthcare Platform

A React Native (Expo) mobile application for maternal healthcare management with role-based access for Patients, ASHA Workers, and PHC Doctors.

## Color Palette
- Primary: #E57373 (Soft Red)
- Secondary: #F06292 (Soft Pink)
- Accent: #FF8A80 (Light Coral)
- Background: #FFF5F5 (Soft White)
- Text Primary: #2D3748 (Dark Gray)
- Text Secondary: #718096 (Medium Gray)

## Features
- Role-based authentication (Patient, ASHA Worker, PHC Doctor)
- Survey forms for maternal health monitoring
- ML-based risk analysis
- Diet plan management
- Patient tracking and monitoring

## Setup
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

## Project Structure
```
src/
├── assets/         # Images, fonts, etc.
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── screens/        # Screen components
│   ├── asha/      # ASHA worker screens
│   ├── doctor/    # Doctor screens
│   ├── patient/   # Patient screens
│   └── auth/      # Authentication screens
├── services/      # API services
├── store/         # Context and state management
├── styles/        # Global styles
└── utils/         # Helper functions
```
