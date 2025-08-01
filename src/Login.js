// src/Login.js
import React from "react";
import "./SocialLogin.css"; 

const Login = () => {
  const handleDummyLogin = () => {
    alert("This login option is currently disabled.");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
           <h2>URA Tax Assistant</h2>
        </div>

        <div className="login-body">
          <h3 className="form-title">Welcome back!</h3>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter username/Email"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
            />
          </form>

          <div className="separator">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <button className="social-button google" onClick={handleDummyLogin}>
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google"
            />
            Continue with Google
          </button>

          <button className="social-button microsoft" onClick={handleDummyLogin}>
            <img
              src="https://img.icons8.com/color/16/000000/microsoft.png"
              alt="Microsoft"
            />
            Continue with Microsoft Account
          </button>

          <button className="social-button apple" onClick={handleDummyLogin}>
            <img
              src="https://img.icons8.com/ios-filled/16/000000/mac-os.png"
              alt="Apple"
            />
            Continue with Apple
          </button>

          <button className="social-button phone" onClick={handleDummyLogin}>
            <img
              src="https://img.icons8.com/ios-filled/16/000000/phone.png"
              alt="Phone"
            />
            Continue with phone
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
