import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectCreator.css';

export default function ProjectCreator() {
  const { addProject } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    thumbnail: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          thumbnail: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    };
    addProject(newProject);
    navigate('/admin');
  };

  return (
    <div className="project-creator">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          type="url"
          placeholder="Project URL"
          value={formData.link}
          onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
          required
        />
        
        <div className="thumbnail-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
            id="thumbnailInput"
          />
          <label htmlFor="thumbnailInput" className="thumbnail-label">
            {formData.thumbnail ? (
              <img src={formData.thumbnail} alt="Thumbnail preview" />
            ) : (
              <div className="upload-thumbnail">
                <i className="fas fa-plus"></i>
                <span>Upload Thumbnail</span>
              </div>
            )}
          </label>
        </div>

        <button type="submit" className="submit-button">
          Add Project
        </button>
      </form>
    </div>
  );
}