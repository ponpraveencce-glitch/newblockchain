const mongoose = require('mongoose');
// Wait, no, this is a JSX client file. The import should be react imports.
import React, { useState, useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { FiSun, FiMoon, FiMenu, FiX, FiExternalLink } from 'react-icons/fi';
import { Sun, Moon, Menu, X, ExternalLink } from 'lucide-react';
export default function PublicLayout() {
  const { theme, toggleTheme } = useContext(ThemeContext);
          <Link to="/how-it-works" className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200">Process</Link>
          <Link to="/contact" className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200">Contact</Link>
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
          <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">Process</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">Contact</Link>
          <Link to="/blockchain" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1">
            Explorer <FiExternalLink size={14} />
            Explorer <ExternalLink size={14} />
          </Link>
          
          {user ? (
  );
}
