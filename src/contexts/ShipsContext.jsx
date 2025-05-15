import { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

export const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const appData = getFromLocalStorage('appData') || {};
    setShips(appData.ships || []);
  }, []);

  const saveShips = (updatedShips) => {
    setShips(updatedShips);
    const appData = getFromLocalStorage('appData') || {};
    saveToLocalStorage('appData', { ...appData, ships: updatedShips });
  };

  const addShip = (ship) => {
    const newShip = { id: `s${ships.length + 1}`, ...ship };
    saveShips([...ships, newShip]);
  };

  const updateShip = (id, updatedShip) => {
    const updated = ships.map(s => (s.id === id ? { ...s, ...updatedShip } : s));
    saveShips(updated);
  };

  const deleteShip = (id) => {
    const updated = ships.filter(s => s.id !== id);
    saveShips(updated);
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};