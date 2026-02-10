// components/CreateAccountModal.jsx
import React, { useState, useRef } from 'react';
import { Camera, Plus, X } from 'lucide-react';

const API_BASE = 'http://localhost:5001';                          // ← only addition at top

export function CreateAccountModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    photo: null,
  });

  const [loading, setLoading] = useState(false);                  // ← new: tracks request in-flight
  const [error, setError]     = useState('');                     // ← new: shows server errors

  const fileInputRef = useRef(null);

  // ↓ was sync, now async — everything else inside is the same logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {

      setLoading(true);                                            // ← disable button while waiting
      setError('');

      try {
        const response = await fetch(`${API_BASE}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          onCreate(data.user);                                     // ← same call as before, just with real user from DB
        } else {
          setError(data.message || 'Could not create account.');
        }
      } catch (err) {
        setError('Cannot connect to server. Is the backend running?');
      } finally {
        setLoading(false);                                         // ← re-enable button either way
      }

    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Account</h2>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-account-form">
          <div className="form-avatar-section">
            <div className="form-avatar" onClick={() => fileInputRef.current?.click()}>
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">
                  <Camera size={32} />
                  <span>Add Photo</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Your address"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a strong password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}     {/* ← only shows if server returns error */}

          <button type="submit" className="submit-btn" disabled={loading}>
            <Plus size={18} />
            {loading ? 'Creating...' : 'Create Account'}          {/* ← text swap only, same class */}
          </button>
        </form>
      </div>
    </div>
  );
}