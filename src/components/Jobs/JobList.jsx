import { useContext, useState } from 'react';
import { JobsContext } from '../../contexts/JobsContext';
import { ShipsContext } from '../../contexts/ShipsContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const JobList = () => {
  const { jobs, deleteJob } = useContext(JobsContext);
  const { ships } = useContext(ShipsContext);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ shipId: '', status: '', priority: '' });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (!filters.shipId || job.shipId === filters.shipId) &&
      (!filters.status || job.status === filters.status) &&
      (!filters.priority || job.priority === filters.priority)
    );
  });

  return (
    <div className="job-list">
      <h2>Maintenance Jobs</h2>
      <button onClick={() => navigate('/jobs/new')}>Add Job</button>
      <div className="filters">
        <select name="shipId" onChange={handleFilterChange}>
          <option value="">All Ships</option>
          {ships.map(ship => (
            <option key={ship.id} value={ship.id}>{ship.name}</option>
          ))}
        </select>
        <select name="status" onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Ship</th>
            <th>Component</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Scheduled Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map(job => (
            <tr key={job.id}>
              <td>{ships.find(s => s.id === job.shipId)?.name}</td>
              <td>{job.componentId}</td>
              <td>{job.type}</td>
              <td>{job.priority}</td>
              <td>{job.status}</td>
              <td>{job.scheduledDate}</td>
              <td>
                <button onClick={() => navigate(`/jobs/edit/${job.id}`)}>Edit</button>
                <button onClick={() => deleteJob(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;