import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Badge } from '../components/ui';
import { Moon, Sun, Shield, Database, Keyboard, Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const handleClearCache = () => {
    toast.success('Local cache refreshed');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings & Preferences</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your DevTrack workspace, display options, and security
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Appearance */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Appearance & Theme</h2>
              <p className="text-xs text-slate-500">Toggle between Light and Dark interface themes</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Theme</p>
              <p className="text-xs text-slate-500">Currently active: {isDark ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              Switch to {isDark ? 'Light' : 'Dark'}
            </Button>
          </div>
        </Card>

        {/* Account & Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Shield size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Account & Authentication</h2>
              <p className="text-xs text-slate-500">Session and security parameters</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500">Username:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{user?.username}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500">Email:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700/60">
              <span className="text-slate-500">Role:</span>
              <Badge variant="success">{user?.role || 'USER'}</Badge>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Authentication Protocol:</span>
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300">JWT (HMAC-SHA256)</span>
            </div>
          </div>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Keyboard size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Navigation Shortcuts</h2>
              <p className="text-xs text-slate-500">Essential navigation hotkeys</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/40">
              <span className="text-slate-600 dark:text-slate-400">Dashboard</span>
              <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 font-mono">
                /dashboard
              </kbd>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/40">
              <span className="text-slate-600 dark:text-slate-400">Job Tracker</span>
              <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 font-mono">
                /jobs
              </kbd>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/40">
              <span className="text-slate-600 dark:text-slate-400">Coding Practice</span>
              <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 font-mono">
                /coding
              </kbd>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/40">
              <span className="text-slate-600 dark:text-slate-400">Skills Matrix</span>
              <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 font-mono">
                /skills
              </kbd>
            </div>
          </div>
        </Card>

        {/* System & Architecture */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Database size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">DevTrack System Architecture</h2>
              <p className="text-xs text-slate-500">Platform versions and micro-specifications</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
              <p className="text-slate-400 font-medium">Frontend</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">React 18 + Vite</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
              <p className="text-slate-400 font-medium">Backend</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">Spring Boot 3.3</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
              <p className="text-slate-400 font-medium">Database</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">PostgreSQL 15</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
              <p className="text-slate-400 font-medium">Security</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">Spring Security 6</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
