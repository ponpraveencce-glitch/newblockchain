import React, { useState, useContext } from 'react';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { Mail, Lock, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Login() {
  const { login, loading, error, setError } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();
  // Load remembered email on startup
  useEffect(() => {
    setError(null);
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [setError]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setError(null);
    // Password validation (min 6 characters)
    if (!email || !password) {
      setValidationError('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }
    if (rememberMe) {
      localStorage.setItem('remembered_email', email);
    } else {
      localStorage.removeItem('remembered_email');
    }
    const res = await login(email, password);
    if (res.success) {
      toast.success(`Welcome back, ${res.user.username}!`);
      navigate('/dashboard');
    } else {
      toast.error(res.message || 'Invalid credentials');
    }
  };
          to="/" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
        >
          <FiArrowLeft size={18} /> Back to Home
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-bold flex items-center justify-center text-xl mx-auto shadow-lg mb-2">
            ⛓️
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Institution Login</h2>
          <p className="text-slate-400 text-sm">Access the secure certificate issuance portal</p>
          <h2 className="text-2xl font-extrabold tracking-tight">System Portal Login</h2>
          <p className="text-slate-400 text-sm">Access the digital certificate secure dashboard</p>
        </div>
        {/* Error Alert Box */}
        {(error || validationError) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex gap-3 items-center text-left"
            className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm flex gap-3 items-center text-left"
          >
            <FiAlertCircle size={20} className="shrink-0" />
            <AlertCircle size={20} className="shrink-0" />
            <p>{validationError || error}</p>
          </motion.div>
        )}
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Institutional Email</label>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</label>
            <div className="relative mt-1.5">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                placeholder="admin@gmail.com" 
                placeholder="admin@gmail.com or student@gmail.com" 
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Password</label>
            </div>
            <div className="relative mt-1.5">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm transition-all" 
                placeholder="••••••••" 
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-250"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-500 dark:text-slate-400">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-350 text-primary focus:ring-primary/30"
              />
              Remember Me
            </label>
            <Link 
              to="/forgot-password" 
              className="text-primary dark:text-primary-light font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button 
            type="submit" 
            disabled={loading}
        <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-200/50 dark:border-slate-800/50 pt-4 font-mono leading-relaxed">
          <p>Demo Accounts:</p>
          <p className="mt-1 font-semibold">Admin: admin@gmail.com / admin123</p>
          <p className="font-semibold">Staff: staff@gmail.com / staff123</p>
          <p className="font-semibold">Student: student@gmail.com / student123</p>
        </div>
      </motion.div>
      
    </div>
  );
}
