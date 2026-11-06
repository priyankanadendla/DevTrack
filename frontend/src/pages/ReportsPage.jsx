import { useState, useEffect } from 'react';
import { jobsAPI, codingAPI, skillsAPI, projectsAPI, goalsAPI, dashboardAPI } from '../api';
import { Card, Button, PageLoader, StatCard, Badge } from '../components/ui';
import { Download, FileText, CheckCircle2, TrendingUp, BarChart3, Code2, Briefcase, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [problems, setProblems] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [statsRes, jobsRes, codingRes, skillsRes, projRes, goalsRes] = await Promise.all([
          dashboardAPI.getStats(),
          jobsAPI.getAll({ size: 200 }),
          codingAPI.getAll({ size: 200 }),
          skillsAPI.getAll(),
          projectsAPI.getAll({ size: 200 }),
          goalsAPI.getAll(),
        ]);
        setStats(statsRes.data);
        setJobs(jobsRes.data.content || []);
        setProblems(codingRes.data.content || []);
        setSkills(skillsRes.data || []);
        setProjects(projRes.data.content || []);
        setGoals(goalsRes.data || []);
      } catch (err) {
        toast.error('Failed to load reporting data');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // CSV Generator utility
  const downloadCSV = (filename, data, headers) => {
    if (!data || data.length === 0) {
      toast.error('No data to export');
      return;
    }
    const headerRow = headers.map((h) => `"${h.label}"`).join(',');
    const rows = data.map((item) =>
      headers
        .map((h) => {
          let val = h.accessor(item);
          if (val === null || val === undefined) val = '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headerRow, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filename}.csv`);
  };

  const exportJobs = () => {
    downloadCSV('devtrack_job_applications', jobs, [
      { label: 'Company', accessor: (j) => j.companyName },
      { label: 'Role', accessor: (j) => j.jobRole },
      { label: 'Location', accessor: (j) => j.location },
      { label: 'Status', accessor: (j) => j.status },
      { label: 'Applied Date', accessor: (j) => j.applicationDate },
      { label: 'Salary Min', accessor: (j) => j.salaryMin },
      { label: 'Salary Max', accessor: (j) => j.salaryMax },
      { label: 'Job URL', accessor: (j) => j.jobUrl },
      { label: 'Notes', accessor: (j) => j.notes },
    ]);
  };

  const exportProblems = () => {
    downloadCSV('devtrack_coding_problems', problems, [
      { label: 'Problem Name', accessor: (p) => p.problemName },
      { label: 'Platform', accessor: (p) => p.platform },
      { label: 'Language', accessor: (p) => p.language },
      { label: 'Difficulty', accessor: (p) => p.difficulty },
      { label: 'Status', accessor: (p) => p.status },
      { label: 'Solved Date', accessor: (p) => p.solvedDate },
      { label: 'Topic', accessor: (p) => p.topic },
      { label: 'Time Complexity', accessor: (p) => p.timeComplexity },
      { label: 'Space Complexity', accessor: (p) => p.spaceComplexity },
      { label: 'Notes', accessor: (p) => p.notes },
    ]);
  };

  const exportSkills = () => {
    downloadCSV('devtrack_skills', skills, [
      { label: 'Skill Name', accessor: (s) => s.skillName },
      { label: 'Category', accessor: (s) => s.category },
      { label: 'Proficiency (%)', accessor: (s) => s.proficiencyLevel },
      { label: 'Years Exp', accessor: (s) => s.yearsOfExperience },
      { label: 'Primary Focus', accessor: (s) => s.isPrimary },
    ]);
  };

  const exportGoals = () => {
    downloadCSV('devtrack_goals', goals, [
      { label: 'Title', accessor: (g) => g.title },
      { label: 'Date', accessor: (g) => g.goalDate },
      { label: 'Completed', accessor: (g) => g.isCompleted },
      { label: 'Priority', accessor: (g) => g.priority },
      { label: 'Category', accessor: (g) => g.category },
    ]);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & Data Export</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review high-level executive summaries and export your career data to CSV anytime
        </p>
      </div>

      {/* CSV Export Card Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-3">
              <Briefcase size={20} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Job Applications</h3>
            <p className="text-xs text-slate-500 mt-1">{jobs.length} total applications</p>
          </div>
          <Button size="sm" variant="secondary" onClick={exportJobs} className="mt-4 w-full">
            <Download size={14} /> Export CSV
          </Button>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Code2 size={20} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Coding Challenges</h3>
            <p className="text-xs text-slate-500 mt-1">{problems.length} solved & tracked</p>
          </div>
          <Button size="sm" variant="secondary" onClick={exportProblems} className="mt-4 w-full">
            <Download size={14} /> Export CSV
          </Button>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Zap size={20} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Skills Matrix</h3>
            <p className="text-xs text-slate-500 mt-1">{skills.length} tracked skills</p>
          </div>
          <Button size="sm" variant="secondary" onClick={exportSkills} className="mt-4 w-full">
            <Download size={14} /> Export CSV
          </Button>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <FileText size={20} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Daily Objectives</h3>
            <p className="text-xs text-slate-500 mt-1">{goals.length} logged goals</p>
          </div>
          <Button size="sm" variant="secondary" onClick={exportGoals} className="mt-4 w-full">
            <Download size={14} /> Export CSV
          </Button>
        </Card>
      </div>

      {/* Structured Reports Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Pipeline Report */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
            Job Pipeline Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-700/50 text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Stage</th>
                  <th className="py-2.5 px-3">Count</th>
                  <th className="py-2.5 px-3">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {['APPLIED', 'ASSESSMENT', 'INTERVIEW', 'SELECTED', 'REJECTED'].map((stage) => {
                  const count = jobs.filter((j) => j.status === stage).length;
                  const pct = jobs.length > 0 ? Math.round((count / jobs.length) * 100) : 0;
                  return (
                    <tr key={stage}>
                      <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">{stage}</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{count}</td>
                      <td className="py-2.5 px-3 text-primary-600 dark:text-primary-400 font-semibold">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Coding Difficulty Summary */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
            DSA Preparation Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-700/50 text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Difficulty</th>
                  <th className="py-2.5 px-3">Solved</th>
                  <th className="py-2.5 px-3">Pending</th>
                  <th className="py-2.5 px-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {['EASY', 'MEDIUM', 'HARD'].map((diff) => {
                  const solved = problems.filter((p) => p.difficulty === diff && p.status === 'SOLVED').length;
                  const pending = problems.filter((p) => p.difficulty === diff && p.status !== 'SOLVED').length;
                  return (
                    <tr key={diff}>
                      <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">{diff}</td>
                      <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">{solved}</td>
                      <td className="py-2.5 px-3 text-slate-500">{pending}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">{solved + pending}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
