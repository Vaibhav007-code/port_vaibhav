import { useContext } from 'react';
import { AppContext } from '../App';
import { Navigate } from 'react-router-dom';
import '../styles/Mailbox.css';

export default function Mailbox() {
  const { messages, deleteMessage, isAdmin } = useContext(AppContext);

  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="mailbox-container">
      <div className="mailbox-content">
        <div className="messages-list">
          <h2>📬 Received Messages ({messages.length})</h2>
          {messages.map((message, index) => (
            <div key={index} className="message-card">
              <p>{message.text}</p>
              <small>{new Date(message.timestamp).toLocaleString()}</small>
              <button 
                className="delete-message"
                onClick={() => deleteMessage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}