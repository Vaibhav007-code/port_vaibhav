// Post.js
import React, { useContext } from "react";
import { AppContext } from "../App";
import "../styles/Post.css";

export default function Post({ post }) {
  const { isAdmin } = useContext(AppContext);
  const { content = "No content available", date, media } = post || {};

  let formattedDate = "Date not specified";
  if (date) {
    if (typeof date === "number") {
      formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else if (date.seconds) {
      formattedDate = new Date(date.seconds * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else {
      formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  return (
    <article className="post-container">
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">VP</div>
          <div className="author-details">
            <h3 className="author-name">Vaibhav Pathak</h3>
            <time className="post-time">{formattedDate}</time>
          </div>
        </div>
      </div>

      {media && (
        <div className="media-container">
          {media.type.startsWith("image") ? (
            <img
              src={media.url}
              alt="Post visual"
              className="post-media"
              loading="lazy"
            />
          ) : (
            <video controls src={media.url} className="post-media" />
          )}
        </div>
      )}

      <div className="post-content">
        <p className="post-text">{content}</p>
      </div>
    </article>
  );
}
