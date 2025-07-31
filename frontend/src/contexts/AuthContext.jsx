import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mock';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for saved user session
    const savedUser = localStorage.getItem('freeflix_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would make API call
    if (email && password) {
      const userData = { ...mockUser, email };
      setUser(userData);
      localStorage.setItem('freeflix_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = async (name, email, password) => {
    // Mock signup - in real app, this would make API call
    if (name && email && password) {
      const userData = { ...mockUser, name, email };
      setUser(userData);
      localStorage.setItem('freeflix_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('freeflix_user');
  };

  const addToFavorites = (contentId) => {
    if (user && !user.favorites.includes(contentId)) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, contentId]
      };
      setUser(updatedUser);
      localStorage.setItem('freeflix_user', JSON.stringify(updatedUser));
    }
  };

  const removeFromFavorites = (contentId) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: user.favorites.filter(id => id !== contentId)
      };
      setUser(updatedUser);
      localStorage.setItem('freeflix_user', JSON.stringify(updatedUser));
    }
  };

  const addToWatchLater = (contentId) => {
    if (user && !user.watchLater.includes(contentId)) {
      const updatedUser = {
        ...user,
        watchLater: [...user.watchLater, contentId]
      };
      setUser(updatedUser);
      localStorage.setItem('freeflix_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    addToFavorites,
    removeFromFavorites,
    addToWatchLater
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};