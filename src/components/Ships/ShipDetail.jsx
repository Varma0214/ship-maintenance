import { useContext } from 'react';
import { ShipsContext } from '../../contexts/ShipsContext';
import { JobsContext } from '../../contexts/JobsContext';
import ComponentList from '../Components/ComponentList';
import { useParams } from 'react-router-dom';
import '../../styles/main.css';

const ShipDetail = () => {
  const { ships } = useContext(ShipsContext);
  const { jobs } = useContext(JobsContext);
  const { id } = useParams();
  const ship = ships.find(s => s.id === id);
  const shipJobs = jobs.filter(j => j.shipId === id);

  if (!ship) return <div>Ship not found</div>;

  return (
    <div className="ship-detail">
      <h2>{ship.name}</h2>
      <p><strong>IMO Number:</strong> {ship.imo}</p>
      <p><strong>Flag:</strong> {ship.flag}</p>
      <p><strong>Status:</strong> {ship.status}</p>
      <ComponentList shipId={id} />
      <div className="maintenance-history">
        <h3>Maintenance History</h3>
        {shipJobs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Job Type</th>
                <th>Component</th>
                <th>Status</th>
                <th>Scheduled Date</th>
              </tr>
            </thead>
            <tbody>
              {shipJobs.map(job => (
                <tr key={job.id}>
                  <td>{job.type}</td>
                  <td>{job.componentId}</td>
                  <td>{job.status}</td>
                  <td>{job.scheduledDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No maintenance history</p>
        )}
      </div>
    </div>
  );
};

export default ShipDetail;