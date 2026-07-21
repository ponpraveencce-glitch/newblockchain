import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiTrash2, 
  FiEye, 
  FiShield, 
  FiAlertTriangle, 
  FiCalendar, 
  FiArrowRight, 
  FiSliders,
  FiAward
} from 'react-icons/fi';
  Search, 
  Trash2, 
  Eye, 
  Shield, 
  AlertTriangle, 
  Calendar, 
  Sliders,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';
export default function CertificateList() {
  const { user } = useContext(AuthContext);
      }
    } catch (err) {
      console.error('Error loading certificate lists', err);
      toast.error('Failed to load certificates directory.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCertificates();
  }, [search, department, sort, page]);
  const handleDelete = async (id, certId) => {
    if (!window.confirm(`Are you sure you want to permanently delete and prune Certificate ID: ${certId}?`)) {
    if (!window.confirm(`Are you sure you want to permanently delete and revoke Certificate ID: ${certId}?`)) {
      return;
    }
    try {
      const res = await api.delete(`/certificates/${id}`);
      if (res.data.success) {
        toast.success('Certificate revoked and purged from ledger.');
        setCertificates(prev => prev.filter(c => c._id !== id));
        fetchCertificates();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete operation failed.');
      toast.error(err.response?.data?.message || 'Delete operation failed.');
    }
  };
  const departmentList = ['All Departments', 'Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering'];
  return (
    <div className="space-y-8 text-left">
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Issued Certificates</h2>
          <p className="text-sm text-slate-400 mt-1">Review, inspect, audit, or revoke active digital credentials.</p>
          <h2 className="text-2xl font-bold tracking-tight">Issued Certificates</h2>
          <p className="text-sm text-slate-400 mt-1">Review, audit, download, or revoke digital credentials.</p>
        </div>
        {user?.role !== 'Viewer' && (
        {user?.role === 'Admin' && (
          <Link 
            to="/dashboard/upload" 
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md flex items-center gap-2"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md flex items-center gap-2 shadow-primary/20"
          >
            <FiAward size={18} /> Issue Credential
            <Award size={18} /> Issue Credential
          </Link>
        )}
      </div>
      {/* Query filters wrapper card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="w-full md:max-w-xs flex rounded-xl border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 items-center gap-3">
          <FiSearch className="text-slate-400 shrink-0" size={16} />
        <div className="w-full md:max-w-xs flex rounded-xl border border-slate-250 dark:border-slate-800 px-3.5 py-2 items-center gap-3">
          <Search className="text-slate-400 shrink-0" size={16} />
          <input 
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search student or register #..."
            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xs"
            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-sm"
          />
        </div>
        {/* Category & Sorting selectors */}
        <div className="flex flex-wrap w-full md:w-auto gap-3 items-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <FiSliders size={14} /> Filters:
            <Sliders size={14} /> Filters:
          </div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-slate-900 font-medium"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science & Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics & Communication">Electronics & Communication</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Business Administration">Business Administration</option>
            {departmentList.map(d => (
              <option key={d} value={d === 'All Departments' ? '' : d} className="dark:bg-slate-900">{d}</option>
            ))}
          </select>
          <select
      </div>
      {/* Main Table Content */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-6">
        
        {loading ? (
          <div className="flex justify-center py-20">
                      <td className="p-4 text-slate-500 font-medium">{cert.department}</td>
                      <td className="p-4 text-slate-500 text-xs font-semibold">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar /> {new Date(cert.issueDate).toLocaleDateString([], { dateStyle: 'medium' })}
                          <Calendar size={14} /> {new Date(cert.issueDate).toLocaleDateString([], { dateStyle: 'medium' })}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max ${
                          cert.status === 'Verified' 
                            ? 'bg-success/10 text-success' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : cert.status === 'Tampered'
                              ? 'bg-warning/10 text-warning animate-pulse'
                              : 'bg-danger/10 text-danger'
                              ? 'bg-amber-500/10 text-amber-500 animate-pulse'
                              : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {cert.status === 'Verified' ? <FiShield size={10} /> : <FiAlertTriangle size={10} />}
                          <Shield size={10} />
                          {cert.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center items-center">
                          <button 
                            onClick={() => navigate(`/dashboard/certificate/${cert.certificateId}`)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary"
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-450 hover:text-primary transition-all"
                            title="Inspect Details"
                          >
                            <FiEye size={16} />
                            <Eye size={16} />
                          </button>
                          <Link 
                            to={`/verify?id=${cert.certificateId}`}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-success"
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-450 hover:text-emerald-500 transition-all"
                            title="Public Verify Portal"
                          >
                            <FiShield size={16} />
                            <Shield size={16} />
                          </Link>
                          {user?.role === 'Admin' && (
                            <button 
                              onClick={() => handleDelete(cert._id, cert.certificateId)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-danger"
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-450 hover:text-rose-500 transition-all"
                              title="Revoke / Delete"
                            >
                              <FiTrash2 size={16} />
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                  <button 
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
                  >
                    Previous
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    disabled={page === pagination.pages}
                    onClick={() => setPage(prev => Math.min(prev + 1, pagination.pages))}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
