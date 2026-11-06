import { useState, useEffect } from 'react';
import { jobsAPI } from '../api';
import { Card, Button, Input, Select, Textarea, Badge, Modal, ConfirmDialog, EmptyState, PageLoader } from '../components/ui';
import { Plus, Search, Filter, Edit2, Trash2, ExternalLink, MapPin, DollarSign, Calendar, Building, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const STATUS_BADGES = {
  APPLIED: { variant: 'info', label: 'Applied' },
  ASSESSMENT: { variant: 'warning', label: 'Assessment' },
  INTERVIEW: { variant: 'purple', label: 'Interview' },
  SELECTED: { variant: 'success', label: 'Selected' },
  REJECTED: { variant: 'danger', label: 'Rejected' },
};

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const initialForm = {
    companyName: '',
    jobRole: '',
    location: '',
    applicationDate: format(new Date(), 'yyyy-MM-dd'),
    salaryMin: '',
    salaryMax: '',
    jobDescription: '',
    status: 'APPLIED',
    notes: '',
    jobUrl: '',
    contactName: '',
    contactEmail: '',
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        size: 9,
        search: search || undefined,
        status: statusFilter || undefined,
      };
      const res = await jobsAPI.getAll(params);
      setJobs(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalElements(res.data.totalElements || 0);
    } catch (err) {
      toast.error('Failed to load job applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchJobs();
  };

  const handleOpenCreate = () => {
    setEditingJob(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      companyName: job.companyName || '',
      jobRole: job.jobRole || '',
      location: job.location || '',
      applicationDate: job.applicationDate ? format(new Date(job.applicationDate), 'yyyy-MM-dd') : '',
      salaryMin: job.salaryMin || '',
      salaryMax: job.salaryMax || '',
      jobDescription: job.jobDescription || '',
      status: job.status || 'APPLIED',
      notes: job.notes || '',
      jobUrl: job.jobUrl || '',
      contactName: job.contactName || '',
      contactEmail: job.contactEmail || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        salaryMin: formData.salaryMin ? Number(formData.salaryMin) : null,
        salaryMax: formData.salaryMax ? Number(formData.salaryMax) : null,
      };

      if (editingJob) {
        await jobsAPI.update(editingJob.id, payload);
        toast.success('Job application updated');
      } else {
        await jobsAPI.create(payload);
        toast.success('Job application added');
      }
      setIsModalOpen(false);
      fetchJobs();
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
      await jobsAPI.delete(deleteId);
      toast.success('Application removed');
      setDeleteId(null);
      fetchJobs();
    } catch (err) {
      toast.error('Failed to delete application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Applications</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track, manage, and optimize your tech career opportunities ({totalElements} total)
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="self-start sm:self-auto">
          <Plus size={18} />
          Add Application
        </Button>
      </div>

      {/* Filters bar */}
      <Card className="p-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by company or job role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="ASSESSMENT">Assessment</option>
              <option value="INTERVIEW">Interview</option>
              <option value="SELECTED">Selected</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>
      </Card>

      {/* Content */}
      {loading ? (
        <PageLoader />
      ) : jobs.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No job applications found"
            description="You haven't added any job applications yet or no results match your search."
            action={
              <Button onClick={handleOpenCreate} className="mt-2">
                <Plus size={16} /> Add First Application
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => {
            const badge = STATUS_BADGES[job.status] || { variant: 'default', label: job.status };
            return (
              <Card key={job.id} className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white line-clamp-1">{job.jobRole}</h3>
                      <p className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1.5 mt-0.5">
                        <Building size={15} />
                        {job.companyName}
                      </p>
                    </div>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 my-4">
                    {job.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                    )}
                    {(job.salaryMin || job.salaryMax) && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-slate-400 flex-shrink-0" />
                        <span>
                          ${job.salaryMin ? Number(job.salaryMin).toLocaleString() : '0'} - ${job.salaryMax ? Number(job.salaryMax).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                    )}
                    {job.applicationDate && (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400 flex-shrink-0" />
                        <span>Applied on {format(new Date(job.applicationDate), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                  </div>

                  {job.jobDescription && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 bg-slate-50 dark:bg-slate-700/50 p-2 rounded">
                      {job.jobDescription}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    {job.jobUrl && (
                      <a
                        href={job.jobUrl.startsWith('http') ? job.jobUrl : `https://${job.jobUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                      >
                        Listing <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(job)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteId(job.id)}
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

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? 'Edit Application' : 'Add Job Application'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name *"
              required
              placeholder="e.g. Google, Microsoft, Meta"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
            <Input
              label="Job Role *"
              required
              placeholder="e.g. Software Engineer, Backend Dev"
              value={formData.jobRole}
              onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Location"
              placeholder="e.g. San Francisco, CA / Remote"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Input
              label="Application Date"
              type="date"
              value={formData.applicationDate}
              onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Application Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="APPLIED">Applied</option>
              <option value="ASSESSMENT">Assessment</option>
              <option value="INTERVIEW">Interview</option>
              <option value="SELECTED">Selected</option>
              <option value="REJECTED">Rejected</option>
            </Select>
            <Input
              label="Min Salary ($)"
              type="number"
              placeholder="e.g. 100000"
              value={formData.salaryMin}
              onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
            />
            <Input
              label="Max Salary ($)"
              type="number"
              placeholder="e.g. 140000"
              value={formData.salaryMax}
              onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
            />
          </div>

          <Input
            label="Job Listing URL"
            type="url"
            placeholder="https://..."
            value={formData.jobUrl}
            onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
          />

          <Textarea
            label="Job Description / Requirements"
            rows={3}
            placeholder="Key requirements, tech stack, notes from recruiter..."
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
          />

          <Textarea
            label="Private Notes"
            rows={2}
            placeholder="Follow up dates, interview prep questions, thoughts..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editingJob ? 'Update Application' : 'Save Application'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Job Application"
        message="Are you sure you want to delete this job application? This action cannot be undone."
        loading={submitting}
      />
    </div>
  );
}
