import { useState, useEffect } from 'react';
import { goalsAPI } from '../api';
import { Card, Button, Input, Select, Textarea, Badge, Modal, ConfirmDialog, EmptyState, PageLoader, ProgressBar } from '../components/ui';
import { Plus, CheckSquare, Square, Calendar as CalendarIcon, Trash2, Edit2, Clock, Target, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const PRIORITY_BADGES = {
  LOW: { variant: 'info', label: 'Low' },
  MEDIUM: { variant: 'warning', label: 'Medium' },
  HIGH: { variant: 'danger', label: 'High' },
};

export default function GoalsPage() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    title: '',
    description: '',
    goalDate: selectedDate,
    deadline: '',
    priority: 'MEDIUM',
    category: 'Coding',
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await goalsAPI.getByDate(selectedDate);
      setGoals(res.data || []);
    } catch (err) {
      toast.error('Failed to load daily goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [selectedDate]);

  const handleOpenCreate = () => {
    setEditingGoal(null);
    setFormData({ ...initialForm, goalDate: selectedDate });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title || '',
      description: goal.description || '',
      goalDate: goal.goalDate ? format(new Date(goal.goalDate), 'yyyy-MM-dd') : selectedDate,
      deadline: goal.deadline ? format(new Date(goal.deadline), "yyyy-MM-dd'T'HH:mm") : '',
      priority: goal.priority || 'MEDIUM',
      category: goal.category || 'General',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        deadline: formData.deadline ? `${formData.deadline}:00` : null,
      };

      if (editingGoal) {
        await goalsAPI.update(editingGoal.id, payload);
        toast.success('Goal updated');
      } else {
        await goalsAPI.create(payload);
        toast.success('Goal added');
      }
      setIsModalOpen(false);
      fetchGoals();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (goal) => {
    try {
      await goalsAPI.toggle(goal.id);
      toast.success(goal.isCompleted ? 'Goal marked active' : 'Goal completed! 🎉');
      fetchGoals();
    } catch (err) {
      toast.error('Failed to update goal');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await goalsAPI.delete(deleteId);
      toast.success('Goal deleted');
      setDeleteId(null);
      fetchGoals();
    } catch (err) {
      toast.error('Failed to delete goal');
    } finally {
      setSubmitting(false);
    }
  };

  const completedCount = goals.filter((g) => g.isCompleted).length;
  const progressPct = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Daily Goals</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build discipline with high-impact daily developer tasks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button onClick={handleOpenCreate}>
            <Plus size={18} /> New Goal
          </Button>
        </div>
      </div>

      {/* Progress banner */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Progress for {format(new Date(selectedDate), 'EEEE, MMMM d')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {completedCount} of {goals.length} tasks completed ({progressPct}%)
            </p>
          </div>
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{progressPct}%</span>
        </div>
        <ProgressBar value={progressPct} color={progressPct === 100 ? 'success' : 'primary'} />
      </Card>

      {/* Goal list */}
      {loading ? (
        <PageLoader />
      ) : goals.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No goals scheduled for this date"
            description="Set 2-4 focused daily objectives to make steady progress in your software engineering journey."
            action={
              <Button onClick={handleOpenCreate} className="mt-2">
                <Plus size={16} /> Add Daily Goal
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const prio = PRIORITY_BADGES[goal.priority] || { variant: 'default', label: goal.priority };

            return (
              <Card
                key={goal.id}
                className={`p-4 transition-all ${
                  goal.isCompleted ? 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggle(goal)}
                    className="mt-0.5 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex-shrink-0"
                  >
                    {goal.isCompleted ? (
                      <CheckSquare size={20} className="text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Square size={20} />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold text-base ${
                          goal.isCompleted
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {goal.title}
                      </h3>
                      <Badge variant={prio.variant}>{prio.label}</Badge>
                      {goal.category && <Badge variant="default">{goal.category}</Badge>}
                    </div>

                    {goal.description && (
                      <p
                        className={`text-xs ${
                          goal.isCompleted ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {goal.description}
                      </p>
                    )}

                    {goal.deadline && (
                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-600 dark:text-amber-400">
                        <Clock size={12} />
                        <span>Deadline: {format(new Date(goal.deadline), 'h:mm a')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleOpenEdit(goal)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(goal.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingGoal ? 'Edit Goal' : 'Create Daily Goal'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Goal Title *"
            required
            placeholder="e.g. Solve 2 Graph questions on LeetCode"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Textarea
            label="Description / Checklist"
            rows={2}
            placeholder="Subtasks or links to review..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Goal Date *"
              type="date"
              required
              value={formData.goalDate}
              onChange={(e) => setFormData({ ...formData, goalDate: e.target.value })}
            />

            <Input
              label="Deadline (Optional)"
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Coding">Coding</option>
              <option value="Learning">Learning & Theory</option>
              <option value="Job Search">Job Search</option>
              <option value="Project">Project Building</option>
              <option value="Reading">Documentation / Book</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editingGoal ? 'Update Goal' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Daily Goal"
        message="Are you sure you want to remove this daily goal?"
        loading={submitting}
      />
    </div>
  );
}
