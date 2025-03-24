import { useState, useContext } from 'react';
import { AppContext } from '../App';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import '../styles/Post.css';

export default function Post({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAdmin, deletePost } = useContext(AppContext);

  return (
    <article className="post-container glass-card">
      {isAdmin && (
        <button 
          className="delete-post-btn"
          onClick={() => deletePost(post.id)}
        >
          ×
        </button>
      )}
      
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">VP</div>
          <div>
            <h3>Vaibhav Pathak</h3>
            <time>{new Date(post.timestamp).toLocaleDateString()}</time>
          </div>
        </div>
      </div>

      {post.media && (
        <div className="media-container">
          {post.media.type.startsWith('image') ? (
            <img src={post.media.url} alt="Post visual" className="post-media" />
          ) : (
            <video controls src={post.media.url} className="post-media" />
          )}
        </div>
      )}

      <div className="post-content">
        <p className="post-text">{post.content}</p>
        <div className="post-actions">
          <LikeButton />
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
        {isExpanded && <CommentSection />}
      </div>
    </article>
  );
}