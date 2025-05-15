import { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

export const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const appData = getFromLocalStorage('appData') || {};
    setComponents(appData.components || []);
  }, []);

  const saveComponents = (updatedComponents) => {
    setComponents(updatedComponents);
    const appData = getFromLocalStorage('appData') || {};
    saveToLocalStorage('appData', { ...appData, components: updatedComponents });
  };

  const addComponent = (component) => {
    const newComponent = { id: `c${components.length + 1}`, ...component };
    saveComponents([...components, newComponent]);
  };

  const updateComponent = (id, updatedComponent) => {
    const updated = components.map(c => (c.id === id ? { ...c, ...updatedComponent } : c));
    saveComponents(updated);
  };

  const deleteComponent = (id) => {
    const updated = components.filter(c => c.id !== id);
    saveComponents(updated);
  };

  return (
    <ComponentsContext.Provider value={{ components, addComponent, updateComponent, deleteComponent }}>
      {children}
    </ComponentsContext.Provider>
  );
};