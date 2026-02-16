// LoginScreen.jsx
import React, { useState } from 'react';
import { Lock, Plus } from 'lucide-react';
import { useCart } from '../ContextProviders/CartContext';

const API_BASE = 'http://localhost:5001';

export function LoginScreen({ accounts, onLogin, onCreateNew }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserId, fetchCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update cart context with userId
        setUserId(data.user.id);
        
        // Fetch user's cart from backend
        fetchCart(data.user.id);
        
        // Call parent's onLogin callback
        onLogin(data.user);
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Cannot connect to server. Is the backend running?');
    } finally {
      setLoading(false);
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            <Lock size={18} />
            {loading ? 'Signing in...' : 'Sign In'}
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