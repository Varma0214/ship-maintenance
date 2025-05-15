import { useState, useContext } from 'react'; // Removed useEffect
import { JobsContext } from '../../contexts/JobsContext';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { ShipsContext } from '../../contexts/ShipsContext';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/main.css';

const JobForm = () => {
  const { jobs, addJob, updateJob } = useContext(JobsContext);
  const { components } = useContext(ComponentsContext);
  const { ships } = useContext(ShipsContext);
  const { addNotification } = useContext(NotificationsContext);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!jobId;
  const job = isEdit ? jobs.find(j => j.id === jobId) : {};

  const [formData, setFormData] = useState({
    shipId: job?.shipId || '',
    componentId: job?.componentId || '',
    type: job?.type || 'Inspection',
    priority: job?.priority || 'Low',
    status: job?.status || 'Open',
    assignedEngineerId: job?.assignedEngineerId || '',
    scheduledDate: job?.scheduledDate || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shipId || !formData.componentId || !formData.scheduledDate) {
      setError('Please fill in all required fields');
      return;
    }
    if (isEdit) {
      updateJob(jobId, formData);
      addNotification(`Job ${formData.type} updated for component ${formData.componentId}`);
    } else {
      addJob(formData); // Removed unused newJob
      addNotification(`New job ${formData.type} created for component ${formData.componentId}`);
    }
    navigate('/jobs');
  };

  return (
    <div className="job-form">
      <h2>{isEdit ? 'Edit Job' : 'Add Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ship</label>
          <select name="shipId" value={formData.shipId} onChange={handleChange} required>
            <option value="">Select Ship</option>
            {ships.map(ship => (
              <option key={ship.id} value={ship.id}>{ship.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Component</label>
          <select
            name="componentId"
            value={formData.componentId}
            onChange={handleChange}
            required
            disabled={!formData.shipId}
          >
            <option value="">Select Component</option>
            {components
              .filter(c => c.shipId === formData.shipId)
              .map(component => (
                <option key={component.id} value={component.id}>{component.name}</option>
              ))}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Inspection">Inspection</option>
            <option value="Repair">Repair</option>
            <option value="Replacement">Replacement</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Assigned Engineer</label>
          <input
            type="text"
            name="assignedEngineerId"
            value={formData.assignedEngineerId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Scheduled Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isEdit ? 'Update' : 'Add'} Job</button>
      </form>
    </div>
  );
};

export default JobForm;