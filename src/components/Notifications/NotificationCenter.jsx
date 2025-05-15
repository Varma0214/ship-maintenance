import { useContext } from 'react';
import { NotificationsContext } from '../../contexts/NotificationsContext';
import '../../styles/main.css';

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useContext(NotificationsContext);

  return (
    <div className="notification-center">
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map(notification => (
            <li key={notification.id}>
              <span>{notification.message} ({new Date(notification.timestamp).toLocaleString()})</span>
              <button onClick={() => dismissNotification(notification.id)}>Dismiss</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;