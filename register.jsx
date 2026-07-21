import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiArrowLeft, FiShield } from 'react-icons/fi';
import { User, Mail, Lock, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
export default function Register() {
  const { register, loading, error, setError } = useContext(AuthContext);
          to="/" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
        >
          <FiArrowLeft size={18} /> Back to Home
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 rounded-3xl glassmorphism shadow-2xl relative border border-white/20 dark:border-slate-800"
        className="w-full max-w-md p-8 rounded-3xl glassmorphism shadow-2xl relative border border-white/20 dark:border-slate-800 text-left"
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
        <div className="text-center space-y-2 mb-6 text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-bold flex items-center justify-center text-xl mx-auto shadow-lg mb-2">
            ⛓️
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Register Node Operator</h2>
          <p className="text-slate-400 text-sm">Create an access account to link certificates</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-center">Register Node Operator</h2>
          <p className="text-slate-400 text-sm text-center">Create an access account to link certificates</p>
        </div>
        {/* Error Alert Box */}
        {(error || validationError) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex gap-3 items-center text-left"
            className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex gap-3 items-center text-left"
          >
            <FiAlertCircle size={20} className="shrink-0" />
            <AlertCircle size={20} className="shrink-0" />
            <p>{validationError || error}</p>
          </motion.div>
        )}
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Username</label>
            <div className="relative mt-1.5">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                placeholder="Rahul_operator" 
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</label>
            <div className="relative mt-1.5">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                placeholder="rahul@university.edu" 
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Password</label>
            <div className="relative mt-1.5">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                placeholder="••••••••" 
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Default Role Node</label>
            <div className="relative mt-1.5">
              <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all dark:bg-slate-900"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all dark:bg-slate-900"
                disabled={loading}
              >
                <option value="Viewer">Viewer (Read-only audits)</option>
                <option value="Staff">Staff (Mines Certificates)</option>
                <option value="Admin">Admin (Full ledger management)</option>
              </select>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 disabled:opacity-50 mt-2"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 disabled:opacity-50 mt-2 animate-transition"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
  );
}
