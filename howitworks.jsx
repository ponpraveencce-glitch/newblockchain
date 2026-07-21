import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiCpu, FiCheckCircle } from 'react-icons/fi';
import { FileText, Cpu, CheckCircle2 } from 'lucide-react';
export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Upload & Registration',
      desc: 'Institutional staff upload student metadata and the official certificate PDF file. The system calculates a unique base hash for this data payload.',
      icon: <FiFileText size={24} />
      icon: <FileText size={24} />
    },
    {
      step: '02',
      title: 'Cryptographic Mining',
      desc: 'The blockchain simulator pulls the previous block\'s hash. It runs a Proof of Work loop to find a nonce that yields a SHA-256 hash starting with "0000".',
      icon: <FiCpu size={24} />
      title: 'Smart Contract Mining',
      desc: 'The blockchain client sends the transaction payload to the deployed smart contract. The contract records the student certificate hash as a verified node record.',
      icon: <Cpu size={24} />
    },
    {
      step: '03',
      title: 'Public Validation Auditing',
      desc: 'Recruiters scan the certificate\'s QR code. The verification script hashes current database values. If it mismatches the secured block hash, a Tampering alert is thrown.',
      icon: <FiCheckCircle size={24} />
      desc: 'Recruiters scan the certificate\'s QR code. The verification script hashes current database values. If it mismatches the secured on-chain signature, a Tampering alert is thrown.',
      icon: <CheckCircle2 size={24} />
    }
  ];
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16 text-left">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-primary tracking-widest uppercase">System Mechanics</span>
        <h2 className="text-4xl font-extrabold tracking-tight">The Ledger Pipeline</h2>
        <p className="text-slate-500 dark:text-slate-400">
        <h2 className="text-4xl font-extrabold tracking-tight text-center">The Ledger Pipeline</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center">
          Learn how certificate uploads trigger cryptographic blocks and enable public verification.
        </p>
      </div>
  );
}
