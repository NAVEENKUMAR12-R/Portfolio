import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Save } from 'lucide-react';

export default function SkillsAdmin({ onSaveNotification }) {
  const { skillsData, saveSectionToCloud } = usePortfolio();
  const [categories, setCategories] = useState(skillsData.categories || []);
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#00f0ff');
  const [saving, setSaving] = useState(false);

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newCat = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName.trim(),
      icon: 'Terminal',
      accent: newCatColor,
      skills: []
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
  };

  const handleRemoveCategory = (catId) => {
    setCategories(categories.filter((c) => c.id !== catId));
  };

  const handleCategoryChange = (catId, field, val) => {
    setCategories(categories.map((c) => (c.id === catId ? { ...c, [field]: val } : c)));
  };

  const handleAddSkill = (catId, skillName, skillLevel) => {
    if (!skillName.trim()) return;
    setCategories(categories.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: [...c.skills, { name: skillName.trim(), level: skillLevel.trim() || 'Proficient' }]
        };
      }
      return c;
    }));
  };

  const handleRemoveSkill = (catId, skillIndex) => {
    setCategories(categories.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: c.skills.filter((_, i) => i !== skillIndex)
        };
      }
      return c;
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSectionToCloud('skillsData', { categories });
    setSaving(false);
    onSaveNotification(res?.message || 'Skills saved to cloud database!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Save Button Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Technical Skills & Categories Manager</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Add, remove, or modify categories and skill pills with mastery levels.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.9rem', opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Add New Category Bar */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#00f0ff', marginBottom: '12px' }}>
          Create New Skill Category
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Category Name (e.g. Cloud & DevOps, AI / ML Tools)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="glass-card"
            style={{ flex: 1, minWidth: '220px', padding: '10px 14px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Accent:</label>
            <input
              type="color"
              value={newCatColor}
              onChange={(e) => setNewCatColor(e.target.value)}
              style={{ width: '38px', height: '38px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
          </div>
          <button onClick={handleAddCategory} className="btn-secondary" style={{ padding: '10px 18px' }}>
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Existing Categories List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {categories.map((cat) => (
          <SkillCategoryEditor
            key={cat.id}
            cat={cat}
            onUpdateCategory={handleCategoryChange}
            onRemoveCategory={handleRemoveCategory}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        ))}
      </div>
    </div>
  );
}

function SkillCategoryEditor({ cat, onUpdateCategory, onRemoveCategory, onAddSkill, onRemoveSkill }) {
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');

  const handleAdd = () => {
    if (!skillName.trim()) return;
    onAddSkill(cat.id, skillName, skillLevel);
    setSkillName('');
    setSkillLevel('');
  };

  return (
    <div className="glass-card" style={{ padding: '24px', borderLeft: `4px solid ${cat.accent}` }}>
      {/* Category Top Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <input
            type="text"
            value={cat.name}
            onChange={(e) => onUpdateCategory(cat.id, 'name', e.target.value)}
            style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', background: 'transparent', border: 'none', outline: 'none' }}
          />
          <input
            type="color"
            value={cat.accent}
            onChange={(e) => onUpdateCategory(cat.id, 'accent', e.target.value)}
            style={{ width: '28px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' }}
          />
        </div>

        <button
          onClick={() => onRemoveCategory(cat.id)}
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} />
          <span>Delete Category</span>
        </button>
      </div>

      {/* Skills Pills in this category */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {cat.skills.map((skill, idx) => (
          <div
            key={idx}
            className="glass-pill"
            style={{
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: `1px solid ${cat.accent}40`
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>{skill.name}</span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginLeft: '6px' }}>({skill.level})</span>
            </div>
            <button
              onClick={() => onRemoveSkill(cat.id, idx)}
              style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Skill to Category Inputs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <input
          type="text"
          placeholder="Skill Name (e.g. Next.js, Docker, Redis)"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="glass-card"
          style={{ flex: 1, minWidth: '160px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
        />
        <input
          type="text"
          placeholder="Proficiency Level (e.g. Advanced, Production, Intermediate)"
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="glass-card"
          style={{ flex: 1, minWidth: '160px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
        />
        <button onClick={handleAdd} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
          <Plus size={15} />
          <span>Add Skill</span>
        </button>
      </div>
    </div>
  );
}
