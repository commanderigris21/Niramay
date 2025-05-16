import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'patient' | 'asha' | 'doctor' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role: UserRole, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear stored credentials on mount
    clearStoredCredentials();
  }, []);

  const clearStoredCredentials = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userRole']);
      setIsAuthenticated(false);
      setUserRole(null);
    } catch (e) {
      console.error('Failed to clear credentials:', e);
    } finally {
      setLoading(false);
    }
  };

  const restoreToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole') as UserRole;
      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(role);
      }
    } catch (e) {
      console.error('Failed to restore token:', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (role: UserRole, token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRole', role as string);
      setIsAuthenticated(true);
      setUserRole(role);
    } catch (e) {
      console.error('Failed to store auth data:', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setUserRole(null);
    } catch (e) {
      console.error('Failed to remove auth data:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
