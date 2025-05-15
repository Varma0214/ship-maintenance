import { useContext } from 'react';
import { ShipsContext } from '../../contexts/ShipsContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const ShipList = () => {
  const { ships, deleteShip } = useContext(ShipsContext);
  const navigate = useNavigate();

  return (
    <div className="ship-list">
      <h2>Ships</h2>
      <button onClick={() => navigate('/ships/new')}>Add Ship</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IMO Number</th>
            <th>Flag</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map(ship => (
            <tr key={ship.id}>
              <td>{ship.name}</td>
              <td>{ship.imo}</td>
              <td>{ship.flag}</td>
              <td>{ship.status}</td>
              <td>
                <button onClick={() => navigate(`/ships/${ship.id}`)}>View</button>
                <button onClick={() => navigate(`/ships/edit/${ship.id}`)}>Edit</button>
                <button onClick={() => deleteShip(ship.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;