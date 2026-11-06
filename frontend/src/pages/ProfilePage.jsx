import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI, dashboardAPI } from '../api';
import { Card, Button, Input, Textarea, PageLoader, StatCard } from '../components/ui';
import { User, Mail, Globe, Save, Award, Calendar, CheckCircle, Code, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    avatarUrl: user?.avatarUrl || '',
    githubUrl: user?.githubUrl || '',
    linkedinUrl: user?.linkedinUrl || '',
    websiteUrl: user?.websiteUrl || '',
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const [meRes, statsRes] = await Promise.all([
          authAPI.getProfile(),
          dashboardAPI.getStats(),
        ]);
        updateUser(meRes.data);
        setForm({
          fullName: meRes.data.fullName || '',
          bio: meRes.data.bio || '',
          avatarUrl: meRes.data.avatarUrl || '',
          githubUrl: meRes.data.githubUrl || '',
          linkedinUrl: meRes.data.linkedinUrl || '',
          websiteUrl: meRes.data.websiteUrl || '',
        });
        setStats(statsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(form);
      updateUser(res.data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Developer Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your public developer persona and connected social handles
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile Card preview */}
        <Card className="p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
            {form.avatarUrl ? (
              <img
                src={form.avatarUrl}
                alt={form.fullName || user?.username}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              (form.fullName?.[0] || user?.username?.[0] || 'D').toUpperCase()
            )}
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{form.fullName || user?.username}</h2>
          <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">@{user?.username}</p>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Mail size={12} /> {user?.email}
          </p>

          {form.bio && (
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-4 px-2 italic bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg w-full text-left">
              "{form.bio}"
            </p>
          )}

          <div className="flex gap-4 mt-6">
            {form.githubUrl && (
              <a
                href={form.githubUrl.startsWith('http') ? form.githubUrl : `https://${form.githubUrl}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-primary-600 transition-colors"
                title="GitHub"
              >
                <Code size={18} />
              </a>
            )}
            {form.linkedinUrl && (
              <a
                href={form.linkedinUrl.startsWith('http') ? form.linkedinUrl : `https://${form.linkedinUrl}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-primary-600 transition-colors"
                title="LinkedIn"
              >
                <Share2 size={18} />
              </a>
            )}
            {form.websiteUrl && (
              <a
                href={form.websiteUrl.startsWith('http') ? form.websiteUrl : `https://${form.websiteUrl}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-primary-600 transition-colors"
                title="Portfolio"
              >
                <Globe size={18} />
              </a>
            )}
          </div>

          <div className="w-full mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Problems Solved:</span>
              <strong className="text-slate-800 dark:text-slate-200">{stats?.totalSolvedProblems || 0}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Applications Sent:</span>
              <strong className="text-slate-800 dark:text-slate-200">{stats?.totalJobApplications || 0}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Projects Tracked:</span>
              <strong className="text-slate-800 dark:text-slate-200">{stats?.totalProjects || 0}</strong>
            </div>
          </div>
        </Card>

        {/* Right: Profile Edit Form */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Edit Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <Input
                label="Avatar Image URL"
                type="url"
                placeholder="https://..."
                value={form.avatarUrl}
                onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
              />
            </div>

            <Textarea
              label="Professional Bio"
              rows={3}
              placeholder="Full stack software engineer passionate about distributed systems, microservices, and React..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="GitHub URL"
                placeholder="https://github.com/..."
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
              <Input
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/..."
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              />
              <Input
                label="Personal Website"
                placeholder="https://myportfolio.dev"
                value={form.websiteUrl}
                onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" loading={loading}>
                <Save size={16} /> Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
