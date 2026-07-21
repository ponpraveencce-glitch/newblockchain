import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFileText, 
  FiShield, 
  FiUsers, 
  FiActivity, 
  FiClock, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiInfo 
} from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
  Users, 
  Award, 
  CheckCircle, 
  Clock, 
  Activity, 
  HardDrive, 
  TrendingUp, 
  History, 
  User, 
  Download, 
  QrCode, 
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Wallet,
  Sparkles,
  Search,
  AlertTriangle,
  FolderLock
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'chart.js';
// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  LineChart, 
  Line,
  Legend
);
} from 'recharts';
import toast from 'react-hot-toast';
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
const SkeletonCard = () => (
  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm animate-pulse space-y-4">
  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md animate-pulse space-y-4">
    <div className="flex justify-between">
      <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      <div className="w-8 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
    </div>
    <div className="space-y-2">
      <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="w-16 h-8 bg-slate-200 dark:bg-slate-800 rounded" />
    </div>
  </div>
);
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [charts, setCharts] = useState({ monthlyCertificates: [], verificationAnalytics: [] });
  const [studentCerts, setStudentCerts] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await api.get('/dashboard/stats');
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      if (user?.role === 'Admin') {
        const res = await api.get('/dashboard');
        if (res.data.success) {
          setStats(res.data.stats);
          setActivities(res.data.recentActivity || []);
          setChartData(res.data.chartData);
          setActivities(res.data.recentActivities || []);
          setTransactions(res.data.recentTransactions || []);
          setCharts(res.data.charts || { monthlyCertificates: [], verificationAnalytics: [] });
        }
      } catch (err) {
        console.error('Error loading dashboard statistics', err);
      } finally {
        setLoading(false);
      } else {
        // Load student specific certificates
        const res = await api.get('/certificates');
        if (res.data.success) {
          setStudentCerts(res.data.data || []);
        }
      }
    };
    } catch (err) {
      console.error('Error loading dashboard statistics', err);
      toast.error('Failed to load dashboard parameters.');
    } finally {
      setLoading(false);
    }
  };
    loadDashboardData();
  }, []);
  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.3 }
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };
  const getLogIcon = (action) => {
    switch (action) {
      case 'CERTIFICATE_ISSUED':
        return <span className="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center">📜</span>;
      case 'CERTIFICATE_UPDATED':
        return <span className="w-8 h-8 rounded-full bg-warning/15 text-warning flex items-center justify-center">🔄</span>;
      case 'USER_LOGIN':
        return <span className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center">🔐</span>;
      case 'USER_REGISTER':
        return <span className="w-8 h-8 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">👤</span>;
      default:
        return <span className="w-8 h-8 rounded-full bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center">⚙️</span>;
    }
  };
  if (loading) {
    return (
      <div className="space-y-6 text-left">
        <h2 className="text-2xl font-extrabold">Overview</h2>
        <h2 className="text-2xl font-extrabold">Loading Workspace...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm animate-pulse" />
          <div className="h-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm animate-pulse" />
          <div className="lg:col-span-2 h-80 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md animate-pulse" />
          <div className="h-80 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md animate-pulse" />
        </div>
      </div>
    );
  }
  // Format stats cards values
  const statsCards = [
    { 
      title: 'Total Certificates', 
      value: stats?.totalCertificates || 0, 
      icon: <FiFileText size={24} />, 
      colorClass: 'text-primary bg-primary/10' 
    },
    { 
      title: 'Verified Blocks', 
      value: stats?.verifiedCertificates || 0, 
      icon: <FiShield size={24} />, 
      colorClass: 'text-success bg-success/10' 
    },
    { 
      title: 'Pending Approvals', 
      value: stats?.pendingCertificates || 0, 
      icon: <FiClock size={24} />, 
      colorClass: 'text-warning bg-warning/10' 
    },
    { 
      title: 'System Operators', 
      value: stats?.totalUsers || 0, 
      icon: <FiUsers size={24} />, 
      colorClass: 'text-secondary bg-secondary/10' 
    }
  ];
  // ==========================================
  // ADMIN DASHBOARD RENDERING
  // ==========================================
  if (user?.role === 'Admin') {
    const adminCards = [
      { title: 'Total Students', value: stats?.totalStudents || 0, icon: <Users size={24} />, gradient: 'from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/25' },
      { title: 'Certificates Issued', value: stats?.certificatesIssued || 0, icon: <Award size={24} />, gradient: 'from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/25' },
      { title: 'Certificates Verified', value: stats?.certificatesVerified || 0, icon: <CheckCircle size={24} />, gradient: 'from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/25' },
      { title: 'Pending Requests', value: stats?.pendingRequests || 0, icon: <Clock size={24} />, gradient: 'from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/25' }
    ];
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(156, 163, 175, 0.9)',
          font: { family: 'Inter', size: 12 }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(156, 163, 175, 0.05)' },
        ticks: { color: 'rgba(156, 163, 175, 0.8)', font: { family: 'Inter' } }
      },
      y: {
        grid: { color: 'rgba(156, 163, 175, 0.05)' },
        ticks: { color: 'rgba(156, 163, 175, 0.8)', font: { family: 'Inter' } }
      }
    }
  };
    return (
      <div className="space-y-6 text-left relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Overview Dashboard</h2>
            <p className="text-sm text-slate-400">Audit logs and cryptographic verification telemetry.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-3 text-xs shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="font-mono">
              <span className="text-slate-400">Node: </span>
              <span className="font-semibold">{stats?.contractAddress?.substring(0, 10)}...</span>
            </div>
          </div>
        </div>
  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Overview Dashboard</h2>
        <p className="text-slate-400 text-sm mt-1">Real-time status of certificate issuance and secure blocks.</p>
      </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex items-center justify-between hover:scale-[1.02] hover:shadow-lg transition-all duration-300`}
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{card.title}</span>
                <span className="text-3xl font-extrabold block">{card.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center bg-gradient-to-tr ${card.gradient}`}>
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{card.title}</span>
              <span className="text-3xl font-extrabold block">{card.value}</span>
        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Monthly Issuance Area Chart */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-lg">Monthly Certificates</h3>
              <p className="text-xs text-slate-400">Cryptographic certificates minted on the blockchain ledger</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.colorClass}`}>
              {card.icon}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.monthlyCertificates} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" name="Minted Blocks" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
          </div>
          {/* Department Breakdown Donut Chart */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-lg">Department Analytics</h3>
              <p className="text-xs text-slate-400">Digital certificates distributed per department</p>
            </div>
            <div className="h-64 flex items-center justify-center relative">
              {charts.verificationAnalytics?.length === 0 ? (
                <div className="text-slate-400 text-xs">No records registered.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={charts.verificationAnalytics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {charts.verificationAnalytics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            {/* Legend indicators */}
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-semibold justify-center">
              {charts.verificationAnalytics.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span>{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Ledger Transactions & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Blockchain Transaction History */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <History size={18} className="text-primary" /> Blockchain Ledger Transactions
              </h3>
              <p className="text-xs text-slate-400">Cryptographically signed transactions recorded on-chain</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-450 uppercase font-semibold">
                    <th className="py-2.5">Tx Hash</th>
                    <th className="py-2.5">Block #</th>
                    <th className="py-2.5">Gas Used</th>
                    <th className="py-2.5">Record ID</th>
                    <th className="py-2.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-400">No on-chain transactions yet.</td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx.transactionHash} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                        <td className="py-2.5 text-primary dark:text-primary-light truncate max-w-[120px]" title={tx.transactionHash}>
                          {tx.transactionHash}
                        </td>
                        <td className="py-2.5 font-bold">{tx.blockNumber}</td>
                        <td className="py-2.5 text-slate-400">{tx.gasUsed || 120000}</td>
                        <td className="py-2.5 font-sans font-semibold">{tx.certificateId}</td>
                        <td className="py-2.5 text-sans text-slate-450">{new Date(tx.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* System Operator Activity Logs */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Activity size={18} className="text-secondary" /> Activity Audit Logs
              </h3>
              <p className="text-xs text-slate-400">Auditable operations logged on server nodes</p>
            </div>
            
            <div className="space-y-4 max-h-[220px] overflow-y-auto">
              {activities.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400">No activity logged.</div>
              ) : (
                activities.map((log) => (
                  <div key={log._id} className="flex gap-3 pb-3 border-b border-slate-50 dark:border-slate-800/55 last:border-0 last:pb-0">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">
                      {log.action.includes('MEMBER') || log.action.includes('CREATE') ? '➕' : '📜'}
                    </span>
                    <div className="text-xs flex-grow min-w-0">
                      <p className="font-semibold text-slate-700 dark:text-slate-250 truncate">{log.action.replace(/_/g, ' ')}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed break-words">{log.details}</p>
                      <div className="flex justify-between items-center text-[9px] text-slate-400 mt-1 font-mono">
                        <span>User: {log.performedBy}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
      {/* Graphs and Activities section */}
  // ==========================================
  // STUDENT DASHBOARD RENDERING
  // ==========================================
  const studentProfile = user?.studentProfile || {};
  return (
    <div className="space-y-6 text-left relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Dashboard</h2>
          <p className="text-sm text-slate-400">Manage your academic profile and check verified blockchain certificates.</p>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 flex items-center gap-2 text-xs font-bold text-primary dark:text-primary-light">
          <Sparkles size={14} className="animate-spin" /> Node Active
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-lg">Department Distribution</h3>
            <p className="text-xs text-slate-400">Total certificate load allocated per study department</p>
          </div>
          <div className="flex-1 min-h-[250px] relative">
            {chartData && chartData.labels?.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                No certificate distribution details available. Create a certificate to populate.
        {/* Profile Card */}
        <div className="lg:col-span-1 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-[-10%] top-[-10%] w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary opacity-15 blur-2xl pointer-events-none" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-extrabold flex items-center justify-center text-2xl shadow-md border-2 border-white/20">
                {studentProfile.name?.substring(0, 2).toUpperCase() || 'ST'}
              </div>
            )}
              <div>
                <h3 className="font-bold text-lg">{studentProfile.name || 'Student Name'}</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Reg: {studentProfile.registerNumber || 'N/A'}
                </span>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-150 dark:border-slate-800/70 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-primary" />
                <span>Department: <span className="text-slate-700 dark:text-slate-250 font-semibold">{studentProfile.department || 'N/A'}</span></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles size={15} className="text-primary" />
                <span>Year Group: <span className="text-slate-700 dark:text-slate-250 font-semibold">{studentProfile.year || 'N/A'}</span></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-primary" />
                <span className="truncate">Email: <span className="text-slate-700 dark:text-slate-250 font-semibold">{studentProfile.email || 'N/A'}</span></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-primary" />
                <span>Phone: <span className="text-slate-700 dark:text-slate-250 font-semibold">{studentProfile.phone || 'N/A'}</span></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Wallet size={15} className="text-primary" />
                <span className="truncate">Wallet Address: <span className="text-slate-700 dark:text-slate-250 font-semibold">{studentProfile.walletAddress || 'N/A'}</span></span>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Activity Column */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <FiActivity size={18} className="text-secondary" /> Recent Activity
            </h3>
            <p className="text-xs text-slate-400">Auditable events performed inside institutional nodes</p>
          <div className="pt-6">
            <Link 
              to="/dashboard/settings" 
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 font-bold text-xs transition-colors"
            >
              Update Credentials
            </Link>
          </div>
          
          <div className="flex-grow space-y-4 mt-2 overflow-y-auto max-h-[270px]">
            {activities.length === 0 ? (
              <div className="text-center py-12 text-sm text-slate-400">
                No activities logged yet
        </div>
        {/* My Certificates Section */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Award size={20} className="text-emerald-500" /> My Verified Academic Credentials
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 text-[10px] font-bold">
                {studentCerts.length} Issued
              </span>
            </div>
            {studentCerts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <FolderLock size={48} className="text-slate-650 mx-auto" />
                <h4 className="font-bold text-slate-500">No Certificates Found</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Your academic records have not been registered on the blockchain yet. Please contact the administrator.
                </p>
              </div>
            ) : (
              activities.map((log, index) => (
                <div key={log._id || index} className="flex gap-4.5 items-start text-xs border-b border-slate-100 dark:border-slate-800/50 pb-3 last:border-b-0">
                  <div className="shrink-0 mt-0.5">
                    {getLogIcon(log.action)}
                  </div>
                  <div className="flex-grow text-left">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">
                      {log.action.replace(/_/g, ' ')}
                    </p>
                    <p className="text-slate-400 mt-0.5">{log.details}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
                      <span>By: {log.performedBy}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
                {studentCerts.map((cert) => (
                  <div 
                    key={cert.certificateId}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/20 border border-slate-150 dark:border-slate-800/40 hover:border-primary/30 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="text-left space-y-1">
                      <span className="text-[10px] font-bold uppercase text-primary dark:text-primary-light">{cert.certificateId}</span>
                      <h4 className="font-bold text-sm leading-tight text-slate-800 dark:text-slate-200">{cert.certificateTitle}</h4>
                      <p className="text-xs text-slate-400">{cert.courseName} | Grade: <span className="font-bold text-slate-600 dark:text-slate-350">{cert.grade}</span></p>
                      
                      {/* Blockchain Hash Details */}
                      <div className="flex gap-2 items-center text-[9px] text-slate-400 font-mono mt-1 select-none">
                        <span>Block: #{cert.blockNumber}</span>
                        <span>•</span>
                        <span className="truncate max-w-[120px]" title={cert.transactionHash}>Tx: {cert.transactionHash}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => {
                          setSelectedCert(cert);
                          setShowQrModal(true);
                        }}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                        title="View QR Verification Code"
                      >
                        <QrCode size={16} />
                      </button>
                      <a 
                        href={`http://localhost:5000${cert.pdfFile}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-primary hover:bg-primary-dark text-white shadow-sm flex items-center justify-center"
                        title="Download official credential PDF"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* QR Code Verification Modal */}
      <AnimatePresence>
        {showQrModal && selectedCert && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setShowQrModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 shadow-2xl z-50 w-full max-w-sm text-center space-y-4"
            >
              <h3 className="font-bold text-lg">Verification QR Code</h3>
              <p className="text-xs text-slate-400">{selectedCert.certificateTitle}</p>
              
              <div className="w-48 h-48 bg-white p-2 rounded-2xl mx-auto border border-slate-150 flex items-center justify-center">
                <img 
                  src={`http://localhost:5000${selectedCert.qrCodeFile}`}
                  alt="Verification QR code link"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="text-left bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl space-y-1.5">
                <div className="text-[10px] text-slate-400 font-mono select-none uppercase font-bold">Immutable Ledger Signature</div>
                <div className="text-[10px] font-mono break-all text-slate-600 dark:text-slate-350">{selectedCert.certificateHash}</div>
              </div>
              <button 
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-150 dark:bg-slate-800 dark:hover:bg-slate-750 font-bold text-xs text-slate-600 dark:text-slate-250 transition-colors"
              >
                Close View
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
