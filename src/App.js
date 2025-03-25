// App.js
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import PostCreator from "./components/PostCreator";
import ProjectCreator from "./components/ProjectCreator";
import Mailbox from "./components/Mailbox";
import Setup from "./components/Setup";
import "./styles/Global.css";
import { fetchData, updateData } from "./api"; // Your JSONBin API utility functions

export const AppContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [appData, setAppData] = useState({
    posts: [],
    projects: [],
    adminPassword: null,
    security: {}
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setAppData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const syncData = async (newData) => {
    await updateData(newData);
    setAppData(newData);
  };

  const handleAdminLogin = (password) => {
    if (password === appData.adminPassword) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  const addPost = async (post) => {
    const newData = {
      ...appData,
      posts: [post, ...appData.posts]
    };
    await syncData(newData);
  };

  const deletePost = async (postId) => {
    const newData = {
      ...appData,
      posts: appData.posts.filter((post) => post.id !== postId)
    };
    await syncData(newData);
  };

  const addProject = async (project) => {
    const newData = {
      ...appData,
      projects: [project, ...appData.projects]
    };
    await syncData(newData);
  };

  const deleteProject = async (projectId) => {
    const newData = {
      ...appData,
      projects: appData.projects.filter((project) => project.id !== projectId)
    };
    await syncData(newData);
  };

  const setAdminCredentials = async (password, security) => {
    const newData = {
      ...appData,
      adminPassword: password,
      security
    };
    await syncData(newData);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isAdmin,
        adminLogout: handleAdminLogout,
        posts: appData.posts,
        projects: appData.projects,
        addPost,
        deletePost,
        addProject,
        deleteProject,
        setAdminPassword: setAdminCredentials,
        security: appData.security,
        handleAdminLogin, // Function to check password
      }}
    >
      <Router>
        <div className={`app ${darkMode ? "dark-mode" : ""}`}>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/posts" element={isAdmin ? <PostCreator /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/projects" element={isAdmin ? <ProjectCreator /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/mailbox" element={isAdmin ? <Mailbox /> : <Navigate to="/admin/login" />} />

              {/* Authentication Routes */}
              <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
              <Route path="/setup" element={!isAdmin ? <Setup /> : <Navigate to="/admin" />} />

              {/* 404 Redirect */}
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
