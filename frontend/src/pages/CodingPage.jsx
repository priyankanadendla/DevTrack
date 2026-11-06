import { useState, useEffect } from 'react';
import { codingAPI } from '../api';
import { Card, Button, Input, Select, Textarea, Badge, Modal, ConfirmDialog, EmptyState, PageLoader } from '../components/ui';
import { Plus, Search, CheckCircle, Clock, RotateCcw, ExternalLink, Code2, Trash2, Edit2, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const DIFFICULTY_BADGES = {
  EASY: { variant: 'success', label: 'Easy' },
  MEDIUM: { variant: 'warning', label: 'Medium' },
  HARD: { variant: 'danger', label: 'Hard' },
};

const STATUS_BADGES = {
  SOLVED: { variant: 'success', label: 'Solved' },
  PENDING: { variant: 'default', label: 'Pending' },
  REVISIT: { variant: 'purple', label: 'Revisit' },
};

export default function CodingPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Modal & Actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    problemName: '',
    platform: 'LeetCode',
    language: 'Java',
    topic: '',
    difficulty: 'MEDIUM',
    status: 'SOLVED',
    solvedDate: format(new Date(), 'yyyy-MM-dd'),
    problemUrl: '',
    notes: '',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        size: 9,
        search: search || undefined,
        difficulty: difficultyFilter || undefined,
        status: statusFilter || undefined,
        topic: topicFilter || undefined,
      };
      const res = await codingAPI.getAll(params);
      setProblems(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalElements(res.data.totalElements || 0);
    } catch (err) {
      toast.error('Failed to load coding problems');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [page, difficultyFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchProblems();
  };

  const handleOpenCreate = () => {
    setEditingProblem(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prob) => {
    setEditingProblem(prob);
    setFormData({
      problemName: prob.problemName || '',
      platform: prob.platform || 'LeetCode',
      language: prob.language || 'Java',
      topic: prob.topic || '',
      difficulty: prob.difficulty || 'MEDIUM',
      status: prob.status || 'SOLVED',
      solvedDate: prob.solvedDate ? format(new Date(prob.solvedDate), 'yyyy-MM-dd') : '',
      problemUrl: prob.problemUrl || '',
      notes: prob.notes || '',
      timeComplexity: prob.timeComplexity || '',
      spaceComplexity: prob.spaceComplexity || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProblem) {
        await codingAPI.update(editingProblem.id, formData);
        toast.success('Problem updated');
      } else {
        await codingAPI.create(formData);
        toast.success('Problem added');
      }
      setIsModalOpen(false);
      fetchProblems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickStatusChange = async (prob, newStatus) => {
    try {
      await codingAPI.update(prob.id, {
        ...prob,
        status: newStatus,
        solvedDate: newStatus === 'SOLVED' ? format(new Date(), 'yyyy-MM-dd') : prob.solvedDate,
      });
      toast.success(`Marked as ${newStatus.toLowerCase()}`);
      fetchProblems();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await codingAPI.delete(deleteId);
      toast.success('Problem removed');
      setDeleteId(null);
      fetchProblems();
    } catch (err) {
      toast.error('Failed to delete problem');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Coding Practice Tracker</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master Data Structures, Algorithms, and System Design problems ({totalElements} solved & tracked)
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="self-start sm:self-auto">
          <Plus size={18} />
          Add Problem
        </Button>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search problem title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value);
                setPage(0);
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="SOLVED">Solved</option>
              <option value="PENDING">Pending</option>
              <option value="REVISIT">Revisit</option>
            </select>
          </div>
          <Button type="submit" variant="secondary" className="w-full">
            Filter
          </Button>
        </form>
      </Card>

      {/* Grid of Problems */}
      {loading ? (
        <PageLoader />
      ) : problems.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No problems found"
            description="Start logging your coding challenge journey or adjust your filter query."
            action={
              <Button onClick={handleOpenCreate} className="mt-2">
                <Plus size={16} /> Log First Problem
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((prob) => {
            const diff = DIFFICULTY_BADGES[prob.difficulty] || { variant: 'default', label: prob.difficulty };
            const status = STATUS_BADGES[prob.status] || { variant: 'default', label: prob.status };

            return (
              <Card key={prob.id} className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{prob.problemName}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {prob.platform || 'General'} · <span className="font-medium text-primary-600 dark:text-primary-400">{prob.language}</span>
                      </p>
                    </div>
                    <Badge variant={diff.variant}>{diff.label}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    {prob.topic && <Badge variant="default">{prob.topic}</Badge>}
                  </div>

                  {(prob.timeComplexity || prob.spaceComplexity) && (
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/40 p-2 rounded mb-3">
                      {prob.timeComplexity && <span>Time: {prob.timeComplexity}</span>}
                      {prob.spaceComplexity && <span>Space: {prob.spaceComplexity}</span>}
                    </div>
                  )}

                  {prob.notes && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 p-2 rounded">
                      💡 {prob.notes}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {prob.problemUrl && (
                      <a
                        href={prob.problemUrl.startsWith('http') ? prob.problemUrl : `https://${prob.problemUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                      >
                        Problem <ExternalLink size={12} />
                      </a>
                    )}
                    {prob.solvedDate && (
                      <span className="text-[11px] text-slate-400">
                        {format(new Date(prob.solvedDate), 'MMM d')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {prob.status !== 'SOLVED' ? (
                      <button
                        onClick={() => handleQuickStatusChange(prob, 'SOLVED')}
                        className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-colors"
                        title="Mark Solved"
                      >
                        <CheckCircle size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickStatusChange(prob, 'REVISIT')}
                        className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 transition-colors"
                        title="Mark for Revisit"
                      >
                        <RotateCcw size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenEdit(prob)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteId(prob.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </Button>
          <span className="text-xs text-slate-600 dark:text-slate-400 px-3">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProblem ? 'Edit Coding Problem' : 'Log Coding Problem'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Problem Name *"
            required
            placeholder="e.g. LRU Cache, Binary Tree Maximum Path Sum"
            value={formData.problemName}
            onChange={(e) => setFormData({ ...formData, problemName: e.target.value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Platform"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            >
              <option value="LeetCode">LeetCode</option>
              <option value="HackerRank">HackerRank</option>
              <option value="Codeforces">Codeforces</option>
              <option value="CodeChef">CodeChef</option>
              <option value="GeeksforGeeks">GeeksforGeeks</option>
              <option value="NeetCode">NeetCode</option>
              <option value="Other">Other</option>
            </Select>

            <Input
              label="Language"
              placeholder="e.g. Java, Python, C++"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            />

            <Input
              label="Topic / Category"
              placeholder="e.g. Dynamic Programming, Trees"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Difficulty"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </Select>

            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="SOLVED">Solved</option>
              <option value="PENDING">Pending</option>
              <option value="REVISIT">Revisit</option>
            </Select>

            <Input
              label="Solved Date"
              type="date"
              value={formData.solvedDate}
              onChange={(e) => setFormData({ ...formData, solvedDate: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Time Complexity"
              placeholder="e.g. O(n log n)"
              value={formData.timeComplexity}
              onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
            />
            <Input
              label="Space Complexity"
              placeholder="e.g. O(1), O(n)"
              value={formData.spaceComplexity}
              onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
            />
          </div>

          <Input
            label="Problem URL"
            type="url"
            placeholder="https://leetcode.com/problems/..."
            value={formData.problemUrl}
            onChange={(e) => setFormData({ ...formData, problemUrl: e.target.value })}
          />

          <Textarea
            label="Solution Notes / Key Insights"
            rows={3}
            placeholder="Corner cases to remember, two pointer intuition, recursive recurrence relation..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editingProblem ? 'Update Problem' : 'Save Problem'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Coding Problem"
        message="Are you sure you want to remove this problem from your tracking list?"
        loading={submitting}
      />
    </div>
  );
}
