import { useContext } from 'react';
import { JobsContext } from '../../contexts/JobsContext';
import '../../styles/main.css';

const Charts = () => {
  const { jobs } = useContext(JobsContext);
  const statuses = ['Open', 'In Progress', 'Completed'];
  const counts = statuses.map(status => jobs.filter(j => j.status === status).length);
  const maxCount = Math.max(...counts, 1); // Avoid division by zero

  return (
    <div className="charts">
      <h3>Jobs by Status</h3>
      <div className="bar-chart">
        {statuses.map((status, index) => (
          <div key={status} className="bar-container">
            <div
              className="bar"
              style={{ height: `${(counts[index] / maxCount) * 100}%` }}
            ></div>
            <span>{status}</span>
            <span>{counts[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;