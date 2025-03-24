import { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import PostCreator from './components/PostCreator';
import ProjectCreator from './components/ProjectCreator';
import Mailbox from './components/Mailbox';
import Setup from './components/Setup';
import './styles/Global.css';

export const AppContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('messages')) || []);
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem('posts')) || []);
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('projects')) || []);
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('adminPassword') || '');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');

  // Dark mode effect
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Data persistence
  useEffect(() => localStorage.setItem('messages', JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem('posts', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('adminPassword', adminPassword), [adminPassword]);
  useEffect(() => localStorage.setItem('isAdmin', isAdmin), [isAdmin]);

  // Project management functions
  const addProject = (newProject) => {
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  // Post management functions
  const addPost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  // Auth functions
  const adminLogin = (password) => {
    if (password === adminPassword) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => setIsAdmin(false);

  return (
    <AppContext.Provider value={{
      // Theme
      darkMode,
      setDarkMode,

      // Messages
      messages,
      addContactMessage: (msg) => setMessages(prev => [...prev, msg]),
      deleteMessage: (index) => setMessages(prev => prev.filter((_, i) => i !== index)),

      // Posts
      posts,
      addPost,
      deletePost,

      // Projects
      projects,
      addProject,
      deleteProject,

      // Admin
      adminPassword,
      setAdminPassword,
      isAdmin,
      adminLogin,
      adminLogout
    }}>
      <Router>
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/posts" element={isAdmin ? <PostCreator /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/projects" element={isAdmin ? <ProjectCreator /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/mailbox" element={isAdmin ? <Mailbox /> : <Navigate to="/admin/login" />} />

              <Route path="/admin/login" element={adminPassword ? <AdminLogin /> : <Navigate to="/setup" />} />
              <Route path="/setup" element={!adminPassword ? <Setup /> : <Navigate to="/admin/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;