import { useContext } from 'react';
import { ComponentsContext } from '../../contexts/ComponentsContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/main.css';

const ComponentList = () => {
  const { components, deleteComponent } = useContext(ComponentsContext);
  const { shipId } = useParams();
  const navigate = useNavigate();
  const shipComponents = components.filter(c => c.shipId === shipId);

  return (
    <div className="component-list">
      <h3>Components</h3>
      <button onClick={() => navigate(`/ships/${shipId}/components/new`)}>Add Component</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Serial Number</th>
            <th>Install Date</th>
            <th>Last Maintenance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipComponents.map(component => (
            <tr key={component.id}>
              <td>{component.name}</td>
              <td>{component.serialNumber}</td>
              <td>{component.installDate}</td>
              <td>{component.lastMaintenanceDate}</td>
              <td>
                <button onClick={() => navigate(`/ships/${shipId}/components/edit/${component.id}`)}>Edit</button>
                <button onClick={() => deleteComponent(component.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentList;