// components/AccountHeader.jsx
import React from 'react';
import { User, Plus, ChevronRight } from 'lucide-react';

export function AccountHeader({ 
  accounts, 
  currentAccountId, 
  showAccountSwitcher, 
  onToggleSwitcher, 
  onSwitchAccount, 
  onShowCreateAccount 
}) {
  return (
    <header className="account-header">
      <div className="header-content">
        <h1 className="page-title">My Account</h1>
        <div className="header-actions">
          <button 
            className="switch-account-btn"
            onClick={onToggleSwitcher}
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
              onClick={onShowCreateAccount}
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
                onClick={() => onSwitchAccount(account.id)}
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
  );
}
