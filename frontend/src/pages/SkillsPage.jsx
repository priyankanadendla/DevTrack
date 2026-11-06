import { useState, useEffect } from 'react';
import { skillsAPI } from '../api';
import { Card, Button, Input, Select, Textarea, Badge, Modal, ConfirmDialog, EmptyState, PageLoader, ProgressBar } from '../components/ui';
import { Plus, Edit2, Trash2, Award, Zap, Sparkles, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const DEFAULT_SUGGESTED_SKILLS = [
  { skillName: 'Java', category: 'Backend', proficiencyLevel: 80, isPrimary: true },
  { skillName: 'Spring Boot', category: 'Backend', proficiencyLevel: 75, isPrimary: true },
  { skillName: 'PostgreSQL', category: 'Database', proficiencyLevel: 70, isPrimary: false },
  { skillName: 'React.js', category: 'Frontend', proficiencyLevel: 85, isPrimary: true },
  { skillName: 'JavaScript', category: 'Frontend', proficiencyLevel: 85, isPrimary: false },
  { skillName: 'Git & GitHub', category: 'DevOps', proficiencyLevel: 80, isPrimary: false },
  { skillName: 'SQL', category: 'Database', proficiencyLevel: 75, isPrimary: false },
  { skillName: 'Python', category: 'Languages', proficiencyLevel: 65, isPrimary: false },
  { skillName: 'HTML & CSS', category: 'Frontend', proficiencyLevel: 90, isPrimary: false },
  { skillName: 'Docker', category: 'DevOps', proficiencyLevel: 60, isPrimary: false },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    skillName: '',
    category: 'Backend',
    proficiencyLevel: 60,
    yearsOfExperience: '1.0',
    isPrimary: false,
    notes: '',
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await skillsAPI.getAll();
      setSkills(res.data || []);
    } catch (err) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      skillName: skill.skillName || '',
      category: skill.category || 'General',
      proficiencyLevel: skill.proficiencyLevel || 0,
      yearsOfExperience: skill.yearsOfExperience || '',
      isPrimary: !!skill.isPrimary,
      notes: skill.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        proficiencyLevel: Number(formData.proficiencyLevel),
        yearsOfExperience: formData.yearsOfExperience ? Number(formData.yearsOfExperience) : null,
      };

      if (editingSkill) {
        await skillsAPI.update(editingSkill.id, payload);
        toast.success('Skill updated');
      } else {
        await skillsAPI.create(payload);
        toast.success('Skill added');
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeedDefaults = async () => {
    setSubmitting(true);
    try {
      for (const item of DEFAULT_SUGGESTED_SKILLS) {
        if (!skills.some((s) => s.skillName.toLowerCase() === item.skillName.toLowerCase())) {
          await skillsAPI.create(item);
        }
      }
      toast.success('Standard skills populated!');
      fetchSkills();
    } catch (err) {
      toast.error('Could not populate skills');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await skillsAPI.delete(deleteId);
      toast.success('Skill deleted');
      setDeleteId(null);
      fetchSkills();
    } catch (err) {
      toast.error('Failed to delete skill');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = Array.from(new Set(skills.map((s) => s.category).filter(Boolean)));
  const filteredSkills = categoryFilter ? skills.filter((s) => s.category === categoryFilter) : skills;

  // Radar chart data from top 6 skills
  const radarData = skills.slice(0, 7).map((s) => ({
    subject: s.skillName,
    proficiency: s.proficiencyLevel,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Developer Skills Tracker</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Quantify and visualize your technical competency and proficiencies ({skills.length} tracked)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {skills.length === 0 && (
            <Button variant="secondary" onClick={handleSeedDefaults} loading={submitting}>
              <Sparkles size={16} /> Seed Default Skills
            </Button>
          )}
          <Button onClick={handleOpenCreate}>
            <Plus size={18} /> Add Skill
          </Button>
        </div>
      </div>

      {/* Chart & Summary Top Section */}
      {skills.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Competency Radar</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#cbd5e1" className="dark:stroke-slate-700" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Proficiency %" dataKey="proficiency" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Core Focus Areas</h2>
              <div className="space-y-3">
                {skills
                  .filter((s) => s.isPrimary)
                  .slice(0, 5)
                  .map((s) => (
                    <div key={s.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        {s.skillName}
                      </span>
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                        {s.proficiencyLevel}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500">
              Average Competency:{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">
                {Math.round(skills.reduce((acc, curr) => acc + curr.proficiencyLevel, 0) / (skills.length || 1))}%
              </strong>
            </div>
          </Card>
        </div>
      )}

      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setCategoryFilter('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === ''
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            All Categories ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat} ({skills.filter((s) => s.category === cat).length})
            </button>
          ))}
        </div>
      )}

      {/* Skills Grid */}
      {loading ? (
        <PageLoader />
      ) : filteredSkills.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No skills found"
            description="Add your languages, frameworks, databases, and development tooling."
            action={
              <Button onClick={handleOpenCreate} className="mt-2">
                <Plus size={16} /> Add Your First Skill
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{skill.skillName}</h3>
                    {skill.isPrimary && (
                      <span title="Primary focus">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {skill.category || 'General'}
                    {skill.yearsOfExperience ? ` · ${skill.yearsOfExperience} yrs exp` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(skill.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Proficiency</span>
                  <span className="font-medium text-slate-900 dark:text-white">{skill.proficiencyLevel}%</span>
                </div>
                <ProgressBar
                  value={skill.proficiencyLevel}
                  color={
                    skill.proficiencyLevel >= 80 ? 'success' : skill.proficiencyLevel >= 50 ? 'primary' : 'warning'
                  }
                />
              </div>

              {skill.notes && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 line-clamp-2">
                  {skill.notes}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Skill Name *"
            required
            placeholder="e.g. Java, React, Docker, Kubernetes"
            value={formData.skillName}
            onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Languages">Languages</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps & Cloud</option>
              <option value="Mobile">Mobile</option>
              <option value="Architecture">Architecture</option>
              <option value="Testing">Testing</option>
              <option value="Other">Other</option>
            </Select>

            <Input
              label="Years of Experience"
              type="number"
              step="0.5"
              placeholder="e.g. 2.5"
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-medium text-slate-700 dark:text-slate-300">Proficiency Level</label>
              <span className="font-bold text-primary-600 dark:text-primary-400">{formData.proficiencyLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.proficiencyLevel}
              onChange={(e) => setFormData({ ...formData, proficiencyLevel: e.target.value })}
              className="w-full accent-primary-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isPrimary"
              checked={formData.isPrimary}
              onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
              className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="isPrimary" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              Mark as primary focus skill (highlighted on dashboard)
            </label>
          </div>

          <Textarea
            label="Notes / Learning Roadmap"
            rows={2}
            placeholder="Key concepts to master, next certifications, projects using this..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editingSkill ? 'Update Skill' : 'Save Skill'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Skill"
        message="Are you sure you want to remove this skill from your profile?"
        loading={submitting}
      />
    </div>
  );
}
