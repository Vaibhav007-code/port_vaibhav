import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';
import '../styles/AdminPanel.css';

export default function AdminPanel() {
  const { adminLogout, messages } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => { adminLogout(); navigate('/'); }}>
          Logout
        </button>
      </div>
      
      <div className="admin-nav">
        <Link to="/admin/posts">Manage Posts</Link>
        <Link to="/admin/projects">Manage Projects</Link>
        <Link to="/admin/mailbox">Mailbox ({messages.length})</Link>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}