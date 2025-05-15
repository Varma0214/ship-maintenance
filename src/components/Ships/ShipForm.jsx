import { useState, useContext, } from 'react';
import { ShipsContext } from '../../contexts/ShipsContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/main.css';

const ShipForm = () => {
  const { ships, addShip, updateShip } = useContext(ShipsContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const ship = isEdit ? ships.find(s => s.id === id) : {};

  const [formData, setFormData] = useState({
    name: ship?.name || '',
    imo: ship?.imo || '',
    flag: ship?.flag || '',
    status: ship?.status || 'Active',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.imo || !formData.flag) {
      setError('Please fill in all fields');
      return;
    }
    if (isEdit) {
      updateShip(id, formData);
    } else {
      addShip(formData);
    }
    navigate('/ships');
  };

  return (
    <div className="ship-form">
      <h2>{isEdit ? 'Edit Ship' : 'Add Ship'}</h2>
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
          <label>IMO Number</label>
          <input
            type="text"
            name="imo"
            value={formData.imo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Flag</label>
          <input
            type="text"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isEdit ? 'Update' : 'Add'} Ship</button>
      </form>
    </div>
  );
};

export default ShipForm;