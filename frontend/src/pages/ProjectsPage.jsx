import { useState, useEffect } from 'react';
import { projectsAPI } from '../api';
import { Card, Button, Input, Select, Textarea, Badge, Modal, ConfirmDialog, EmptyState, PageLoader } from '../components/ui';
import { Plus, Search, Globe, Calendar, Edit2, Trash2, FolderGit2, CheckCircle2, Code } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const STATUS_BADGES = {
  PLANNING: { variant: 'default', label: 'Planning' },
  IN_PROGRESS: { variant: 'info', label: 'In Progress' },
  COMPLETED: { variant: 'success', label: 'Completed' },
  ON_HOLD: { variant: 'warning', label: 'On Hold' },
  CANCELLED: { variant: 'danger', label: 'Cancelled' },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    projectName: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    completionDate: '',
    status: 'IN_PROGRESS',
    notes: '',
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        size: 9,
        search: search || undefined,
        status: statusFilter || undefined,
      };
      const res = await projectsAPI.getAll(params);
      setProjects(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalElements(res.data.totalElements || 0);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchProjects();
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      projectName: project.projectName || '',
      description: project.description || '',
      techStack: project.techStack || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      startDate: project.startDate ? format(new Date(project.startDate), 'yyyy-MM-dd') : '',
      completionDate: project.completionDate ? format(new Date(project.completionDate), 'yyyy-MM-dd') : '',
      status: project.status || 'IN_PROGRESS',
      notes: project.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        completionDate: formData.completionDate || null,
      };
      if (editingProject) {
        await projectsAPI.update(editingProject.id, payload);
        toast.success('Project updated');
      } else {
        await projectsAPI.create(payload);
        toast.success('Project created');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await projectsAPI.delete(deleteId);
      toast.success('Project deleted');
      setDeleteId(null);
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Project Manager</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build, ship, and showcase production-grade software applications ({totalElements} total)
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="self-start sm:self-auto">
          <Plus size={18} /> Add Project
        </Button>
      </div>

      {/* Filter toolbar */}
      <Card className="p-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="PLANNING">Planning</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <Button type="submit" variant="secondary">
            Filter
          </Button>
        </form>
      </Card>

      {/* Projects Grid */}
      {loading ? (
        <PageLoader />
      ) : projects.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No projects recorded"
            description="Start documenting your full-stack apps, libraries, microservices, and experiments."
            action={
              <Button onClick={handleOpenCreate} className="mt-2">
                <Plus size={16} /> Add Your First Project
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const status = STATUS_BADGES[proj.status] || { variant: 'default', label: proj.status };
            const stackArray = proj.techStack
              ? proj.techStack.split(',').map((s) => s.trim()).filter(Boolean)
              : [];

            return (
              <Card key={proj.id} className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">{proj.projectName}</h3>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 min-h-[48px]">
                    {proj.description || 'No description provided.'}
                  </p>

                  {/* Tech stack tags */}
                  {stackArray.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {stackArray.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 mb-4">
                    {proj.startDate && (
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>Started: {format(new Date(proj.startDate), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                    {proj.completionDate && (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span>Completed: {format(new Date(proj.completionDate), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <FolderGit2 size={18} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 text-xs font-medium"
                        title="Live Deployment"
                      >
                        <Globe size={16} /> Live
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(proj.id)}
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create Project'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Name *"
            required
            placeholder="e.g. DevTrack, E-Commerce Microservices, AI Agent"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          />

          <Textarea
            label="Description"
            rows={3}
            placeholder="What does this project do? Key architecture highlights..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Input
            label="Tech Stack (comma separated)"
            placeholder="e.g. React, Spring Boot, PostgreSQL, Docker, Tailwind"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GitHub Repository URL"
              type="url"
              placeholder="https://github.com/..."
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
            <Input
              label="Live Deployment URL"
              type="url"
              placeholder="https://devtrack.app"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="PLANNING">Planning</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </Select>

            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />

            <Input
              label="Completion Date"
              type="date"
              value={formData.completionDate}
              onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
            />
          </div>

          <Textarea
            label="Private Notes / Milestones"
            rows={2}
            placeholder="Next sprint goals, bugs to fix, refactoring ideas..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editingProject ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to permanently delete this project record?"
        loading={submitting}
      />
    </div>
  );
}
