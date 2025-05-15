import { useContext } from 'react';
import { ShipsContext } from '../../contexts/ShipsContext';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { JobsContext } from '../../contexts/JobsContext';
import { isOverdue } from '../../utils/dateUtils';
import '../../styles/main.css';

const KPICards = () => {
  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

  const overdueComponents = components.filter(c => isOverdue(c.lastMaintenanceDate)).length;
  const jobsInProgress = jobs.filter(j => j.status === 'In Progress').length;
  const jobsCompleted = jobs.filter(j => j.status === 'Completed').length;

  return (
    <div className="kpi-cards">
      <div className="kpi-card">
        <h3>Total Ships</h3>
        <p>{ships.length}</p>
      </div>
      <div className="kpi-card">
        <h3>Overdue Maintenance</h3>
        <p>{overdueComponents}</p>
      </div>
      <div className="kpi-card">
        <h3>Jobs In Progress</h3>
        <p>{jobsInProgress}</p>
      </div>
      <div className="kpi-card">
        <h3>Jobs Completed</h3>
        <p>{jobsCompleted}</p>
      </div>
    </div>
  );
};

export default KPICards;