import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Lock, Camera, Plus, LogOut, ChevronRight, Edit2, Save, X } from 'lucide-react';


export default function AccountPage() {
  const [accounts, setAccounts] = useState([]);
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editedData, setEditedData] = useState({});
  const fileInputRef = useRef(null);

  // Load accounts from localStorage on mount
  useEffect(() => {
    const savedAccounts = localStorage.getItem('userAccounts');
    const savedCurrentId = localStorage.getItem('currentAccountId');
    const savedLoginStatus = localStorage.getItem('isLoggedIn');

    if (savedAccounts) {
      const parsedAccounts = JSON.parse(savedAccounts);
      setAccounts(parsedAccounts);
      
      if (savedLoginStatus === 'true' && savedCurrentId) {
        setCurrentAccountId(parseInt(savedCurrentId));
        setIsLoggedIn(true);
      } else if (parsedAccounts.length > 0) {
        setShowLogin(true);
      }
    }
  }, []);

  // Save accounts to localStorage whenever they change
  useEffect(() => {
    if (accounts.length > 0) {
      localStorage.setItem('userAccounts', JSON.stringify(accounts));
    }
  }, [accounts]);

  // Save current account ID and login status
  useEffect(() => {
    if (currentAccountId) {
      localStorage.setItem('currentAccountId', currentAccountId.toString());
    }
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [currentAccountId, isLoggedIn]);

  const currentAccount = accounts.find(acc => acc.id === currentAccountId);

  useEffect(() => {
    if (currentAccount) {
      setEditedData(currentAccount);
    }
  }, [currentAccountId]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({ ...editedData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setAccounts(accounts.map(acc => 
      acc.id === currentAccountId ? { ...editedData } : acc
    ));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(currentAccount);
    setIsEditing(false);
  };

  const switchAccount = (accountId) => {
    setCurrentAccountId(accountId);
    setShowAccountSwitcher(false);
    setIsEditing(false);
    setIsLoggedIn(true);
  };

  const createNewAccount = (newAccountData) => {
    const newAccount = {
      ...newAccountData,
      id: accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      emoji: '😊'
    };
    setAccounts([...accounts, newAccount]);
    setCurrentAccountId(newAccount.id);
    setShowCreateAccount(false);
    setIsLoggedIn(true);
  };

  const handleLogin = (email, password) => {
    const account = accounts.find(acc => acc.email === email && acc.password === password);
    if (account) {
      setCurrentAccountId(account.id);
      setIsLoggedIn(true);
      setShowLogin(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentAccountId(null);
    setShowLogin(true);
    localStorage.setItem('isLoggedIn', 'false');
  };

  const removePhoto = () => {
    setEditedData({ ...editedData, photo: null });
  };

  const emojiOptions = ['😊', '🎨', '🚀', '💼', '🎮', '📚', '🎵', '⚡', '🌟', '🔥'];

  // Show login screen if accounts exist but not logged in
  if (accounts.length > 0 && !isLoggedIn) {
    return (
      <>
        <div className="account-page">
          <div className="animated-bg">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
          {showLogin && (
            <LoginScreen 
              accounts={accounts}
              onLogin={handleLogin}
              onCreateNew={() => {
                setShowLogin(false);
                setShowCreateAccount(true);
              }}
            />
          )}
        </div>
        {showCreateAccount && (
          <CreateAccountModal
            onClose={() => {
              setShowCreateAccount(false);
              setShowLogin(true);
            }}
            onCreate={createNewAccount}
          />
        )}
      </>
    );
  }

  return (
    <div className="account-page">
      {/* Animated Background */}
   

      {/* Show welcome screen if no accounts */}
      {accounts.length === 0 ? (
        <div className="welcome-container">
          <div className="welcome-content">
            <div className="welcome-icon">
              <User size={80} />
            </div>
            <h1 className="welcome-title">Welcome!</h1>
            <p className="welcome-subtitle">Create your first account to get started</p>
            <button 
              className="create-first-account-btn"
              onClick={() => setShowCreateAccount(true)}
            >
              <Plus size={20} />
              Create Your Account
            </button>
          </div>
        </div>
      ) : (
        <div className="account-container">
          {/* Header */}
          <header className="account-header">
            <div className="header-content">
              <h1 className="page-title">My Account</h1>
              <div className="header-actions">
                <button 
                  className="switch-account-btn"
                  onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
                >
                  <User size={18} />
                  Switch Account
                  <ChevronRight size={16} className={`chevron ${showAccountSwitcher ? 'rotate' : ''}`} />
                </button>
              </div>
            </div>

            {/* Account Switcher Dropdown */}
            {showAccountSwitcher && (
              <div className="account-switcher">
                <div className="switcher-header">
                  <span>Your Accounts</span>
                  <button 
                    className="add-account-btn"
                    onClick={() => {
                      setShowCreateAccount(true);
                      setShowAccountSwitcher(false);
                    }}
                  >
                    <Plus size={16} />
                    Add Account
                  </button>
                </div>
                <div className="accounts-list">
                  {accounts.map(account => (
                    <div 
                      key={account.id}
                      className={`account-item ${account.id === currentAccountId ? 'active' : ''}`}
                      onClick={() => switchAccount(account.id)}
                    >
                      <div className="account-item-avatar">
                        {account.photo ? (
                          <img src={account.photo} alt={account.name} />
                        ) : (
                          <span className="emoji">{account.emoji}</span>
                        )}
                      </div>
                      <div className="account-item-info">
                        <div className="account-item-name">{account.name}</div>
                        <div className="account-item-email">{account.email}</div>
                      </div>
                      {account.id === currentAccountId && (
                        <div className="active-badge">Active</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Main Profile Section */}
          <div className="profile-section">
            <div className="profile-card">
              {/* Avatar Section */}
              <div className="avatar-section">
                <div className="avatar-container">
                  {(isEditing ? editedData.photo : currentAccount?.photo) ? (
                    <div className="avatar-image">
                      <img src={isEditing ? editedData.photo : currentAccount.photo} alt="Profile" />
                      {isEditing && (
                        <button className="remove-photo-btn" onClick={removePhoto}>
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="avatar-emoji">
                      <span>{isEditing ? editedData.emoji : currentAccount?.emoji}</span>
                    </div>
                  )}
                  
                  {isEditing && (
                    <button 
                      className="camera-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={20} />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Emoji Selector (only when editing and no photo) */}
                {isEditing && !editedData.photo && (
                  <div className="emoji-selector">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        className={`emoji-option ${editedData.emoji === emoji ? 'selected' : ''}`}
                        onClick={() => setEditedData({ ...editedData, emoji })}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                <div className="profile-name">
                  <h2>{currentAccount?.name}</h2>
                  <p className="member-since">
                    Member since {new Date(currentAccount?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Edit/Save Buttons */}
              <div className="action-buttons">
                {!isEditing ? (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSave}>
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Fields */}
              <div className="profile-fields">
                <div className="field-group">
                  <label>
                    <User size={18} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                      className="field-input"
                    />
                  ) : (
                    <div className="field-value">{currentAccount?.name}</div>
                  )}
                </div>

                <div className="field-group">
                  <label>
                    <Mail size={18} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                      className="field-input"
                    />
                  ) : (
                    <div className="field-value">{currentAccount?.email}</div>
                  )}
                </div>

                <div className="field-group">
                  <label>
                    <Phone size={18} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                      className="field-input"
                    />
                  ) : (
                    <div className="field-value">{currentAccount?.phone}</div>
                  )}
                </div>

                <div className="field-group">
                  <label>
                    <MapPin size={18} />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedData.address}
                      onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                      className="field-input"
                      rows="2"
                    />
                  ) : (
                    <div className="field-value">{currentAccount?.address}</div>
                  )}
                </div>

                <div className="field-group">
                  <label>
                    <Lock size={18} />
                    Password
                  </label>
                  {isEditing ? (
                    <input
                      type="password"
                      value={editedData.password}
                      onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                      className="field-input"
                    />
                  ) : (
                    <div className="field-value">••••••••••</div>
                  )}
                </div>
              </div>

              {/* Logout Button */}
              <div className="logout-section">
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {showCreateAccount && (
        <CreateAccountModal
          onClose={() => setShowCreateAccount(false)}
          onCreate={createNewAccount}
        />
      )}
    </div>
  );
}

function LoginScreen({ accounts, onLogin, onCreateNew }) {
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

function CreateAccountModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    photo: null,
  });

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      onCreate(formData);
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

          <button type="submit" className="submit-btn">
            <Plus size={18} />
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}