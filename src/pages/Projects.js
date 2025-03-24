import { useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Projects.css';

export default function Projects() {
  const { projects } = useContext(AppContext);

  return (
    <div className="projects-page">
      <h1>Featured Projects</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <img src={project.thumbnail} alt={project.name} />
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