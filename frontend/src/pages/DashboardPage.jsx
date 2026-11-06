import { useState, useEffect } from 'react';
import {
  Briefcase, Code2, Zap, FolderOpen, Target, TrendingUp,
  CheckCircle, Clock, Award
} from 'lucide-react';
import { dashboardAPI } from '../api';
import { StatCard, Card, PageLoader, Badge } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { format } from 'date-fns';

const STATUS_COLORS = {
  APPLIED: '#3b82f6',
  ASSESSMENT: '#f59e0b',
  INTERVIEW: '#8b5cf6',
  SELECTED: '#10b981',
  REJECTED: '#ef4444',
};

const DIFFICULTY_COLORS = {
  EASY: '#10b981',
  MEDIUM: '#f59e0b',
  HARD: '#ef4444',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, actRes] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getActivities(8),
        ]);
        setStats(statsRes.data);
        setActivities(actRes.data);
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <PageLoader />;

  const jobChartData = stats?.jobStatusDistribution
    ? Object.entries(stats.jobStatusDistribution).map(([name, value]) => ({ name, value }))
    : [];

  const problemChartData = stats?.problemDifficultyDistribution
    ? Object.entries(stats.problemDifficultyDistribution).map(([name, value]) => ({ name, value }))
    : [];

  const completionRate = stats?.totalGoals > 0
    ? Math.round((stats.completedGoals / stats.totalGoals) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Good morning, {user?.fullName?.split(' ')[0] || user?.username}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {format(new Date(), 'EEEE, MMMM d, yyyy')} · Here's your progress overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Briefcase}
          title="Job Applications"
          value={stats?.totalJobApplications ?? 0}
          subtitle={`${stats?.jobStatusDistribution?.SELECTED ?? 0} selected`}
          color="primary"
        />
        <StatCard
          icon={Code2}
          title="Problems Solved"
          value={stats?.totalSolvedProblems ?? 0}
          subtitle={`${stats?.totalCodingProblems ?? 0} total added`}
          color="success"
        />
        <StatCard
          icon={Zap}
          title="Skills Tracked"
          value={stats?.totalSkills ?? 0}
          color="warning"
        />
        <StatCard
          icon={FolderOpen}
          title="Projects"
          value={stats?.totalProjects ?? 0}
          color="purple"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Target}
          title="Daily Goals"
          value={`${stats?.completedGoals ?? 0}/${stats?.totalGoals ?? 0}`}
          subtitle={`${completionRate}% completion rate`}
          color="info"
        />
        <StatCard
          icon={TrendingUp}
          title="Pending Goals"
          value={stats?.pendingGoals ?? 0}
          color="warning"
        />
        <StatCard
          icon={Award}
          title="Total Problems"
          value={stats?.totalCodingProblems ?? 0}
          subtitle={`${Math.round(((stats?.totalSolvedProblems ?? 0) / Math.max(1, stats?.totalCodingProblems ?? 1)) * 100)}% solve rate`}
          color="success"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Status Chart */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Job Application Status</h2>
          {jobChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={jobChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {jobChartData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm">
              No job applications yet
            </div>
          )}
        </Card>

        {/* Problem Difficulty Chart */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Problems by Difficulty</h2>
          {problemChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={problemChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {problemChartData.map((entry) => (
                    <Cell key={entry.name} fill={DIFFICULTY_COLORS[entry.name] || '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm">
              No coding problems yet
            </div>
          )}
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <ActivityIcon type={activity.activityType} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{activity.description}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                    {format(new Date(activity.createdAt), 'MMM d, yyyy · h:mm a')}
                  </p>
                </div>
                <Badge variant="default" className="flex-shrink-0 text-xs">
                  {activity.activityType.replace(/_/g, ' ')}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
            No recent activity. Start adding jobs, problems, or goals!
          </div>
        )}
      </Card>
    </div>
  );
}

function ActivityIcon({ type }) {
  if (type?.includes('JOB')) return <Briefcase size={14} className="text-primary-600 dark:text-primary-400" />;
  if (type?.includes('PROBLEM')) return <Code2 size={14} className="text-emerald-600 dark:text-emerald-400" />;
  if (type?.includes('GOAL')) return <CheckCircle size={14} className="text-amber-600 dark:text-amber-400" />;
  if (type?.includes('PROJECT')) return <FolderOpen size={14} className="text-purple-600 dark:text-purple-400" />;
  return <Clock size={14} className="text-slate-600 dark:text-slate-400" />;
}
