import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
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
  patientHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  riskBadge: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  idContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  idText: {
    color: '#666',
    fontSize: 14,
  },
  profileSection: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  sectionContainer: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  conditionIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  redIndicator: {
    backgroundColor: '#e74c3c',
  },
  orangeIndicator: {
    backgroundColor: '#f90',
  },
  conditionText: {
    fontSize: 14,
    color: '#333',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalItem: {
    width: '48%',
    marginBottom: 15,
  },
  vitalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  vitalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  alertValue: {
    color: '#e74c3c',
  },
  warningValue: {
    color: '#f90',
  },
  emergencyButton: {
    backgroundColor: '#e74c3c',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    borderWidth: 1,
    borderColor: '#e74c3c',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  historyButtonText: {
    color: '#e74c3c',
    fontSize: 16,
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