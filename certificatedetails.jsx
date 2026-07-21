import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiFileText, 
  FiShield, 
  FiAlertTriangle, 
  FiDownload, 
  FiDatabase, 
  FiCalendar, 
  FiAward 
} from 'react-icons/fi';
  ArrowLeft, 
  FileText, 
  Shield, 
  AlertTriangle, 
  Download, 
  Database, 
  Calendar, 
  Award,
  Link as LinkIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
export default function CertificateDetails() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cert, setCert] = useState(null);
  const [block, setBlock] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    const loadCertificateDetails = async () => {
      try {
        const res = await api.get(`/verify/${encodeURIComponent(certificateId)}`);
        if (res.data.success && res.data.status !== 'Invalid') {
          setCert(res.data.data);
          setBlock(res.data.block);
        } else {
          setErrorMsg(res.data.message || 'Certificate details not found.');
        }
  if (errorMsg || !cert) {
    return (
      <div className="p-8 rounded-3xl bg-danger/5 border border-danger/20 text-danger text-sm text-left max-w-xl mx-auto space-y-4">
      <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-850 text-rose-600 dark:text-rose-450 text-sm text-left max-w-xl mx-auto space-y-4 shadow-md">
        <div className="flex gap-2 items-center">
          <FiAlertTriangle size={24} />
          <AlertTriangle size={24} />
          <h4 className="font-bold text-base">Query Failed</h4>
        </div>
        <p>{errorMsg || 'Could not load certificate specifications.'}</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-xs text-primary font-bold hover:underline"
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      {/* Back button */}
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header controls */}
      <div>
        <button 
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-primary dark:text-primary-light hover:underline flex items-center gap-1.5"
        >
          <FiArrowLeft /> Back
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className="text-2xl font-extrabold tracking-tight mt-2">Credential Audit Inspector</h2>
        <h2 className="text-2xl font-bold tracking-tight mt-2">Credential Audit Inspector</h2>
        <p className="text-xs text-slate-400 mt-1">Direct cryptographic auditing records for Certificate ID: {cert.certificateId}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Metadata Card & Block Details */}
        {/* Left Column: Blockchain Details */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Status and Details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
          {/* Integrity status */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Security Integrity Status</span>
            
            <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
              cert.status === 'Verified' 
                ? 'bg-success/5 border-success/20 text-success' 
                : 'bg-warning/5 border-warning/20 text-warning animate-pulse'
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                : 'bg-amber-500/5 border-amber-500/20 text-amber-500 animate-pulse'
            }`}>
              {cert.status === 'Verified' ? <FiShield size={22} /> : <FiAlertTriangle size={22} />}
              {cert.status === 'Verified' ? <Shield size={22} /> : <AlertTriangle size={22} />}
              <div>
                <p className="font-extrabold text-sm">Certificate {cert.status}</p>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                  {cert.status === 'Verified' ? 'Secured on ledger block' : 'Warning: Mismatched data!'}
                  {cert.status === 'Verified' ? 'Secured on ledger block' : 'Warning: Hash mismatched!'}
                </p>
              </div>
            </div>
            {cert.qrCodeFile && (
              <div className="pt-2 text-center flex flex-col items-center gap-2">
                <div className="w-32 h-32 border border-slate-200 dark:border-slate-800 p-1 rounded-2xl bg-white flex items-center justify-center">
                  <img src={`http://localhost:5000${cert.qrCodeFile}`} alt="QR Code Signature" className="w-full h-full object-contain rounded-xl" />
                <div className="w-32 h-32 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 bg-white flex items-center justify-center">
                  <img src={`http://localhost:5000${cert.qrCodeFile}`} alt="QR Code" className="w-full h-full object-contain rounded-xl" />
                </div>
                <a 
                  href={`http://localhost:5000${cert.qrCodeFile}`}
                  download={`${cert.certificateId}-QR.png`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-primary hover:underline font-bold flex items-center gap-1 mt-1"
                >
                  <FiDownload /> Download QR Code Image
                  <Download size={12} /> Download QR Code Image
                </a>
              </div>
            )}
          </div>
          {/* Secured Block Details */}
          {block && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
              <h4 className="font-bold text-xs flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                <FiDatabase size={14} className="text-secondary" /> Mined Block Information
              </h4>
              
              <div className="space-y-3 text-[10px] font-mono text-slate-500">
                <p className="truncate"><span className="text-slate-400">Block Height:</span> #{block.blockNumber}</p>
                <p className="truncate"><span className="text-slate-400">Hash Signature:</span> {block.currentHash}</p>
                <p className="truncate"><span className="text-slate-400">Linked Prev:</span> {block.previousHash}</p>
                <p><span className="text-slate-400">Block Nonce:</span> {block.nonce}</p>
                <div>
                  <span className="text-slate-400 block mb-1">PoW Mining Report:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-normal p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-800/30">
                    {block.proofOfWork}
                  </p>
                </div>
          {/* Block telemetry details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-4">
            <h4 className="font-bold text-xs flex items-center gap-1.5 border-b border-slate-105 dark:border-slate-800 pb-2">
              <Database size={14} className="text-secondary" /> Smart Contract Block Details
            </h4>
            
            <div className="space-y-3.5 text-[10px] font-mono text-slate-400 break-words">
              <div>
                <span className="text-slate-500 uppercase font-bold text-[9px] block">Block Height</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">#{cert.blockNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold text-[9px] block">Transaction Hash</span>
                <span className="text-primary truncate block" title={cert.transactionHash}>{cert.transactionHash}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-bold text-[9px] block">Contract Record Hash</span>
                <span className="text-slate-600 dark:text-slate-350 truncate block" title={cert.certificateHash}>{cert.certificateHash}</span>
              </div>
            </div>
          )}
          </div>
        </div>
        {/* Right Side: Visual Document Viewer & Specs */}
        {/* Right Column: PDF Viewer & Meta Specs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Specs */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
            <h4 className="font-bold text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <FiAward size={18} className="text-primary" /> Certificate Meta Specifications
          {/* Metadata info */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-6">
            <h4 className="font-bold text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-3">
              <Award size={18} className="text-primary" /> Certificate Meta Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Student Name</span>
                <p className="font-bold text-slate-700 dark:text-slate-200">{cert.studentName}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Register Number</span>
                <p className="font-bold font-mono text-slate-700 dark:text-slate-200">{cert.registerNumber}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Course</span>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{cert.course}</p>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Course Name</span>
                <p className="text-slate-600 dark:text-slate-300 font-semibold">{cert.courseName}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Certificate Title</span>
                <p className="text-slate-600 dark:text-slate-300 font-semibold">{cert.certificateTitle}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Department</span>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{cert.department}</p>
                <p className="text-slate-600 dark:text-slate-300 font-semibold">{cert.department}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">University</span>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{cert.university}</p>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Grade Obtained</span>
                <p className="text-primary font-bold">{cert.grade}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-0.5">Issue Date</span>
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {new Date(cert.issueDate).toLocaleDateString([], { dateStyle: 'long' })}
                <p className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                  <Calendar size={14} /> {new Date(cert.issueDate).toLocaleDateString([], { dateStyle: 'long' })}
                </p>
              </div>
            </div>
          </div>
          {/* PDF Viewer */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-3">
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                <FiFileText className="text-primary" /> Certificate Document Viewer
                <FileText className="text-primary" size={16} /> Certificate Document Viewer
              </h4>
              <a 
                href={`http://localhost:5000${cert.pdfFile}`} 
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
              >
                Open in Full Window ↗
              </a>
            </div>
            <iframe 
              src={`http://localhost:5000${cert.pdfFile}`} 
              className="w-full h-[550px] border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950" 
              className="w-full h-[550px] border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950" 
              title="Official PDF Viewer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
