import React from 'react';
import '../styles/Post.css';

export default function Post({ post }) {
  // Safely extract post details with fallbacks
  const {
    title = 'Untitled Post', 
    content = 'No content available', 
    date = 'Date not specified',
    imageUrl = '/placeholder-image.jpg' // Add a placeholder image path
  } = post || {};

  return (
    <div className="post-card">
      <img 
        src={imageUrl} 
        alt={title} 
        className="post-image" 
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg'; // Fallback image
        }}
      />
      <div className="post-content">
        <h2 className="post-title">{title}</h2>
        <p className="post-date">{date}</p>
        <p className="post-excerpt">{content.substring(0, 200)}...</p>
      </div>
    </div>
  );
}