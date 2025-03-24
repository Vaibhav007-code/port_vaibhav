import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';
import '../styles/AdminPanel.css';

export default function AdminPanel() {
  const { adminLogout, posts, projects, deletePost, deleteProject } = useContext(AppContext);
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
        <Link to="/admin/posts">Create Post</Link>
        <Link to="/admin/projects">Create Project</Link>
        <Link to="/admin/mailbox">Mailbox</Link>
      </div>

      <div className="admin-content">
        {/* Existing Posts Management */}
        <div className="manage-section">
          <h2>Manage Existing Posts</h2>
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="admin-post-item">
                <p>{post.content.substring(0, 50)}...</p>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Projects Management */}
        <div className="manage-section">
          <h2>Manage Existing Projects</h2>
          <div className="projects-list">
            {projects.map(project => (
              <div key={project.id} className="admin-project-item">
                <h3>{project.name}</h3>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}