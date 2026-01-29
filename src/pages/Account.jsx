// AccountPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { User, Plus, ChevronRight, Edit2, Save, X, LogOut } from 'lucide-react';
import { LoginScreen } from '../MyComponents/LoginScreen';
import { CreateAccountModal } from '../MyComponents/CreateAccountModal';
import { AccountHeader } from '../MyComponents/AccountHeader';
import { ProfileSection } from '../MyComponents/ProfileSection';
import { WelcomeScreen } from '../MyComponents/WelcomeScreen';

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
      {/* Show welcome screen if no accounts */}
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