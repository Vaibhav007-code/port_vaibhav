import { useContext } from 'react';
import { AppContext } from '../App';
import Post from '../components/Post';
import '../styles/Posts.css';

export default function Posts() {
  const { posts } = useContext(AppContext);

  return (
    <div className="posts-page">
      <div className="posts-container">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}