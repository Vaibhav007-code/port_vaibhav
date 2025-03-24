import { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles/PostCreator.css';

export default function PostCreator() {
  const { posts, addPost, deletePost, darkMode } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
        setMedia({
          url: reader.result,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!media) return;

    const newPost = {
      id: Date.now(),
      content,
      media,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    addPost(newPost);
    setContent('');
    setMedia(null);
    setMediaPreview('');
  };

  return (
    <div className={`post-creator-container ${darkMode ? 'dark' : ''}`}>
      <div className="create-post-modal">
        <div className="modal-header">
          <h2>Create Post</h2>
          <div className="header-controls">
            <button 
              className="close-button"
              onClick={() => navigate('/admin')}
            >
              &times;
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="media-section">
            {mediaPreview ? (
              <div className="media-preview">
                {media.type.startsWith('image') ? (
                  <img src={mediaPreview} alt="Preview" />
                ) : (
                  <video src={mediaPreview} controls />
                )}
                <button
                  className="change-media"
                  onClick={() => fileInputRef.current.click()}
                >
                  Change Media
                </button>
              </div>
            ) : (
              <div 
                className="media-upload"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="upload-prompt">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Click to upload photo/video</p>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMediaChange}
              accept="image/*, video/*"
              hidden
            />
          </div>

          <div className="caption-section">
            <textarea
              placeholder="Write a caption..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="caption-input"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/admin')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="post-button"
            onClick={handleSubmit}
            disabled={!mediaPreview}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}