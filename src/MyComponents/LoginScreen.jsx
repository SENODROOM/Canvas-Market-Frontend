// components/LoginScreen.jsx
import React, { useState } from 'react';
import { Lock, Plus } from 'lucide-react';

export function LoginScreen({ accounts, onLogin, onCreateNew }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-icon">
          <Lock size={60} />
        </div>
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-submit-btn">
            <Lock size={18} />
            Sign In
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <button className="create-new-account-btn" onClick={onCreateNew}>
          <Plus size={18} />
          Create New Account
        </button>

        <div className="existing-accounts">
          <p className="existing-accounts-label">Existing Accounts:</p>
          <div className="existing-accounts-list">
            {accounts.map(acc => (
              <div key={acc.id} className="existing-account-item">
                <div className="existing-account-avatar">
                  {acc.photo ? (
                    <img src={acc.photo} alt={acc.name} />
                  ) : (
                    <span className="emoji">{acc.emoji}</span>
                  )}
                </div>
                <span>{acc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
