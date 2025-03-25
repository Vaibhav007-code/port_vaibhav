// AdminPanel.js
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import "../styles/AdminPanel.css";

export default function AdminPanel() {
  const { adminLogout, posts, projects } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => { 
          adminLogout(); 
          navigate('/');
        }}>
          Logout
        </button>
      </div>

      <div className="admin-nav">
        <Link to="/admin/posts">Create Post</Link>
        <Link to="/admin/projects">Create Project</Link>
        <Link to="/admin/mailbox">Mailbox</Link>
      </div>

      <div className="admin-content">
        <div className="manage-section">
          <h2>Manage Existing Posts</h2>
          <div className="posts-list">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="admin-post-item">
                  <p>{post.content?.substring(0, 50)}...</p>
                  <button onClick={() => {/* implement deletion if needed */}}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>

        <div className="manage-section">
          <h2>Manage Existing Projects</h2>
          <div className="projects-list">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="admin-project-item">
                  <h3>{project.name}</h3>
                  <button onClick={() => {/* implement deletion if needed */}}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No projects available</p>
            )}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
