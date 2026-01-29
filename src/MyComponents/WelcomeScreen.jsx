// components/WelcomeScreen.jsx
import React from 'react';
import { User, Plus } from 'lucide-react';

export function WelcomeScreen({ onCreateAccount }) {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-icon">
          <User size={80} />
        </div>
        <h1 className="welcome-title">Welcome!</h1>
        <p className="welcome-subtitle">Create your first account to get started</p>
        <button 
          className="create-first-account-btn"
          onClick={onCreateAccount}
        >
          <Plus size={20} />
          Create Your Account
        </button>
      </div>
    </div>
  );
}
