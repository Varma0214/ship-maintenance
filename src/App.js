import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import ShipForm from './components/Ships/ShipForm';
import ComponentForm from './components/Components/ComponentForm';
import JobForm from './components/Jobs/JobForm';
import { AuthContext } from './contexts/AuthContext';
import { hasAccess } from './utils/roleUtils';
import './styles/main.css';
import { initializeLocalStorage } from './utils/localStorageUtils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !hasAccess(user.role, allowedRoles)) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const Nav = () => {
  const { logout } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <>
      <button className="nav-toggle" onClick={toggleNav}>
        {isNavOpen ? '✕' : '☰'}
      </button>
      <nav className={isNavOpen ? 'open' : ''}>
        <Link to="/dashboard" onClick={() => setIsNavOpen(false)}>Dashboard</Link>
        <Link to="/ships" onClick={() => setIsNavOpen(false)}>Ships</Link>
        <Link to="/jobs" onClick={() => setIsNavOpen(false)}>Jobs</Link>
        <button onClick={() => { logout(); setIsNavOpen(false); }}>Logout</button>
      </nav>
    </>
  );
};

function App() {
  initializeLocalStorage();

  return (
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <NotificationsProvider>
              <Router>
                <div className="app">
                  <Nav />
                  <main>
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <DashboardPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/ships"
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Inspector']}>
                            <ShipsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/ships/new"
                        element={
                          <ProtectedRoute allowedRoles={['Admin']}>
                            <ShipForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/ships/edit/:id"
                        element={
                          <ProtectedRoute allowedRoles={['Admin']}>
                            <ShipForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/ships/:id"
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Inspector']}>
                            <ShipDetailPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/ships/:shipId/components/new"
                        element={
                          <ProtectedRoute allowedRoles={['Admin']}>
                            <ComponentForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/ships/:shipId/components/edit/:componentId"
                        element={
                          <ProtectedRoute allowedRoles={['Admin']}>
                            <ComponentForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/jobs"
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Engineer', 'Inspector']}>
                            <JobsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/jobs/new"
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Inspector']}>
                            <JobForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/jobs/edit/:jobId"
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Inspector', 'Engineer']}>
                            <JobForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                  </main>
                </div>
              </Router>
            </NotificationsProvider>
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  );
}

export default App;