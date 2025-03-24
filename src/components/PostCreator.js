import { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles/PostCreator.css';

export default function PostCreator() {
  const { addPost } = useContext(AppContext);
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
          file,
          type: file.type,
          url: URL.createObjectURL(file)
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim() && !media) {
      alert('Please add text or media to create a post');
      return;
    }

    const newPost = {
      id: Date.now(),
      content,
      media: media ? {
        type: media.type,
        url: mediaPreview
      } : null,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    addPost(newPost);
    navigate('/admin');
  };

  return (
    <div className="post-creator-container">
      <div className="create-post-modal">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button 
            className="close-button"
            onClick={() => navigate('/admin')}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="modal-content">
          <div className="media-section">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMediaChange}
              accept="image/*, video/*"
              hidden
            />
            <button
              type="button"
              className="media-btn"
              onClick={() => fileInputRef.current.click()}
            >
              {mediaPreview ? 'Change Media' : 'Add Media'}
            </button>
            
            {mediaPreview && (
              <div className="media-preview">
                {media.type.startsWith('image') ? (
                  <img src={mediaPreview} alt="Post preview" />
                ) : (
                  <video controls src={mediaPreview} />
                )}
                <button
                  type="button"
                  className="remove-media"
                  onClick={() => {
                    setMedia(null);
                    setMediaPreview('');
                  }}
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="post-input"
              rows="4"
            />
            <div className="modal-actions">
              <button type="submit" className="post-button">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}