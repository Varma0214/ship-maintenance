import { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getFromLocalStorage('user');
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (email, password) => {
    const appData = getFromLocalStorage('appData') || {};
    const user = appData.users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user);
      saveToLocalStorage('user', user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};