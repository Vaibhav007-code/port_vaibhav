// Setup.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Setup.css";
import { updateData } from "../api";

const Setup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeData = async () => {
      await updateData({
        posts: [],
        projects: [],
        adminPassword: null,
        security: {}
      });
      navigate("/admin/login");
    };
    
    initializeData();
  }, [navigate]);

  return (
    <div className="setup-container">
      <div className="setup-box">
        <h2>Admin Setup</h2>
        <p>Initializing application data...</p>
      </div>
    </div>
  );
};

export default Setup;