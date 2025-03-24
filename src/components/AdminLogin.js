import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

export default function AdminLogin() {
  const { adminLogin, isAdmin } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter a password');
      return;
    }
    
    if (adminLogin(password)) {
      navigate('/admin');
    } else {
      setError('Invalid admin password');
      setPassword('');
    }
  };

  // If already logged in, redirect to admin panel
  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <h2>Admin Authentication</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              autoComplete="current-password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}