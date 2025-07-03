import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  userType: 'user' | 'company' | null;
  login: (email: string, password: string, role: 'user' | 'company') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'user' | 'company' | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedUserType = localStorage.getItem('userType');

    if (token && savedUser && savedUserType) {
      try {
        setUser(JSON.parse(savedUser));
        setUserType(savedUserType as 'user' | 'company');
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'company') => {
    setLoading(true);
    try {
      let response;
      if (role === 'user') {
        response = await api.loginUser(email, password);
      } else {
        response = await api.loginCompany(email, password);
      }

      // Store token
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('userType', role);

      // Create user object based on role
      const userData: User = {
        id: 1, // Will be updated when we get actual user data
        email,
        full_name: role === 'user' ? 'User' : 'Company',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        role,
      };

      setUser(userData);
      setUserType(role);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};