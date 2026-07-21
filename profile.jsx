import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiKey, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { User, Mail, Key, CheckCircle, AlertCircle, Phone, Wallet, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Profile() {
  const { user, updateProfile, changePassword } = useContext(AuthContext);
  const studentProfile = user?.studentProfile || {};
  // Profile forms state
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');
  const [phone, setPhone] = useState(studentProfile.phone || '');
  
  // Password forms state
  const [currentPassword, setCurrentPassword] = useState('');
    if (!username || !email) {
      setProfileError('Username and email are required fields.');
      toast.error('Required fields are missing.');
      return;
    }
    const res = await updateProfile({ username, email, profilePhoto });
    const res = await updateProfile({ username, email, profilePhoto, phone });
    if (res.success) {
      setProfileSuccess('Profile metadata updated successfully.');
      toast.success('Profile updated!');
    } else {
      setProfileError(res.message);
      toast.error(res.message || 'Profile update failed.');
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');
    if (!currentPassword || !newPassword) {
      setPasswordError('Please fill out all password fields.');
      toast.error('Password fields cannot be blank.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      toast.error('Passwords mismatch.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password length must be at least 6 characters.');
      toast.error('Password too short.');
      return;
    }
    const res = await changePassword({ currentPassword, newPassword });
    if (res.success) {
      setPasswordSuccess('Password changed successfully.');
      toast.success('Password changed!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError(res.message);
      toast.error(res.message || 'Change password failed.');
    }
  };
  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Profile Settings</h2>
        <p className="text-sm text-slate-400 mt-1">Manage institutional account details, credentials, and settings.</p>
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-sm text-slate-400 mt-1">Manage institutional account details, security credentials, and contact info.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Avatar & Role Badge */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary text-white text-3xl font-bold flex items-center justify-center shadow-lg relative overflow-hidden">
        {/* Left Side Avatar Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col items-center justify-center text-center gap-4">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary to-secondary text-white text-3xl font-extrabold flex items-center justify-center shadow-lg relative overflow-hidden group">
            {profilePhoto ? (
              <img src={profilePhoto} alt={user?.username} className="w-full h-full object-cover" />
            ) : (
              user?.username?.substring(0, 2).toUpperCase()
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg capitalize">{user?.username}</h3>
            <h3 className="font-bold text-lg capitalize">{studentProfile.name || user?.username}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-xs font-bold uppercase tracking-wider">
            {user?.role} Node Operator
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-[10px] font-bold uppercase tracking-wider">
            {user?.role} Portal Node
          </span>
        </div>
        {/* Right Side: Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Form 1: Profile Info */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
            <h4 className="font-bold text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <FiUser className="text-primary" /> Profile Credentials
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-6">
            <h4 className="font-bold text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-3">
              <User className="text-primary" size={18} /> Profile Credentials
            </h4>
            
            {profileSuccess && (
              <div className="p-3.5 rounded-xl bg-success/10 border border-success/20 text-success text-xs flex gap-2 items-center">
                <FiCheckCircle size={16} />
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex gap-2 items-center">
                <CheckCircle size={16} />
                <span>{profileSuccess}</span>
              </div>
            )}
            {profileError && (
              <div className="p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs flex gap-2 items-center">
                <FiAlertCircle size={16} />
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex gap-2 items-center">
                <AlertCircle size={16} />
                <span>{profileError}</span>
              </div>
            )}
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Username</label>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Username / ID</label>
                  <input 
                    type="text" 
                    value={username}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Profile Avatar Image Link</label>
                <input 
                  type="text" 
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Phone Number</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                    placeholder="+1 555-0928"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Profile Photo Link</label>
                  <input 
                    type="text" 
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
              </div>
              
              {user?.role === 'Student' && (
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Ethereum Wallet Address</label>
                  <div className="relative mt-1.5">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={studentProfile.walletAddress || ''}
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-450 focus:outline-none font-mono text-xs cursor-not-allowed" 
                      readOnly
                    />
                  </div>
                </div>
              )}
              <button 
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-md transition-colors"
              >
                Save Details
              </button>
            </form>
          </div>
          {/* Form 2: Password Edit */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
            <h4 className="font-bold text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <FiKey className="text-secondary" /> Change Security Password
          {/* Form 2: Password Change */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-6">
            <h4 className="font-bold text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-3">
              <Key className="text-secondary" size={18} /> Change Password
            </h4>
            {passwordSuccess && (
              <div className="p-3.5 rounded-xl bg-success/10 border border-success/20 text-success text-xs flex gap-2 items-center">
                <FiCheckCircle size={16} />
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex gap-2 items-center">
                <CheckCircle size={16} />
                <span>{passwordSuccess}</span>
              </div>
            )}
            {passwordError && (
              <div className="p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs flex gap-2 items-center">
                <FiAlertCircle size={16} />
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex gap-2 items-center">
                <AlertCircle size={16} />
                <span>{passwordError}</span>
              </div>
            )}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                    required
                  />
                </div>
              </div>
  );
}
