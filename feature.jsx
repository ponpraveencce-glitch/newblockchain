import React from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiCpu, FiShield, FiDatabase, FiLayers, FiActivity, FiKey, FiUsers } from 'react-icons/fi';
import { Lock, Cpu, Shield, Database, Layers, Activity, Key, Users } from 'lucide-react';
export default function Features() {
  const featureList = [
    { title: 'SHA-256 Ledger Security', desc: 'Each certificate generates a unique block signature, embedding metadata directly inside the cryptographic block hash.', icon: <FiLock size={20} className="text-primary" /> },
    { title: 'Instant QR Verification', desc: 'Generate customized high-resolution QR codes mapped to digital certificates, enabling anyone to scan and audit validity.', icon: <FiCpu size={20} className="text-secondary" /> },
    { title: 'Tamper-Proof Auditing', desc: 'Verify if any certificate text has been edited. Our algorithm automatically flags changes as "Tampered".', icon: <FiShield size={20} className="text-success" /> },
    { title: 'Blockchain Explorer', desc: 'Explore blocks sequentially. Review previous hashes, timestamp logging, proof-of-work metrics, and nonces.', icon: <FiDatabase size={20} className="text-warning" /> },
    { title: 'Multi-Role Configurations', desc: 'Set user access roles (Admin, Staff, Viewer) to restrict certificate issuance and modification privileges.', icon: <FiUsers size={20} className="text-secondary" /> },
    { title: 'Operator Dashboard Stats', desc: 'Comprehensive dashboards display issuance loads, validation analytics, and audit logs.', icon: <FiActivity size={20} className="text-primary" /> },
    { title: 'PDF Attachment Uploads', desc: 'Store official signed digital certificates in local storage with Multer file management pipelines.', icon: <FiLayers size={20} className="text-success" /> },
    { title: 'JWT Access Authentication', desc: 'Sign in operators securely using JWT tokens and bcrypt encrypted passphrases.', icon: <FiKey size={20} className="text-warning" /> }
    { title: 'SHA-256 Ledger Security', desc: 'Each certificate generates a unique block signature, embedding metadata directly inside the cryptographic block hash.', icon: <Lock size={20} className="text-primary" /> },
    { title: 'Instant QR Verification', desc: 'Generate customized high-resolution QR codes mapped to digital certificates, enabling anyone to scan and audit validity.', icon: <Cpu size={20} className="text-secondary" /> },
    { title: 'Tamper-Proof Auditing', desc: 'Verify if any certificate text has been edited. Our algorithm automatically flags changes as "Tampered".', icon: <Shield size={20} className="text-success" /> },
    { title: 'Blockchain Explorer', desc: 'Explore blocks sequentially. Review previous hashes, timestamp logging, proof-of-work metrics, and nonces.', icon: <Database size={20} className="text-warning" /> },
    { title: 'Multi-Role Configurations', desc: 'Set user access roles (Admin, Staff, Viewer) to restrict certificate issuance and modification privileges.', icon: <Users size={20} className="text-secondary" /> },
    { title: 'Operator Dashboard Stats', desc: 'Comprehensive dashboards display issuance loads, validation analytics, and audit logs.', icon: <Activity size={20} className="text-primary" /> },
    { title: 'PDF Attachment Uploads', desc: 'Store official signed digital certificates in local storage with Multer file management pipelines.', icon: <Layers size={20} className="text-success" /> },
    { title: 'JWT Access Authentication', desc: 'Sign in operators securely using JWT tokens and bcrypt encrypted passphrases.', icon: <Key size={20} className="text-warning" /> }
  ];
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16 text-left">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-secondary tracking-widest uppercase">Technology Stack Details</span>
        <h2 className="text-4xl font-extrabold tracking-tight">Platform Capabilities</h2>
        <p className="text-slate-500 dark:text-slate-400">
        <span className="text-xs font-bold text-secondary tracking-widest uppercase text-center block">Technology Stack Details</span>
        <h2 className="text-4xl font-extrabold tracking-tight text-center">Platform Capabilities</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center">
          Explore the tools and cryptographic procedures designed to support zero-trust certificate authentication.
        </p>
      </div>
  );
}
