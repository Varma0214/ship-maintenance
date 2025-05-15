import { useState, useContext } from 'react'; // Removed useEffect
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/main.css';

const ComponentForm = () => {
  const { components, addComponent, updateComponent } = useContext(ComponentsContext);
  const { shipId, componentId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!componentId;
  const component = isEdit ? components.find(c => c.id === componentId) : {};

  const [formData, setFormData] = useState({
    name: component?.name || '',
    serialNumber: component?.serialNumber || '',
    installDate: component?.installDate || '',
    lastMaintenanceDate: component?.lastMaintenanceDate || '',
    shipId,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.serialNumber || !formData.installDate) {
      setError('Please fill in all required fields');
      return;
    }
    if (isEdit) {
      updateComponent(componentId, formData);
    } else {
      addComponent(formData);
    }
    navigate(`/ships/${shipId}`);
  };

  return (
    <div className="component-form">
      <h2>{isEdit ? 'Edit Component' : 'Add Component'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Install Date</label>
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Maintenance Date</label>
          <input
            type="date"
            name="lastMaintenanceDate"
            value={formData.lastMaintenanceDate}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isEdit ? 'Update' : 'Add'} Component</button>
      </form>
    </div>
  );
};

export default ComponentForm;