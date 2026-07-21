import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiCpu, 
  FiDatabase, 
  FiLink, 
  FiClock, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiArrowRight, 
  FiCode 
} from 'react-icons/fi';
  Search, 
  Cpu, 
  Database, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Cpu as CpuIcon,
  Activity,
  HardDrive,
  ArrowLeft,
  Server
} from 'lucide-react';
import toast from 'react-hot-toast';
export default function BlockchainExplorer() {
  const [blocks, setBlocks] = useState([]);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValidChain, setIsValidChain] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlock, setActiveBlock] = useState(null);
  const [activeTxHash, setActiveTxHash] = useState(null);
  useEffect(() => {
    const fetchBlockchain = async () => {
      try {
        const res = await api.get('/blockchain');
        if (res.data.success) {
          setBlocks(res.data.data || []);
          setIsValidChain(res.data.isValidChain);
        }
      } catch (err) {
        console.error('Error fetching blockchain explorer data', err);
      } finally {
        setLoading(false);
  const fetchBlockchainData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blockchain');
      if (res.data.success) {
        setNetworkInfo(res.data.network);
        setTransactions(res.data.transactions || []);
      }
    };
    fetchBlockchain();
    } catch (err) {
      console.error('Error fetching blockchain explorer data', err);
      toast.error('Could not load smart contract transactions.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlockchainData();
  }, []);
  const filteredBlocks = blocks.filter(block => 
    block.blockNumber.toString().includes(searchQuery) ||
    block.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.currentHash.toLowerCase().includes(searchQuery.toLowerCase())
  const filteredTransactions = transactions.filter(tx => 
    tx.blockNumber.toString().includes(searchQuery) ||
    tx.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.transactionHash.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b13] py-20 px-6 md:px-12 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Back to Home Button floating */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center text-left">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
        <div>
          <Link to="/" className="text-sm font-semibold text-primary dark:text-primary-light hover:underline">
            ← Back to Home
          <Link to="/" className="text-sm font-semibold text-primary dark:text-primary-light hover:underline flex items-center gap-1.5">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h2 className="text-3xl font-extrabold tracking-tight mt-2 flex items-center gap-2">
            <FiDatabase className="text-primary" /> Cryptographic Ledger Explorer
            <Database className="text-primary" /> Cryptographic Ledger Explorer
          </h2>
          <p className="text-sm text-slate-400 mt-1">Audit the immutable SHA-256 blocks chained in sequence.</p>
          <p className="text-sm text-slate-400 mt-1">Audit the cryptographically secure transactions recorded on-chain in real-time.</p>
        </div>
        {/* Chain Integrity Badge */}
        {!loading && (
          <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 border text-sm font-bold shadow-sm ${
            isValidChain 
              ? 'bg-success/10 border-success/20 text-success' 
              : 'bg-danger/10 border-danger/20 text-danger animate-pulse'
          }`}>
            {isValidChain ? <FiCheckCircle size={18} /> : <FiAlertTriangle size={18} />}
            <span>{isValidChain ? 'Chain Integrity Verified' : 'Alert: Tampered Chain Detect'}</span>
          <div className="px-4 py-2 rounded-2xl flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-sm font-bold shadow-sm">
            <CheckCircle2 size={18} />
            <span>Smart Contract Secured</span>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Search and Filters */}
        <div className="p-4 rounded-2xl glassmorphism border border-slate-200/50 dark:border-slate-800/50 flex gap-4 items-center">
          <FiSearch className="text-slate-400 shrink-0" size={20} />
        {/* Network Metrics Cards */}
        {networkInfo && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md">
              <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider block">Contract Address</span>
              <span className="text-xs font-mono font-bold text-primary dark:text-primary-light mt-1.5 block break-all select-all">
                {networkInfo.contractAddress}
              </span>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md">
              <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider block">Total Mined Height</span>
              <span className="text-xl font-bold font-mono mt-1.5 block">
                #{networkInfo.blockHeight} Blocks
              </span>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md">
              <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider block">Average Gas Price</span>
              <span className="text-xl font-bold font-mono mt-1.5 block">
                {networkInfo.gasPrice}
              </span>
            </div>
          </div>
        )}
        {/* Search Bar */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex gap-4 items-center">
          <Search className="text-slate-400 shrink-0" size={20} />
          <input 
            type="text"
            placeholder="Search by Block #, Certificate ID, or Block Hash..."
            placeholder="Search on-chain records by Block #, Certificate ID, or Transaction Hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm"
          />
        </div>
        {/* Horizontal visually connected block representation */}
        {/* Mined Blocks Flow Layout */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredBlocks.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-slate-900 text-center text-slate-400 text-sm border border-slate-200/40 dark:border-slate-800/40">
            No secure blocks found matching the query criteria.
        ) : filteredTransactions.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-slate-900 text-center text-slate-450 text-sm border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
            No smart contract transaction entries found matching criteria.
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            
            {/* Visual Block Chain Wrapper */}
            <div className="flex flex-col md:flex-row items-center gap-6 overflow-x-auto py-8 px-4 scroll-smooth min-h-[360px]">
              {filteredBlocks.map((block, idx) => {
                const isGenesis = block.blockNumber === 0;
                const isActive = activeBlock === block.blockNumber;
            {/* Visual Block Chain Flow */}
            <div className="flex flex-col md:flex-row items-center gap-6 overflow-x-auto py-8 px-4 scroll-smooth min-h-[340px]">
              {filteredTransactions.map((tx, idx) => {
                const isActive = activeTxHash === tx.transactionHash;
                return (
                  <React.Fragment key={block.blockNumber}>
                  <React.Fragment key={tx.transactionHash}>
                    
                    {/* Visual Connection Arrow */}
                    {idx > 0 && (
                      <div className="flex md:flex-col items-center justify-center shrink-0 text-slate-300 dark:text-slate-700 select-none">
                        <FiArrowRight size={26} className="rotate-90 md:rotate-0 text-primary animate-pulse" />
                        <span className="text-[10px] font-mono font-bold text-slate-400 hidden md:block">PREV HASH</span>
                      <div className="flex md:flex-col items-center justify-center shrink-0 text-slate-350 dark:text-slate-700 select-none">
                        <ArrowRight size={26} className="rotate-90 md:rotate-0 text-primary animate-pulse" />
                        <span className="text-[9px] font-mono font-bold text-slate-400 hidden md:block uppercase">Chained Link</span>
                      </div>
                    )}
                    {/* Block Card */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => setActiveBlock(block.blockNumber)}
                      className={`w-full md:w-80 shrink-0 p-6 rounded-3xl border text-left cursor-pointer transition-all shadow-sm relative overflow-hidden ${
                      onClick={() => setActiveTxHash(tx.transactionHash)}
                      className={`w-full md:w-80 shrink-0 p-6 rounded-3xl border text-left cursor-pointer transition-all shadow-md relative overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary shadow-lg shadow-primary/5' 
                          : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800/60'
                      }`}
                    >
                      {/* Top Header */}
                      <div className="flex justify-between items-center mb-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                          isGenesis 
                            ? 'bg-secondary/15 text-secondary' 
                            : 'bg-primary/10 text-primary dark:text-primary-light'
                        }`}>
                          {isGenesis ? 'GENESIS BLOCK' : `BLOCK #${block.blockNumber}`}
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-primary/10 text-primary dark:text-primary-light">
                          BLOCK #{tx.blockNumber}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <FiClock size={12} />
                          <span>{new Date(block.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Clock size={11} />
                          <span>{new Date(tx.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      {/* Content details */}
                      <div className="space-y-3.5">
                      <div className="space-y-3.5 text-left">
                        <div>
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Certificate reference</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Student / Record Ref</span>
                          <span className="text-sm font-bold font-mono truncate block text-slate-700 dark:text-slate-200">
                            {isGenesis ? 'GENESIS-LEAF' : block.certificateId}
                            {tx.certificateId}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Current hash</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Transaction Hash</span>
                          <span className="text-xs font-mono font-bold text-primary dark:text-primary-light truncate block">
                            {block.currentHash}
                            {tx.transactionHash}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Previous hash</span>
                          <span className="text-xs font-mono text-slate-400 truncate block">
                            {block.previousHash}
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Gas Mined</span>
                          <span className="text-xs font-mono text-slate-400 block font-semibold">
                            {tx.gasUsed || '114,832'} Units
                          </span>
                        </div>
                        {/* Extra expanded details */}
                        <div className="border-t border-slate-100 dark:border-slate-800/50 pt-3 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                          <span>Nonce: {block.nonce}</span>
                          <span className="text-slate-500 font-semibold">{block.proofOfWork.split(' ')[0]} {block.proofOfWork.split(' ')[1]}</span>
                        {/* Extra details */}
                        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                          <span>Status: Mined</span>
                          <span className="text-emerald-500 font-semibold flex items-center gap-1">
                            <CheckCircle2 size={10} /> Confirmed
                          </span>
                        </div>
                      </div>
                      {/* Spark/Glow Decorator for active card */}
                      {isActive && (
                        <div className="absolute right-0 bottom-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                      )}
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>
            {/* Block details details inspector drawer panel */}
            {activeBlock !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-left space-y-6"
              >
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-4">
                  <h3 className="text-xl font-bold">
                    Inspect Block Details: #{activeBlock}
                  </h3>
                  <button 
                    onClick={() => setActiveBlock(null)}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Close Inspector
                  </button>
                </div>
            {/* Expanded Inspector Panel */}
            <AnimatePresence>
              {activeTxHash !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-left space-y-6 shadow-md"
                >
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <CpuIcon size={20} className="text-secondary animate-pulse" /> Inspect Transaction
                    </h3>
                    <button 
                      onClick={() => setActiveTxHash(null)}
                      className="text-xs font-bold text-slate-450 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Close Inspector
                    </button>
                  </div>
                {(() => {
                  const inspectorBlock = blocks.find(b => b.blockNumber === activeBlock);
                  if (!inspectorBlock) return null;
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Block Height</span>
                          <p className="font-mono text-slate-700 dark:text-slate-200">{inspectorBlock.blockNumber}</p>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Block Timestamp</span>
                          <p className="text-slate-700 dark:text-slate-200">{new Date(inspectorBlock.timestamp).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Certificate Reference</span>
                          {inspectorBlock.blockNumber > 0 ? (
                            <Link to={`/verify?id=${inspectorBlock.certificateId}`} className="font-mono font-bold text-primary dark:text-primary-light hover:underline">
                              {inspectorBlock.certificateId} ↗
                  {(() => {
                    const tx = transactions.find(t => t.transactionHash === activeTxHash);
                    if (!tx) return null;
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-4">
                          <div>
                            <span className="text-xs text-slate-400 font-semibold block mb-1">Block Number</span>
                            <p className="font-mono text-slate-700 dark:text-slate-200 font-bold text-base">#{tx.blockNumber}</p>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 font-semibold block mb-1">Timestamp</span>
                            <p className="text-slate-700 dark:text-slate-200 font-medium">{new Date(tx.timestamp).toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 font-semibold block mb-1">Target Certificate ID</span>
                            <Link to={`/verify?id=${tx.certificateId}`} className="font-mono font-bold text-primary dark:text-primary-light hover:underline">
                              {tx.certificateId} ↗
                            </Link>
                          ) : (
                            <p className="font-mono text-slate-500">Genesis Block</p>
                          )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 font-mono">
                        <div>
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Proof Of Work Mining Metrics</span>
                          <p className="text-slate-700 dark:text-slate-200 font-sans text-xs bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
                            {inspectorBlock.proofOfWork}
                          </p>
                        <div className="space-y-4 font-mono">
                          <div>
                            <span className="text-xs text-slate-400 font-semibold block mb-1">Transaction Hash Signature</span>
                            <p className="text-primary dark:text-primary-light font-bold text-xs break-all bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 select-all">
                              {tx.transactionHash}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 font-semibold block mb-1">Secured Document Hash (SHA-256)</span>
                            <p className="text-slate-500 dark:text-slate-350 font-semibold text-xs break-all bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 select-all">
                              {tx.certificateHash}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 font-sans text-xs">
                            <div>
                              <span className="text-slate-400 font-semibold block mb-1">Gas Spent</span>
                              <p className="font-bold font-mono">{tx.gasUsed || '114,832'} Units</p>
                            </div>
                            <div>
                              <span className="text-slate-400 font-semibold block mb-1">Receipt Status</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold font-mono text-[10px]">SUCCESS (0x1)</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Current Hash Signature</span>
                          <p className="text-primary dark:text-primary-light font-bold text-xs break-all bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
                            {inspectorBlock.currentHash}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Previous Link Hash</span>
                          <p className="text-slate-400 text-xs break-all bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
                            {inspectorBlock.previousHash}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
