export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const isOverdue = (lastMaintenanceDate) => {
  const last = new Date(lastMaintenanceDate);
  const now = new Date();
  const diff = (now - last) / (1000 * 60 * 60 * 24); // Days difference
  return diff > 365; 
};