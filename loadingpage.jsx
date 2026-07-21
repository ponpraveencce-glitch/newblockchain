import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { 
  FiCheckCircle, 
  FiFileText, 
  FiCpu, 
  FiSearch, 
  FiLock, 
  FiShield, 
  FiMoon, 
  FiSun, 
  FiMenu, 
  FiX, 
  FiChevronDown, 
  FiSend, 
  FiBarChart2, 
  FiDatabase,
  FiExternalLink
} from 'react-icons/fi';
  CheckCircle, 
  FileText, 
  Cpu, 
  Search, 
  Lock, 
  Shield, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronDown, 
  Send, 
  TrendingUp, 
  Database,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';
export default function LandingPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [stats, setStats] = useState({ totalCertificates: 125, verifiedCertificates: 125, totalUsers: 14 });
  const [stats, setStats] = useState({ totalCertificates: 350, verifiedCertificates: 350, totalUsers: 8 });
  const navigate = useNavigate();
  // Load actual count from backend if available, otherwise use defaults
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get('/blockchain');
        if (res.data.success) {
          const total = res.data.count || 0;
          const total = res.data.transactions?.length || 0;
          setStats({
            totalCertificates: total > 0 ? total - 1 : 0, // exclude genesis
            verifiedCertificates: total > 0 ? total - 1 : 0,
            totalUsers: 3
            totalCertificates: total,
            verifiedCertificates: total,
            totalUsers: 8
          });
        }
      } catch (err) {
        // Fallback to static numbers
      }
    };
    loadStats();
  }, []);
  const features = [
    {
      title: 'SHA-256 Ledger Security',
      desc: 'Each certificate generates a unique block signature, embedding metadata directly inside the cryptographic block hash.',
      icon: <FiLock className="text-secondary" size={24} />
      title: 'Smart Contract Signatures',
      desc: 'Each certificate generates a unique cryptographic hash on-chain, embedding student details inside an immutable smart contract record.',
      icon: <Lock className="text-secondary" size={24} />
    },
    {
      title: 'Instant QR Verification',
      title: 'Instant QR Auditing',
      desc: 'Generate customized high-resolution QR codes mapped to digital certificates, enabling anyone to scan and audit validity.',
      icon: <FiCpu className="text-primary" size={24} />
      icon: <Cpu className="text-primary" size={24} />
    },
    {
      title: 'Tamper-Proof Auditing',
      desc: 'Verify if any certificate text has been edited in the database. Our algorithm automatically flags changes as "Tampered".',
      icon: <FiShield className="text-success" size={24} />
      desc: 'Verify if any certificate text has been edited in the database. Our smart contract verification validation flags alterations immediately.',
      icon: <Shield className="text-success" size={24} />
    },
    {
      title: 'Immutable Blockchain Explorer',
      desc: 'Explore blocks sequentially. Review previous hashes, timestamp logging, proof-of-work metrics, and nonces.',
      icon: <FiDatabase className="text-warning" size={24} />
      title: 'Immutable Ledger Explorer',
      desc: 'Explore blocks sequentially. Review previous hashes, timestamp logging, transaction metrics, and block heights.',
      icon: <Database className="text-warning" size={24} />
    }
  ];
  const faqs = [
    {
      q: 'How does the blockchain simulation work?',
      a: 'When an admin issues a certificate, the system hashes its metadata and links it with the previous block\'s hash. It then runs a Proof of Work simulation (mining) to solve a puzzle. The mined block is saved in an immutable chain.'
      q: 'How does the blockchain smart contract work?',
      a: 'When an admin issues a certificate, the system hashes its metadata and pdf file. It executes a smart contract transaction that registers the student hash. The contract records this verification payload securely on the blockchain ledger.'
    },
    {
      q: 'What happens if certificate details are modified in the database?',
      a: 'During verification, the system re-calculates the certificate\'s SHA-256 hash. It compares this against the immutable block hash stored in the ledger. If they don\'t match, the verification status changes to "Tampered" immediately.'
      a: 'During verification, the system re-calculates the certificate\'s SHA-256 hash. It queries the smart contract blockchain registry to match hashes. If they do not match, the verification status changes to "Tampered" immediately.'
    },
    {
      q: 'Who can issue and verify certificates?',
      a: 'Authorized educational institution roles (Admin and Staff) can create/issue certificates. Anyone (employers, agencies, general public) can verify them instantly via QR code or Certificate ID without logging in.'
      a: 'Authorized educational institution roles (Admin) can create/issue certificates. Anyone (employers, agencies, general public) can verify them instantly via QR code or Certificate ID without logging in.'
    }
  ];
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b13] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b13] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden text-left">
      
      {/* Dynamic Background Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none" />
          <a href="#how-it-works" className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200">Process</a>
          <a href="#faq" className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200">FAQ</a>
          <Link to="/blockchain" className="flex items-center gap-1 hover:text-primary dark:hover:text-primary-light transition-colors duration-200">
            Explorer <FiExternalLink size={14} />
            Explorer <ExternalLink size={14} />
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {user ? (
        {/* Mobile Nav Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-slate-500">
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-500">
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-white dark:bg-[#0f172a] shadow-lg border-b border-slate-200 dark:border-slate-800 z-30 flex flex-col p-6 gap-4 md:hidden"
            className="fixed inset-x-0 top-16 bg-white dark:bg-[#0f172a] shadow-lg border-b border-slate-200 dark:border-slate-800 z-30 flex flex-col p-6 gap-4 md:hidden text-left"
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">About</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">Process</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">FAQ</a>
            <Link to="/blockchain" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1">
              Explorer <FiExternalLink size={14} />
              Explorer <ExternalLink size={14} />
            </Link>
            
            {user ? (
      </AnimatePresence>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-left">
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left">
        <div className="flex-1 space-y-6">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light font-semibold text-xs tracking-wider uppercase border border-primary/20"
          >
            Next-Gen Cryptographic Security
            Decentralized Credential Ledger
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl"
          >
            Issue digital credentials secured by SHA-256 blocks. Allow recruiters, universities, and public agencies to audit credentials instantly via secure QR validation.
            Issue student credentials verified by Ethereum Smart Contracts. Allow recruiters, universities, and public agencies to audit credentials instantly via secure QR validation.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link to="/verify" className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-[1.03] transition-all shadow-lg flex items-center gap-2">
              <FiSearch size={18} /> Verify a Certificate
              <Search size={18} /> Verify a Certificate
            </Link>
            <Link to="/blockchain" className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
              <FiDatabase size={18} /> Explore Ledger
              <Database size={18} /> Explore Ledger
            </Link>
          </motion.div>
        </div>
        {/* Hero Interactive Illustration */}
        {/* Hero Illustration */}
        <div className="flex-1 w-full max-w-md md:max-w-none relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="w-full aspect-square max-w-[420px] rounded-3xl bg-gradient-to-tr from-primary/10 via-secondary/15 to-purple-500/10 border border-white/20 dark:border-slate-800 flex flex-col p-6 glassmorphism relative shadow-2xl overflow-hidden"
            className="w-full aspect-square max-w-[420px] rounded-3xl bg-gradient-to-tr from-primary/10 via-secondary/15 to-purple-500/10 border border-white/20 dark:border-slate-800 flex flex-col p-6 glassmorphism relative shadow-2xl overflow-hidden text-left"
          >
            <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50 pb-4 mb-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <span className="text-xs font-mono text-slate-400">Node Status: SECURED</span>
              <span className="text-xs font-mono text-slate-400">Node Status: ONLINE</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-4 relative">
            <div className="flex-1 flex flex-col justify-center items-center gap-4 relative text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                Blockchain Block Mined
              </p>
              
              {/* Fake Mined Details */}
              <div className="w-full bg-slate-100/60 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-left font-mono text-[10px] space-y-1">
                <p className="text-success truncate"><span className="text-slate-400">CURRENT HASH:</span> 0000a12e9b882fc0d172</p>
                <p className="truncate"><span className="text-slate-400">PREV HASH:</span> 00005d4b8e23f110c9a1</p>
                <p><span className="text-slate-400">NONCE:</span> 34,291</p>
                <p className="text-emerald-500 truncate"><span className="text-slate-400">CONTRACT:</span> 0x5FbDB2315678afecb367f032d93F642f64180aa3</p>
                <p className="truncate"><span className="text-slate-400">RECORD HASH:</span> 0x5fbdb2315678afecb367f032d93f642f64180aa3...</p>
                <p><span className="text-slate-400">STATUS:</span> MINED & CONFIRMED</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Statistics panel */}
      <section className="bg-white/40 dark:bg-slate-950/40 border-y border-slate-200/40 dark:border-slate-800/40 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
      <section className="bg-white/40 dark:bg-slate-950/40 border-y border-slate-200/40 dark:border-slate-800/40 py-12 px-6 md:px-12 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-4">
            <h3 className="text-4xl font-extrabold text-primary dark:text-primary-light">{stats.totalCertificates}</h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">Total Certificates Issued</p>
          </div>
          <div className="p-4 border-y sm:border-y-0 sm:border-x border-slate-200/40 dark:border-slate-800/40">
            <h3 className="text-4xl font-extrabold text-success">{stats.verifiedCertificates}</h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">Secured Blocks Mined</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">On-Chain Secured Records</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-extrabold text-secondary dark:text-secondary-light">{stats.totalUsers}</h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">Registered Institutions</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">Active Academic Nodes</p>
          </div>
        </div>
      </section>
      {/* About & Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">System Strengths</span>
          <h2 className="text-3xl md:text-4xl font-extrabold">Cryptographic Integrity</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Engineered with a simulated decentralization ledger mimicking core blockchain proof of work behaviors to establish ultimate transparency.
          <span className="text-xs font-bold text-secondary tracking-widest uppercase block">System Strengths</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center">Cryptographic Integrity</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-center">
            Engineered with Ethereum smart contracts to guarantee tamper-proof validation of educational credentials.
          </p>
        </div>
      </section>
      {/* How it Works / Process */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 bg-slate-100/55 dark:bg-slate-950/20 border-y border-slate-200/50 dark:border-slate-800/50">
      <section id="how-it-works" className="py-20 px-6 md:px-12 bg-slate-100/55 dark:bg-slate-950/20 border-y border-slate-200/50 dark:border-slate-800/50 text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Operational Flow</span>
            <h2 className="text-3xl md:text-4xl font-bold">How Verification Works</h2>
            <p className="text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold text-primary tracking-widest uppercase block">Operational Flow</span>
            <h2 className="text-3xl md:text-4xl font-bold text-center">How Verification Works</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center">
              The lifecycle of a certificate from upload mining to instant public validation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative text-center">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 p-4 relative z-10">
            <div className="flex flex-col items-center space-y-4 p-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-xl shadow-lg shadow-primary/5">
                01
              </div>
              <h4 className="font-bold text-lg">Upload PDF & Metadata</h4>
              <h4 className="font-bold text-lg">Upload PDF & Details</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Institution uploads the official PDF certificate and registers details (student name, register ID, course) in the Portal.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 p-4 relative z-10">
            <div className="flex flex-col items-center space-y-4 p-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center text-secondary font-bold text-xl shadow-lg shadow-secondary/5">
                02
              </div>
              <h4 className="font-bold text-lg">Cryptographic Proof of Work</h4>
              <h4 className="font-bold text-lg">Smart Contract Registry</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                A custom algorithm hashes details, generates a QR code, links previous block hashes, and executes a mining cycle to resolve the block.
                A custom algorithm hashes details, generates a QR code, and triggers an on-chain transaction registering the cryptographic signature.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 p-4 relative z-10">
            <div className="flex flex-col items-center space-y-4 p-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-success/10 border-2 border-success flex items-center justify-center text-success font-bold text-xl shadow-lg shadow-success/5">
                03
              </div>
              <h4 className="font-bold text-lg">Instant Validation</h4>
              <h4 className="font-bold text-lg">Instant Verification</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                A recruiter or viewer scans the QR code or searches the ID. System hashes current details to verify block hashes align perfectly.
                A recruiter or viewer scans the QR code or searches the ID. System hashes current details to verify smart contract signatures align perfectly.
              </p>
            </div>
            
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
      <section id="faq" className="py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-12 text-left">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">FAQ</span>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase block text-center">FAQ</span>
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4 text-left">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/60 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition-colors"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown 
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} 
                    size={18} 
                  />
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Get in Touch</span>
      <section id="contact" className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <div className="space-y-6">
          <span className="text-xs font-bold text-primary tracking-widest uppercase block">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Need Enterprise Integration?</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
            Connect our blockchain certificate issuing pipelines directly to your University Management Systems. Request a custom demo.
        {/* Contact Form */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Full Name</label>
              type="submit" 
              className="w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
            >
              <FiSend size={16} /> Send Enquiry
              <Send size={16} /> Send Enquiry
            </button>
          </form>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070b13] py-12 px-6 md:px-12 text-center text-sm text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-xs font-bold">⛓️</span>
            <span className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-xs font-bold font-mono">⛓️</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">BlockVerify Systems</span>
          </div>
          <p>© {new Date().getFullYear()} Blockchain Based Certificate Verification. All Rights Reserved.</p>
  );
}
