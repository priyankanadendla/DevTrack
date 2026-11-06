import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('devtrack_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('devtrack_token'));
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token && !!user;

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login(credentials);
      localStorage.setItem('devtrack_token', data.token);
      localStorage.setItem('devtrack_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register(userData);
      localStorage.setItem('devtrack_token', data.token);
      localStorage.setItem('devtrack_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('devtrack_token');
    localStorage.removeItem('devtrack_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('devtrack_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
