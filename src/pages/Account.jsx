// AccountPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { User, Plus, ChevronRight, Edit2, Save, X, LogOut } from 'lucide-react';
import { LoginScreen } from '../MyComponents/LoginScreen';
import { CreateAccountModal } from '../MyComponents/CreateAccountModal';
import { AccountHeader } from '../MyComponents/AccountHeader';
import { ProfileSection } from '../MyComponents/ProfileSection';
import { WelcomeScreen } from '../MyComponents/WelcomeScreen';

const API_BASE = 'http://localhost:5001';                          // ← only new line at top

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

  // ── On mount: restore session from localStorage ──────────────────
  // We still use localStorage only for session persistence (who is logged in),
  // but account data always comes from the backend.
  useEffect(() => {
    const savedCurrentId  = localStorage.getItem('currentAccountId');
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    const savedAccounts   = localStorage.getItem('cachedAccounts');  // lightweight cache

    if (savedLoginStatus === 'true' && savedCurrentId && savedAccounts) {
      const parsedAccounts = JSON.parse(savedAccounts);
      setAccounts(parsedAccounts);
      setCurrentAccountId(savedCurrentId);                           // id is now a MongoDB _id string
      setIsLoggedIn(true);
    } else if (savedAccounts) {
      // Accounts exist but not logged in — show login
      setAccounts(JSON.parse(savedAccounts));
      setShowLogin(true);
    }
  }, []);

  // ── Save session to localStorage whenever login state changes ─────
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (currentAccountId) {
      localStorage.setItem('currentAccountId', currentAccountId);
    }
  }, [currentAccountId, isLoggedIn]);

  // ── Keep cached account list in sync ─────────────────────────────
  useEffect(() => {
    if (accounts.length > 0) {
      localStorage.setItem('cachedAccounts', JSON.stringify(accounts));
    }
  }, [accounts]);

  const currentAccount = accounts.find(acc => acc.id === currentAccountId);

  useEffect(() => {
    if (currentAccount) {
      setEditedData(currentAccount);
    }
  }, [currentAccountId]);

  // ── Photo upload (unchanged) ──────────────────────────────────────
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

  // ── Save profile → PUT /update/:id ───────────────────────────────
  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE}/update/${currentAccountId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the account in local list with fresh data from DB
        setAccounts(accounts.map(acc =>
          acc.id === currentAccountId ? data.user : acc
        ));
        setIsEditing(false);
      } else {
        alert(data.message || 'Could not save changes.');
      }
    } catch (err) {
      alert('Cannot connect to server. Is the backend running?');
    }
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

  // ── Create account → POST /register ──────────────────────────────
  // onCreate is called by CreateAccountModal with the real user from DB
  const createNewAccount = (newUser) => {
    setAccounts(prev => [...prev, newUser]);
    setCurrentAccountId(newUser.id);
    setShowCreateAccount(false);
    setIsLoggedIn(true);
  };

  // ── Login → POST /login (handled inside LoginScreen) ─────────────
  // onLogin is called by LoginScreen with the real user object from DB
  const handleLogin = (user) => {
    // Check if this account is already in local list, if not add it
    setAccounts(prev => {
      const exists = prev.find(acc => acc.id === user.id);
      return exists ? prev : [...prev, user];
    });
    setCurrentAccountId(user.id);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  // ── Logout ────────────────────────────────────────────────────────
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentAccountId(null);
    setShowLogin(true);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentAccountId');
  };

  const removePhoto = () => {
    setEditedData({ ...editedData, photo: null });
  };

  // ── Render: show login if not logged in ───────────────────────────
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
      {accounts.length === 0 ? (
        <WelcomeScreen onCreateAccount={() => setShowCreateAccount(true)} />
      ) : (
        <div className="account-container">
          <AccountHeader
            accounts={accounts}
            currentAccountId={currentAccountId}
            showAccountSwitcher={showAccountSwitcher}
            onToggleSwitcher={() => setShowAccountSwitcher(!showAccountSwitcher)}
            onSwitchAccount={switchAccount}
            onShowCreateAccount={() => {
              setShowCreateAccount(true);
              setShowAccountSwitcher(false);
            }}
          />

          <ProfileSection
            currentAccount={currentAccount}
            isEditing={isEditing}
            editedData={editedData}
            fileInputRef={fileInputRef}
            onPhotoUpload={handlePhotoUpload}
            onRemovePhoto={removePhoto}
            onEditDataChange={setEditedData}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={handleCancel}
            onLogout={handleLogout}
          />
        </div>
      )}

      {showCreateAccount && (
        <CreateAccountModal
          onClose={() => setShowCreateAccount(false)}
          onCreate={createNewAccount}
        />
      )}
    </div>
  );
}