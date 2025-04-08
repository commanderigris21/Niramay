import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    backgroundColor: 'white',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  phoneInputWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  phoneInput: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    minWidth: 150,
  },
  buttonDisabled: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    marginTop: 20,
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  otpContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'white',
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
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  otpDescription: {
    fontSize: 14,
    color: '#7f8c8d',
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
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  resendButton: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  changeNumberButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
});

export default styles;