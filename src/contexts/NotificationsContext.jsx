import { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const appData = getFromLocalStorage('appData') || {};
    setNotifications(appData.notifications || []);
  }, []);

  const saveNotifications = (updatedNotifications) => {
    setNotifications(updatedNotifications);
    const appData = getFromLocalStorage('appData') || {};
    saveToLocalStorage('appData', { ...appData, notifications: updatedNotifications });
  };

  const addNotification = (message) => {
    const newNotification = {
      id: `n${notifications.length + 1}`,
      message,
      timestamp: new Date().toISOString(),
    };
    saveNotifications([...notifications, newNotification]);
  };

  const dismissNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    saveNotifications(updated);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, dismissNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};