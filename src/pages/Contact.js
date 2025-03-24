import { useState, useContext } from 'react';
import { AppContext } from '../App';
import '../styles/Contact.css';

export default function Contact() {
  const { darkMode, addContactMessage } = useContext(AppContext);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      addContactMessage({
        text: message,
        timestamp: new Date().toISOString()
      });
      setMessage('');
      alert('Message sent successfully! 🚀');
    }
  };

  return (
    <div className={`contact-container ${darkMode ? 'dark' : ''}`}>
      <div className="contact-card">
        <h1>💌 Send Me a Message</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="message-input"
            required
          />
          <button type="submit" className="submit-btn">
            Send Message <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}