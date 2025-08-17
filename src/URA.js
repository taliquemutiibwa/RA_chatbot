import React, { useState, useEffect } from 'react';
import './URA.css';
import uraLogo from './URA.png';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';
import keycloak, { login, logout, getUserName } from './KeycloakService';

function URA() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const user = getUserName();
    if (user) {
      setUsername(user);
      fetchChatHistory();
    }
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get('http://localhost:8000/history', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      });
      setChatHistory(res.data.history); 
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const payload = {
      question: message,
      information: message,
    };

    try {
      const headers = username
        ? { Authorization: `Bearer ${keycloak.token}` }
        : {};

      const res = await axios.post('http://localhost:8000/chat', payload, {
        headers,
      });

      const newChat = {
        question: message,
        answer: res.data.answer,
      };

      if (username) {
        setChatHistory([newChat, ...chatHistory]);
      }

      setResponse(res.data.answer);
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setResponse('There was an error connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
    setTimeout(handleSend, 100);
  };

  return (
    <div className="ura-wrapper">
      <img src={uraLogo} alt="URA Logo" className="ura-logo" />
           <h1 className="ura-title">URA Tax Assistant</h1>
           <p className="ura-subtitle">
            Your 24/7 virtual assistant for all tax-related queries in Uganda
           </p>

      <div className="chat-box">
        <div className="chat-header">
            <FaRobot className="chat-icon" />
            <div style={{ flex: 1 }}>
              <strong>URA Assistant</strong>
              <p className="chat-status">Online</p>
            </div>
         </div>

        {username ? (
           <p className="login-note">
             <strong>Welcome, {username}</strong>{' '}
             <button className="auth-button" onClick={logout}>
                Logout
             </button>
          </p>
        ) : (
          <p className="login-note">
             Guest mode. <strong>Login is not required to use this assistant.</strong>{' '}
             <button className="auth-button" onClick={login}>
              Login
             </button>
           </p>
        )}

        <div className="chat-body">
            <div className="chat-bubble">
              <p>Hello! 👋 I'm your URA virtual assistant. How can I help you today?</p>
              <p>
                I can assist with <strong>TIN</strong> registration, tax payments, filing returns, and more.
              </p>
            </div>

          <div className="suggestions">
              <button onClick={() => handleSuggestion("How do I register for a TIN?")}>
                How do I register for TIN?
              </button>
              <button onClick={() => handleSuggestion("Where can I pay taxes?")}>
                Where can I pay taxes?
              </button>
              <button onClick={() => handleSuggestion("What is the penalty for late filing?")}>
                Penalty for late filing?
              </button>
          </div>

          {loading && (
            <div className="bot-response">
              <SixDotsLoader />
              Loading response...
            </div>
          )}

          {!loading && response && (
            <div className="bot-response">{response}</div>
          )}

          {username && chatHistory.length > 0 && (
            <div className="chat-history">
              <h4>Your Chat History:</h4>
              {chatHistory.map((entry, index) => (
                <div key={index} className="chat-history-entry">
                  <strong>You:</strong> {entry.question}<br />
                  <strong>URA:</strong> {entry.answer}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button onClick={handleSend} className="send-button">
            ➤
          </button>
        </div>

        <p className="version-text">
          URA Assistant <span>Powered by MK</span>
        </p>
      </div>
    </div>
  );
}

export default URA;

function SixDotsLoader() {
  return (
    <div className="six-dots-loader" aria-label="Loading">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`dot dot${i + 1}`}></div>
      ))}
    </div>
  );
}
