import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles/Setup.css';

export default function Setup() {
  const { setAdminPassword } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setAdminPassword(formData.password);
    localStorage.setItem('adminPassword', formData.password);
    navigate('/admin/login');
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h2>Admin Setup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Set Password</button>
        </form>
      </div>
    </div>
  );
}