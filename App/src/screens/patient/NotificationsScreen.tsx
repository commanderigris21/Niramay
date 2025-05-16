import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, IconButton, Divider, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'reminder' | 'alert' | 'update';
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // Mock data
      setNotifications([
        {
          id: '1',
          title: 'Upcoming Appointment',
          message: 'You have a checkup scheduled for tomorrow at 10:00 AM with Dr. Mehta.',
          type: 'appointment',
          timestamp: '2025-04-11T15:30:00',
          read: false,
          action: {
            label: 'View Details',
            onPress: () => {},
          },
        },
        {
          id: '2',
          title: 'Take Your Supplements',
          message: 'Time to take your iron and folic acid supplement.',
          type: 'reminder',
          timestamp: '2025-04-11T09:00:00',
          read: true,
        },
        {
          id: '3',
          title: 'Diet Plan Updated',
          message: 'Your diet plan has been updated by Dr. Mehta. Check the new recommendations.',
          type: 'update',
          timestamp: '2025-04-10T14:20:00',
          read: false,
          action: {
            label: 'View Diet Plan',
            onPress: () => {},
          },
        },
        {
          id: '4',
          title: 'Low Hemoglobin Alert',
          message: 'Your recent test shows slightly low hemoglobin levels. Please follow the prescribed diet.',
          type: 'alert',
          timestamp: '2025-04-09T11:45:00',
          read: true,
        },
      ]);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'calendar-clock';
      case 'reminder':
        return 'bell-ring';
      case 'alert':
        return 'alert-circle';
      case 'update':
        return 'update';
      default:
        return 'information';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return colors.primary;
      case 'reminder':
        return colors.warning;
      case 'alert':
        return colors.error;
      case 'update':
        return colors.success;
      default:
        return colors.textPrimary;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      {unreadCount > 0 && (
        <Card style={styles.unreadCard}>
          <Card.Content style={styles.unreadContent}>
            <Text variant="titleMedium">{unreadCount} unread notifications</Text>
            <Button
              mode="contained-tonal"
              onPress={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            >
              Mark All Read
            </Button>
          </Card.Content>
        </Card>
      )}

      <ScrollView>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <Card
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadNotification,
              ]}
            >
              <Card.Content>
                <View style={styles.notificationHeader}>
                  <MaterialCommunityIcons
                    name={getNotificationIcon(notification.type)}
                    size={24}
                    color={getNotificationColor(notification.type)}
                  />
                  <View style={styles.notificationTitleContainer}>
                    <Text variant="titleSmall">{notification.title}</Text>
                    <Text variant="bodySmall" style={styles.timestamp}>
                      {formatTimestamp(notification.timestamp)}
                    </Text>
                  </View>
                  {!notification.read && (
                    <IconButton
                      icon="check-circle"
                      size={20}
                      onPress={() => markAsRead(notification.id)}
                    />
                  )}
                </View>
                <Text variant="bodyMedium" style={styles.message}>
                  {notification.message}
                </Text>
                {notification.action && (
                  <Button
                    mode="outlined"
                    onPress={notification.action.onPress}
                    style={styles.actionButton}
                  >
                    {notification.action.label}
                  </Button>
                )}
              </Card.Content>
            </Card>
            {index < notifications.length - 1 && <Divider style={styles.divider} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  unreadCard: {
    margin: 16,
    backgroundColor: colors.primary + '10',
  },
  unreadContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.surface,
  },
  unreadNotification: {
    backgroundColor: colors.surface + '80',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  timestamp: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  message: {
    marginLeft: 36,
  },
  actionButton: {
    marginLeft: 36,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  divider: {
    marginHorizontal: 16,
  },
});

export default NotificationsScreen;
