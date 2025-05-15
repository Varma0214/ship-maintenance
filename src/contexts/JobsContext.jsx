import { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const appData = getFromLocalStorage('appData') || {};
    setJobs(appData.jobs || []);
  }, []);

  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    const appData = getFromLocalStorage('appData') || {};
    saveToLocalStorage('appData', { ...appData, jobs: updatedJobs });
  };

  const addJob = (job) => {
    const newJob = { id: `j${jobs.length + 1}`, status: 'Open', ...job };
    saveJobs([...jobs, newJob]);
    return newJob;
  };

  const updateJob = (id, updatedJob) => {
    const updated = jobs.map(j => (j.id === id ? { ...j, ...updatedJob } : j));
    saveJobs(updated);
  };

  const deleteJob = (id) => {
    const updated = jobs.filter(j => j.id !== id);
    saveJobs(updated);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};