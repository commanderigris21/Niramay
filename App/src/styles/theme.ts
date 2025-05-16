import { MD3LightTheme } from 'react-native-paper';

export const colors = {
  primary: '#E57373',
  secondary: '#F06292',
  accent: '#FF8A80',
  background: '#FFF5F5',
  surface: '#FFFFFF',
  text: '#2D3748',
  textSecondary: '#718096',
  error: '#DC2626',
  warning: '#F59E0B',
  success: '#10B981',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  roundness: 8,
};
