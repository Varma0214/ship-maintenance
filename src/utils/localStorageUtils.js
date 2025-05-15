export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const initializeLocalStorage = () => {
  const initialData = {
    users: [
      { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
      { id: '2', role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123' },
      { id: '3', role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123' },
    ],
    ships: [
      { id: 's1', name: 'Ever Given', imo: '9811000', flag: 'Panama', status: 'Active' },
      { id: 's2', name: 'Maersk Alabama', imo: '9164263', flag: 'USA', status: 'Under Maintenance' },
    ],
    components: [],
    jobs: [],
    notifications: [],
  };
  if (!getFromLocalStorage('appData')) {
    saveToLocalStorage('appData', initialData);
  }
};