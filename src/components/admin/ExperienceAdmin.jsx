import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Save, Briefcase } from 'lucide-react';

export default function ExperienceAdmin({ onSaveNotification }) {
  const { experienceData, saveSectionToCloud } = usePortfolio();
  const [experiences, setExperiences] = useState(experienceData || []);
  const [saving, setSaving] = useState(false);


  const handleAddExperience = () => {
    const newExp = {
      role: 'Software Engineer Intern',
      company: 'Tech Company',
      period: 'Month 2025',
      type: 'Internship',
      location: 'Remote / Hybrid',
      description: 'Engineered scalable features, REST APIs, and client-facing components.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'Git'],
      highlights: [
        'Built responsive web interfaces and reusable components.',
        'Engineered backend REST endpoints.'
      ]
    };
    setExperiences([newExp, ...experiences]);
  };

  const handleRemoveExperience = (idx) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  const handleChange = (idx, field, value) => {
    setExperiences(experiences.map((exp, i) => (i === idx ? { ...exp, [field]: value } : exp)));
  };

  const handleTechChange = (idx, commaString) => {
    const arr = commaString.split(',').map((t) => t.trim()).filter(Boolean);
    handleChange(idx, 'technologies', arr);
  };

  const handleAddHighlight = (idx, text) => {
    if (!text.trim()) return;
    setExperiences(experiences.map((exp, i) => {
      if (i === idx) {
        return { ...exp, highlights: [...(exp.highlights || []), text.trim()] };
      }
      return exp;
    }));
  };

  const handleRemoveHighlight = (expIdx, hIdx) => {
    setExperiences(experiences.map((exp, i) => {
      if (i === expIdx) {
        return { ...exp, highlights: exp.highlights.filter((_, h) => h !== hIdx) };
      }
      return exp;
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSectionToCloud('experienceData', experiences);
    setSaving(false);
    onSaveNotification(res?.message || 'Work experience saved to cloud database!');
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Experience Timeline Manager</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Add or edit internships, roles, company names, dates, and impact points.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleAddExperience} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.88rem' }}>
            <Plus size={16} />
            <span>Add Experience</span>
          </button>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Experience List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {experiences.map((exp, idx) => (
          <ExperienceEditorCard
            key={idx}
            exp={exp}
            index={idx}
            onChange={handleChange}
            onTechChange={handleTechChange}
            onAddHighlight={handleAddHighlight}
            onRemoveHighlight={handleRemoveHighlight}
            onDelete={handleRemoveExperience}
          />
        ))}
      </div>
    </div>
  );
}

function ExperienceEditorCard({ exp, index, onChange, onTechChange, onAddHighlight, onRemoveHighlight, onDelete }) {
  const [newHighlight, setNewHighlight] = useState('');

  return (
    <div className="glass-card" style={{ padding: '28px', borderLeft: '4px solid #00f0ff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Briefcase size={20} color="#00f0ff" />
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            {exp.role} @ {exp.company}
          </h4>
        </div>
        <button
          onClick={() => onDelete(index)}
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} />
          <span>Remove</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Job Role</label>
          <input
            type="text"
            value={exp.role || ''}
            onChange={(e) => onChange(index, 'role', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Company Name</label>
          <input
            type="text"
            value={exp.company || ''}
            onChange={(e) => onChange(index, 'company', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Period / Dates</label>
          <input
            type="text"
            value={exp.period || ''}
            onChange={(e) => onChange(index, 'period', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Location / Mode</label>
          <input
            type="text"
            value={exp.location || ''}
            onChange={(e) => onChange(index, 'location', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Overview Description</label>
        <textarea
          rows="2"
          value={exp.description || ''}
          onChange={(e) => onChange(index, 'description', e.target.value)}
          className="glass-card"
          style={{ width: '100%', padding: '8px 12px', color: '#cbd5e1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Technologies Used (comma separated)</label>
        <input
          type="text"
          value={exp.technologies?.join(', ') || ''}
          onChange={(e) => onTechChange(index, e.target.value)}
          className="glass-card"
          style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontSize: '0.88rem', outline: 'none' }}
        />
      </div>

      {/* Highlights */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
          Contribution & Impact Bullets
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {exp.highlights?.map((h, hIdx) => (
            <div key={hIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.25)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
              <span style={{ color: '#e2e8f0' }}>{h}</span>
              <button
                onClick={() => onRemoveHighlight(index, hIdx)}
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
            placeholder="Add contribution highlight..."
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddHighlight(index, newHighlight);
                setNewHighlight('');
              }
            }}
            className="glass-card"
            style={{ flex: 1, padding: '6px 12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
          />
          <button
            onClick={() => {
              onAddHighlight(index, newHighlight);
              setNewHighlight('');
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
