import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Save } from 'lucide-react';

export default function ProjectsAdmin({ onSaveNotification }) {
  const { projectsData, saveSectionToCloud } = usePortfolio();
  const [projects, setProjects] = useState(projectsData || []);
  const [saving, setSaving] = useState(false);


  const handleAddProject = () => {
    const newProj = {
      id: `project-${Date.now()}`,
      title: 'NEW PROJECT TITLE',
      tagline: 'High-Impact Full Stack Web App',
      category: 'Full-Stack Web App',
      badge: 'Featured System',
      accent: 'from-cyan-500 via-blue-600 to-indigo-700',
      glowColor: 'rgba(0, 240, 255, 0.4)',
      techStack: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'],
      description: 'A concise 2-sentence description of the project and user capabilities.',
      detailedDescription: 'In-depth architectural breakdown and challenges solved.',
      features: [
        'End-to-end responsive client interface.',
        'High-performance backend RESTful endpoints.',
        'Zero-downtime database schemas.'
      ],
      architecture: [
        { label: 'Frontend', val: 'React.js' },
        { label: 'Backend', val: 'Node.js / Express' },
        { label: 'Database', val: 'MongoDB' }
      ],
      github: 'https://github.com/NAVEENKUMAR12-R',
      demo: '#'
    };
    setProjects([newProj, ...projects]);
  };

  const handleRemoveProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleTechStackChange = (id, commaSeparated) => {
    const arr = commaSeparated.split(',').map((t) => t.trim()).filter(Boolean);
    handleProjectChange(id, 'techStack', arr);
  };

  const handleAddFeature = (id, featureText) => {
    if (!featureText.trim()) return;
    setProjects(projects.map((p) => {
      if (p.id === id) {
        return { ...p, features: [...(p.features || []), featureText.trim()] };
      }
      return p;
    }));
  };

  const handleRemoveFeature = (id, fIdx) => {
    setProjects(projects.map((p) => {
      if (p.id === id) {
        return { ...p, features: p.features.filter((_, i) => i !== fIdx) };
      }
      return p;
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSectionToCloud('projectsData', projects);
    setSaving(false);
    onSaveNotification(res?.message || 'Projects saved to cloud database!');
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Featured Projects & Deep Dive Specs</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Modify project details, technical features, links, and architecture layers.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleAddProject} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.88rem' }}>
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {projects.map((proj, idx) => (
          <ProjectEditorItem
            key={proj.id}
            project={proj}
            index={idx}
            onChange={handleProjectChange}
            onTechChange={handleTechStackChange}
            onAddFeature={handleAddFeature}
            onRemoveFeature={handleRemoveFeature}
            onDelete={handleRemoveProject}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectEditorItem({ project, index, onChange, onTechChange, onAddFeature, onRemoveFeature, onDelete }) {
  const [newFeature, setNewFeature] = useState('');

  return (
    <div className="glass-card" style={{ padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="font-mono" style={{ fontSize: '0.85rem', color: '#00f0ff', background: 'rgba(0,240,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
            #{index + 1}
          </span>
          <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
            {project.title}
          </h4>
        </div>
        <button
          onClick={() => onDelete(project.id)}
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
        >
          <Trash2 size={14} />
          <span>Delete Project</span>
        </button>
      </div>

      {/* Primary Input Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Project Title</label>
          <input
            type="text"
            value={project.title || ''}
            onChange={(e) => onChange(project.id, 'title', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Tagline</label>
          <input
            type="text"
            value={project.tagline || ''}
            onChange={(e) => onChange(project.id, 'tagline', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Category Badge</label>
          <input
            type="text"
            value={project.category || ''}
            onChange={(e) => onChange(project.id, 'category', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Highlight Badge (e.g. Featured System)</label>
          <input
            type="text"
            value={project.badge || ''}
            onChange={(e) => onChange(project.id, 'badge', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>
      </div>

      {/* URLs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>GitHub Repo URL</label>
          <input
            type="text"
            value={project.github || ''}
            onChange={(e) => onChange(project.id, 'github', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Live Demo / Preview URL</label>
          <input
            type="text"
            value={project.demo || ''}
            onChange={(e) => onChange(project.id, 'demo', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
          />
        </div>
      </div>

      {/* Tech Stack Comma String */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Tech Stack (comma-separated: e.g. React.js, Node.js, MongoDB, Clerk)</label>
        <input
          type="text"
          value={project.techStack?.join(', ') || ''}
          onChange={(e) => onTechChange(project.id, e.target.value)}
          className="glass-card"
          style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontSize: '0.88rem', outline: 'none' }}
        />
      </div>

      {/* Descriptions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Card Description</label>
          <textarea
            rows="3"
            value={project.description || ''}
            onChange={(e) => onChange(project.id, 'description', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#cbd5e1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Detailed Modal Description</label>
          <textarea
            rows="3"
            value={project.detailedDescription || ''}
            onChange={(e) => onChange(project.id, 'detailedDescription', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#cbd5e1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
          />
        </div>
      </div>

      {/* Features List */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
          Key Features & Architecture Bullets
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {project.features?.map((feat, fIdx) => (
            <div key={fIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.25)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
              <span style={{ color: '#e2e8f0' }}>{feat}</span>
              <button
                onClick={() => onRemoveFeature(project.id, fIdx)}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Add new feature highlight bullet..."
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddFeature(project.id, newFeature);
                setNewFeature('');
              }
            }}
            className="glass-card"
            style={{ flex: 1, padding: '6px 12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
          />
          <button
            onClick={() => {
              onAddFeature(project.id, newFeature);
              setNewFeature('');
            }}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
          >
            <Plus size={14} />
            <span>Add Bullet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
