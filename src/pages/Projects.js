// Projects.js
import { useContext } from 'react'; 
import { AppContext } from '../App'; 
import '../styles/Projects.css';  

export default function Projects() {   
  const { projects } = useContext(AppContext);    

  if (!projects || projects.length === 0) {
    return (
      <div className="projects-page">
        <h1>Featured Projects</h1>
        <p>No projects available</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <h1>Featured Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
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
