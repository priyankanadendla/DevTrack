import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, Code2, Zap, FolderOpen,
  Target, Calendar, BarChart2, User, Settings, LogOut,
  Menu, X, Moon, Sun, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jobs', icon: Briefcase, label: 'Job Applications' },
  { to: '/coding', icon: Code2, label: 'Coding Practice' },
  { to: '/skills', icon: Zap, label: 'Skills' },
  { to: '/projects', icon: FolderOpen, label: 'Projects' },
  { to: '/goals', icon: Target, label: 'Daily Goals' },
  { to: '/calendar', icon: Calendar, label: 'Activity Calendar' },
  { to: '/reports', icon: BarChart2, label: 'Reports' },
];

const bottomNavItems = [
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
          isActive
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
        }`
      }
    >
      <Icon size={18} className="flex-shrink-0" />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-200 dark:border-slate-800">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-md">
          <Code2 size={16} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-base leading-none">DevTrack</h1>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">Growth Tracker</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
            <X size={18} className="text-slate-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider px-3 mb-2">Main Menu</p>
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider px-3 mb-2">Account</p>
          {bottomNavItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {user?.fullName?.[0] || user?.username?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {user?.fullName || user?.username}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
