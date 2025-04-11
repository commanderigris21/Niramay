import { StyleSheet, Platform } from 'react-native';

// Theme colors
const COLORS = {
  primary: '#e74c3c',     // Red - primary brand color
  secondary: '#3498db',   // Blue - secondary actions
  background: '#f8f9fa',  // Light gray - background
  text: '#2c3e50',        // Dark blue/gray - text
  textLight: '#7f8c8d',   // Light gray - secondary text
  white: '#ffffff',       // White
  border: '#ddd',         // Light gray - borders
  success: '#2ecc71',     // Green - success states
  warning: '#f39c12',     // Orange - warning states
  error: '#e74c3c',       // Red - error states
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  logoIcon: {
    width: 200,
    height: 200,
    position: 'relative',
    marginTop: -40,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  inputWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primary,
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  termsText: {
    marginTop: 20,
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
});

export default styles;