import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import '../styles/main.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <KPICards />
      <Charts />
      <NotificationCenter />
    </div>
  );
};

export default DashboardPage;