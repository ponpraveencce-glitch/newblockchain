import React, { useState, useContext, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, 
  FiFilePlus, 
  FiUsers, 
  FiUser, 
  FiLogOut, 
  FiMoon, 
  FiSun, 
  FiMenu, 
  FiX, 
  FiBell, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiInfo,
  FiFileText,
  FiSliders
} from 'react-icons/fi';
  LayoutDashboard, 
  FilePlus, 
  Users, 
  User, 
  LogOut, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  FileText,
  Sliders,
  BarChart,
  Award,
  Search,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import toast from 'react-hot-toast';
export default function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // Load notifications from API
  const fetchNotifications = async () => {
    try {
      const res = await api.get('/dashboard/stats');
      if (res.data.success) {
        setNotifications(res.data.notifications || []);
        // Simulate reading unread status based on some dummy state
        setUnreadCount(res.data.notifications?.filter(n => !n.isRead).length || 0);
      if (user?.role === 'Admin') {
        const res = await api.get('/dashboard');
        if (res.data.success) {
          // Map activity logs to notification style items for visual feed
          const logs = res.data.recentActivities || [];
          const items = logs.map((log, idx) => ({
            id: log._id || idx,
            message: log.details || log.action,
            type: log.action.includes('ALERT') || log.action.includes('TAMPER') ? 'danger' : 'success',
            timestamp: log.timestamp,
            isRead: false
          }));
          setNotifications(items);
          setUnreadCount(items.length);
        }
      }
    } catch (err) {
      console.error('Error fetching logs and notifications', err);
    }
  };
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);
  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid size={20} />, roles: ['Admin', 'Staff', 'Viewer'] },
    { name: 'Certificate List', path: '/dashboard/certificates', icon: <FiFileText size={20} />, roles: ['Admin', 'Staff', 'Viewer'] },
    { name: 'Issue Certificate', path: '/dashboard/upload', icon: <FiFilePlus size={20} />, roles: ['Admin', 'Staff'] },
    { name: 'User Management', path: '/dashboard/users', icon: <FiUsers size={20} />, roles: ['Admin'] },
    { name: 'Profile Settings', path: '/dashboard/profile', icon: <FiUser size={20} />, roles: ['Admin', 'Staff', 'Viewer'] },
    { name: 'System Settings', path: '/dashboard/settings', icon: <FiSliders size={20} />, roles: ['Admin', 'Staff', 'Viewer'] },
    // Admin navigation items
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['Admin'] },
    { name: 'Students', path: '/dashboard/users', icon: <Users size={20} />, roles: ['Admin'] },
    { name: 'Issue Certificate', path: '/dashboard/upload', icon: <FilePlus size={20} />, roles: ['Admin'] },
    { name: 'Certificates', path: '/dashboard/certificates', icon: <FileText size={20} />, roles: ['Admin'] },
    { name: 'Reports', path: '/dashboard/reports', icon: <BarChart size={20} />, roles: ['Admin'] },
    { name: 'Settings', path: '/dashboard/settings', icon: <Sliders size={20} />, roles: ['Admin'] },
    // Student navigation items
    { name: 'Profile', path: '/dashboard/profile', icon: <User size={20} />, roles: ['Student'] },
    { name: 'My Certificates', path: '/dashboard/certificates', icon: <Award size={20} />, roles: ['Student'] },
    { name: 'Verify Certificate', path: '/verify', icon: <Search size={20} />, roles: ['Student'] },
    { name: 'Settings', path: '/dashboard/settings', icon: <Sliders size={20} />, roles: ['Student'] },
  ];
  const allowedNavItems = navItems.filter(item => item.roles.includes(user?.role));
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-success" size={18} />;
        return <CheckCircle className="text-emerald-500" size={18} />;
      case 'danger':
        return <FiAlertTriangle className="text-danger" size={18} />;
        return <ShieldAlert className="text-rose-500" size={18} />;
      case 'warning':
        return <FiAlertTriangle className="text-warning" size={18} />;
        return <AlertTriangle className="text-amber-500" size={18} />;
      default:
        return <FiInfo className="text-primary" size={18} />;
        return <Info className="text-blue-500" size={18} />;
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] flex text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-20 glassmorphism-sidebar transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <aside className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-20 glassmorphism-sidebar border-r border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/40 dark:border-slate-800/40">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary dark:text-primary-light">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-base">
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-light border-l-4 border-primary' 
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-light border-l-4 border-primary shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
        <div className="p-4 border-t border-slate-200/40 dark:border-slate-800/40">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-danger hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200 font-medium`}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors duration-200 font-medium"
          >
            <FiLogOut size={20} />
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
      {/* Main Panel */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}>
        
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-10 glassmorphism-navbar flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-slate-500 dark:text-slate-400"
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                setMobileSidebarOpen(!mobileSidebarOpen);
              }}
            >
              <FiMenu size={22} />
            </button>
            <h1 className="text-lg font-semibold capitalize hidden sm:block">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors duration-200 relative"
              >
                <FiBell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
                    
                    {/* Popover */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-2 w-80 max-w-sm rounded-2xl glassmorphism shadow-glass dark:shadow-glassDark z-30 border border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center">
                        <span className="font-semibold">Notifications</span>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead} 
                            className="text-xs text-primary dark:text-primary-light hover:underline font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-sm text-slate-400">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((notif, index) => (
                            <div 
                              key={notif._id || index} 
                              className={`p-3.5 border-b border-slate-100 dark:border-slate-800/50 flex gap-3 text-xs leading-relaxed ${
                                !notif.isRead ? 'bg-primary/5 dark:bg-primary/10' : ''
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {getNotificationIcon(notif.type)}
                              </div>
                              <div className="flex-1">
                                <p className="text-slate-700 dark:text-slate-300">{notif.message}</p>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                                  {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {/* Profile Info */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold capitalize">{user?.username}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase">{user?.role}</p>
              </div>
              <div 
                onClick={() => navigate('/dashboard/profile')}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary text-white font-bold flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.username} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user?.username?.substring(0, 2).toUpperCase()
                )}
              </div>
            </div>
          </div>
        </header>
        {/* Dashboard Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {/* Mobile Drawer Navigation */}
      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />
            {/* Sidebar content */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 glassmorphism-sidebar z-40 md:hidden flex flex-col"
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 flex flex-col md:hidden"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/40 dark:border-slate-800/40">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary dark:text-primary-light">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-base">
                    ⛓️
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-extrabold">BlockVerify</span>
              <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                  <span>⛓️</span>
                  <span>BlockVerify</span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                >
                  <FiX size={20} />
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={20} />
                </button>
              </div>
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-light border-l-4 border-primary' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-200'
                          ? 'bg-primary/10 text-primary dark:text-primary-light border-l-4 border-primary' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/55'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-slate-200/40 dark:border-slate-800/40">
              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-danger hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200 font-medium"
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all font-medium"
                >
                  <FiLogOut size={20} />
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      {/* Main Panel */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}>
        
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-10 glassmorphism-navbar border-b border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-slate-500 dark:text-slate-400"
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                if (window.innerWidth < 768) {
                  setMobileSidebarOpen(true);
                }
              }}
            >
              <Menu size={20} />
            </button>
            <h1 className="font-extrabold text-lg tracking-tight hidden sm:block">
              {allowedNavItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* Notification Bell */}
            {user?.role === 'Admin' && (
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                  )}
                </button>
                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 shadow-xl overflow-hidden z-30"
                      >
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                          <span className="font-bold text-sm">System Logs</span>
                          {unreadCount > 0 && (
                            <button 
                              onClick={markAllAsRead}
                              className="text-xs font-semibold text-primary dark:text-primary-light hover:underline"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                          {notifications.length === 0 ? (
                            <div className="p-6 text-center text-xs text-slate-400">
                              No recent activities or logs.
                            </div>
                          ) : (
                            notifications.map(item => (
                              <div key={item.id} className="p-3.5 flex gap-3 text-left hover:bg-slate-50/55 dark:hover:bg-slate-800/20">
                                <div className="mt-0.5 shrink-0">
                                  {getNotificationIcon(item.type)}
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <p className="text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300 break-words">{item.message}</p>
                                  <span className="text-[10px] text-slate-400 block">{new Date(item.timestamp).toLocaleTimeString()}</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
            {/* Profile Avatar Widget */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold block leading-none">{user?.username || 'Operator'}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{user?.role}</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-sm font-bold shadow-md">
                {user?.username?.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        {/* Content Outlet */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
