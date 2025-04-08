import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 12,
    marginRight: 5,
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