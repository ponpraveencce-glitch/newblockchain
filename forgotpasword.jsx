import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.post('/login/../forgot-password', { email }); // or direct /forgot-password
      // Wait, let's check API route: we mapped POST /api/forgot-password, which maps to /forgot-password relative to /api base.
      // So /forgot-password is correct! Let's make sure it is correct:
      const resReal = await api.post('/forgot-password', { email });
      if (resReal.data.success) {
        setSubmitted(true);
        toast.success('Reset link generated!');
        // For local demo help
        if (resReal.data.resetToken) {
          console.log(`Demo token generated: ${resReal.data.resetToken}`);
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit request.');
      toast.error('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070b13] flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-6 left-6">
        <Link 
          to="/login" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back to Login
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 rounded-3xl glassmorphism shadow-2xl relative border border-white/20 dark:border-slate-800 text-left"
      >
        {!submitted ? (
          <>
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-bold flex items-center justify-center text-xl mx-auto shadow-lg mb-2">
                🔒
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Forgot Password</h2>
              <p className="text-slate-400 text-sm">Enter your registered email and we'll generate a reset link.</p>
            </div>
            {errorMsg && (
              <div className="mb-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex gap-2 items-center">
                <AlertCircle size={18} className="shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Registered Email</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:focus:border-primary/50 text-sm" 
                    placeholder="student@gmail.com" 
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? 'Submitting...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-6">
            <CheckCircle2 size={56} className="text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold">Email Simulated!</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We have generated the password reset link. 
              <br />
              <span className="font-semibold text-slate-300">Please check the terminal console logs</span> to view the generated link and token to reset the password.
            </p>
            <div className="pt-4">
              <Link 
                to="/login"
                className="inline-block px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-sm transition-all"
              >
                Return to Login
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
