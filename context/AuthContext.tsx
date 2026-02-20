import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { handleBiometricAuth } from './handle-biomatric';
 
const AuthContext = createContext({
  isUnlocked: false,
  isLockEnabled: false,
  toggleLock: (val: boolean) => {},
  authenticate: () => {}
});

export const AuthProvider = ({ children }: any) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLockEnabled, setIsLockEnabled] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const saved = await AsyncStorage.getItem('@app_lock_enabled');
    const enabled = saved === 'true';
    setIsLockEnabled(enabled);
    if (!enabled) setIsUnlocked(true); // If lock is off, auto-unlock
  };

  const authenticate = () => {
    handleBiometricAuth(() => setIsUnlocked(true));
  };

  const toggleLock = async (val: boolean) => {
    await AsyncStorage.setItem('@app_lock_enabled', val.toString());
    setIsLockEnabled(val);
    if (!val) setIsUnlocked(true);
  };

  
  return (
    <AuthContext.Provider value={{ isUnlocked, isLockEnabled, toggleLock, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);