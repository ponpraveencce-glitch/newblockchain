import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiShield, FiHeart } from 'react-icons/fi';
import { Award, BookOpen, Shield, Heart } from 'lucide-react';
export default function About() {
  return (
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight"
          className="text-4xl font-extrabold tracking-tight text-center"
        >
          Empowering Educational Credibility
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed"
          className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed text-center"
        >
          We build decentralized ledger environments to eliminate certificate forgery, establish public verification channels, and protect academic accomplishments.
        </motion.p>
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FiShield size={20} />
              <Shield size={20} />
            </div>
            <h4 className="font-bold text-base">Unmatched Security</h4>
            <p className="text-xs text-slate-400 leading-relaxed">SHA-256 hashes lock metadata records cryptographically.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <FiBookOpen size={20} />
              <BookOpen size={20} />
            </div>
            <h4 className="font-bold text-base">Academic Focus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Customized properties built for universities and colleges.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
              <FiAward size={20} />
              <Award size={20} />
            </div>
            <h4 className="font-bold text-base">Instant Audits</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Verification occurs in less than a second using scanned QR codes.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
              <FiHeart size={20} />
              <Heart size={20} />
            </div>
            <h4 className="font-bold text-base">Built with Trust</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Ensuring verified trust between graduates and recruiters.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
