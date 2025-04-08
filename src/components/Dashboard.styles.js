import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: {
  padding: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logoIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
  },
  notificationButton: {
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  patientsCard: {
    backgroundColor: '#ffebee',
    width: '48%',
  },
  highRiskCard: {
    backgroundColor: '#ffebee',
    width: '48%',
  },
  surveysCard: {
    backgroundColor: '#fff9c4',
    marginBottom: 20,
  },
  fullWidthCard: {
    width: '100%',
  },
  statIconContainer: {
    marginBottom: 5,
  },
  statIcon: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginVertical: 5,
  },
  statDescription: {
    fontSize: 14,
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addPatientButton: {
    backgroundColor: '#2ecc71',
  },
  createSurveyButton: {
    backgroundColor: '#3498db',
  },
  actionButtonIcon: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activityAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e1e8ed',
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    letterSpacing: 0.3,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    color: '#e74c3c',
  },
});

export default styles;