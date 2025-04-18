import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginLeft: 2,
  },
  formContainer: {
   backgroundColor: 'whitesmoke',
   paddingLeft: 20,
   paddingRight: 20,
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    height: 40,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  picker: {
    backgroundColor: 'white',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  registerButton: {
    maxWidth: 300,
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: 40,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    opacity: 10
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  photoPlaceholderText: {
    fontSize: 40,
    color: '#aaa',
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  avatarPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarPreviewText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: '#4c9eeb',
    padding: 10,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  photoButtonText: {
    color: 'white',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    color: '#e74c3c',
  },
});

export default styles;