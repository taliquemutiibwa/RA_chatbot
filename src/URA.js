// src/URA.js
import React, { useState } from 'react';
import './URA.css';
import uraLogo from './URA.png';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';

function URA() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim() === '') return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/', {
        information: "User asked: " + message,
        question: message,
        username: 'guest', // always guest
      });
      setResponse(res.data.answer);
    } catch (err) {
      if (err.response) {
        console.error('Backend error:', err.response.data);
        setResponse(`Error: ${err.response.data.message || 'Backend error occurred.'}`);
      } else if (err.request) {
        console.error('No response from backend:', err.request);
        setResponse('Error: No response from backend.');
      } else {
        console.error('Unexpected error:', err.message);
        setResponse(`Error: ${err.message}`);
      }
    } finally {
      setMessage('');
      setLoading(false);
    }
  };

  const handleSuggestion = async (suggestion) => {
    setMessage(suggestion);
    setTimeout(handleSend, 100);
  };

  return (
    <div className="ura-wrapper">
      <img src={uraLogo} alt="URA Logo" className="ura-logo" />
      <h1 className="ura-title">URA Tax Assistant</h1>
      <p className="ura-subtitle">Your 24/7 virtual assistant for all tax-related queries in Uganda</p>

      <div className="chat-box">
        <div className="chat-header">
          <FaRobot className="chat-icon" />
          <div style={{ flex: 1 }}>
            <strong>URA Assistant</strong>
            <p className="chat-status">Online</p>
          </div>
        </div>

        <p className="login-note">You are using guest mode. <strong>Login is not required to use this assistant.</strong></p>

        <div className="chat-body">
          <div className="chat-bubble">
            <p>Hello! 👋 I'm your URA virtual assistant. How can I help you today?</p>
            <p>
              I can assist with <strong>TIN</strong> registration, tax payments, filing returns, and more.
            </p>
          </div>

          <div className="suggestions">
            <button onClick={() => handleSuggestion("How do I register for a TIN?")}>How do I register for TIN?</button>
            <button onClick={() => handleSuggestion("Where can I pay taxes?")}>Where can I pay taxes?</button>
            <button onClick={() => handleSuggestion("What is the penalty for late filing?")}>Penalty for late filing?</button>
          </div>

          {loading && (
            <div className="bot-response">
              <SixDotsLoader />
              Loading response...
            </div>
          )}

          {response && !loading && <div className="bot-response">{response}</div>}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button onClick={handleSend} className="send-button">➤</button>
        </div>

        <p className="version-text">URA Assistant <span>Powered by MK</span></p>
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


