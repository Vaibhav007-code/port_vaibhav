// ProjectCreator.js
import { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectCreator.css";

export default function ProjectCreator() {
  const { addProject } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    thumbnail: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: {
            file,
            preview: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.thumbnail) {
      alert("Please upload a thumbnail");
      return;
    }
    try {
      setIsUploading(true);
      const thumbnailUrl = formData.thumbnail.preview;
      const newProject = {
        name: formData.name,
        link: formData.link,
        thumbnail: thumbnailUrl,
        date: Date.now(),
        id: Date.now().toString(),
      };
      await addProject(newProject);
      setFormData({
        name: "",
        link: "",
        thumbnail: null,
      });
      navigate("/projects");
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="project-creator-container">
      <div className="creator-card">
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <input
            type="url"
            placeholder="Project URL"
            value={formData.link}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, link: e.target.value }))
            }
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
                <img
                  src={formData.thumbnail.preview}
                  alt="Thumbnail preview"
                />
              ) : (
                "Upload Thumbnail +"
              )}
            </label>
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={isUploading}
          >
            {isUploading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
