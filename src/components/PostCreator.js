// PostCreator.js
import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles/PostCreator.css';

export default function PostCreator() {
  const { addPost } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the file as base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is the file data
        setMedia({
          file, // original file (optional)
          type: file.type,
          data: base64String, // base64 encoded string
        });
        setMediaPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Instead of uploading to Firebase storage, we simply return the base64 string.
  const uploadMedia = async (mediaFile) => {
    if (!mediaFile) return null;
    // Here you could add further processing if needed.
    return {
      type: mediaFile.type,
      url: media.data, // base64 string stored in state
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) {
      alert('Please add text or media to create a post');
      return;
    }
    try {
      setIsUploading(true);
      const uploadedMedia = media ? await uploadMedia(media.file) : null;
      const newPost = {
        content,
        media: uploadedMedia,
        likes: 0,
        comments: [],
        date: Date.now(),
        id: Date.now().toString(), // generate a simple id
      };
      await addPost(newPost);
      setContent('');
      setMedia(null);
      setMediaPreview('');
      navigate('/posts');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="post-creator-container">
      <div className="create-post-modal">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button 
            className="close-button"
            onClick={() => navigate('/posts')}
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
              <button 
                type="submit" 
                className="post-button" 
                disabled={isUploading}
              >
                {isUploading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
