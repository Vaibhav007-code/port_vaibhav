import { useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Projects.css';

export default function Projects() {
  const { projects, deleteProject, isAdmin } = useContext(AppContext);

  return (
    <div className="projects-page">
      <h1>Featured Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {isAdmin && (
              <button 
                className="delete-project"
                onClick={() => deleteProject(project.id)}
              >
                ×
              </button>
            )}
            {project.thumbnail && (
              <img 
                src={project.thumbnail} 
                alt={project.name} 
                className="project-thumbnail"
                loading="lazy"
              />
            )}
            <h3>{project.name}</h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}