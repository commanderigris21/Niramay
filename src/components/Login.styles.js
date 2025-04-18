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
    marginBottom: 40,
    width: '100%',
  },
  logoIcon: {
    width: 500,
    height: 500,
    position: 'relative',
    marginTop: -80,
  },

  inputContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 120,
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
  phoneInputWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  phoneInput: {
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
  otpContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
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
  otpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  otpDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 25,
  },
  otpInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  resendButton: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  changeNumberButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '500',
  },
});

export default styles;