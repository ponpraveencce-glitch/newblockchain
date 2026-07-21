import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return (
      >
        <h1 className="text-8xl font-extrabold text-primary dark:text-primary-light tracking-widest text-glow">404</h1>
        
        <div className="space-y-2">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-extrabold">Block Lost In Space</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The cryptographic block, certificate ID, or address path you requested could not be resolved on our network ledger.
          </p>
        </div>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
        >
          <FiArrowLeft /> Return to Genesis Node
          <ArrowLeft size={16} /> Return to Genesis Node
        </Link>
      </motion.div>
    </div>
  );
}
