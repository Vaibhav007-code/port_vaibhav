import { useState, useContext } from 'react';
import { AppContext } from '../App';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import '../styles/Post.css';

export default function Post({ post }) {
  const { isAdmin, deletePost } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="post-container">
      {isAdmin && (
        <button 
          className="delete-post"
          onClick={() => deletePost(post.id)}
          aria-label="Delete post"
        >
          &times;
        </button>
      )}

      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">VP</div>
          <div className="author-details">
            <h3 className="author-name">Vaibhav Pathak</h3>
            <time className="post-time">
              {new Date(post.timestamp).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </time>
          </div>
        </div>
      </div>

      {post.media && (
        <div className="media-container">
          {post.media.type.startsWith('image') ? (
            <img 
              src={post.media.url} 
              alt="Post visual" 
              className="post-media" 
              loading="lazy"
            />
          ) : (
            <video 
              controls 
              src={post.media.url} 
              className="post-media"
            />
          )}
        </div>
      )}

      <div className="post-content">
        <p className="post-text">{post.content}</p>
        <div className="post-actions">
          <LikeButton />
          <div className="action-divider"></div>
          <button 
            className="comment-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
        
        {isExpanded && <CommentSection />}
      </div>
    </article>
  );
}