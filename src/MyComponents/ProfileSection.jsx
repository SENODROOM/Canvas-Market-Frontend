// components/ProfileSection.jsx
import React from 'react';
import { User, Mail, Phone, MapPin, Lock, Camera, Edit2, Save, LogOut, X } from 'lucide-react';

export function ProfileSection({ 
  currentAccount, 
  isEditing, 
  editedData, 
  fileInputRef,
  onPhotoUpload,
  onRemovePhoto,
  onEditDataChange,
  onEdit,
  onSave,
  onCancel,
  onLogout
}) {
  const emojiOptions = ['😊', '🎨', '🚀', '💼', '🎮', '📚', '🎵', '⚡', '🌟', '🔥'];

  return (
    <div className="profile-section">
      <div className="profile-card">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-container">
            {(isEditing ? editedData.photo : currentAccount?.photo) ? (
              <div className="avatar-image">
                <img src={isEditing ? editedData.photo : currentAccount.photo} alt="Profile" />
                {isEditing && (
                  <button className="remove-photo-btn" onClick={onRemovePhoto}>
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
              onChange={onPhotoUpload}
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
                  onClick={() => onEditDataChange({ ...editedData, emoji })}
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
            <button className="edit-btn" onClick={onEdit}>
              <Edit2 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={onSave}>
                <Save size={18} />
                Save Changes
              </button>
              <button className="cancel-btn" onClick={onCancel}>
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
                onChange={(e) => onEditDataChange({ ...editedData, name: e.target.value })}
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
                onChange={(e) => onEditDataChange({ ...editedData, email: e.target.value })}
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
                onChange={(e) => onEditDataChange({ ...editedData, phone: e.target.value })}
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
                onChange={(e) => onEditDataChange({ ...editedData, address: e.target.value })}
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
                onChange={(e) => onEditDataChange({ ...editedData, password: e.target.value })}
                className="field-input"
              />
            ) : (
              <div className="field-value">••••••••••</div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="logout-section">
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
