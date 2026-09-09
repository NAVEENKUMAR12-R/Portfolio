import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Save, Trophy } from 'lucide-react';

export default function AchievementsAdmin({ onSaveNotification }) {
  const { achievementsData, saveSectionToCloud } = usePortfolio();
  const [achievements, setAchievements] = useState(achievementsData || []);
  const [saving, setSaving] = useState(false);


  const handleAdd = () => {
    const newAch = {
      id: `ach-${Date.now()}`,
      title: 'New Hackathon / Competition Award',
      organization: 'Organizing Entity',
      meta: 'Scope or Team Size',
      year: new Date().getFullYear().toString(),
      icon: 'Trophy',
      accent: 'from-cyan-400 to-blue-500',
      glow: 'rgba(0, 240, 255, 0.3)',
      description: 'Summary of the solution and recognition received.'
    };
    setAchievements([newAch, ...achievements]);
  };

  const handleRemove = (id) => {
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  const handleChange = (id, field, value) => {
    setAchievements(achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSectionToCloud('achievementsData', achievements);
    setSaving(false);
    onSaveNotification(res?.message || 'Achievements saved to cloud database!');
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Achievements & Hackathons Manager</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Add or edit honors, GATE scores, rankings, and ideathon awards.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleAdd} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.88rem' }}>
            <Plus size={16} />
            <span>Add Achievement</span>
          </button>
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
      </div>

      {/* List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {achievements.map((ach) => (
          <div key={ach.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={18} color="#00f0ff" />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Honors Card</span>
                </div>
                <button
                  onClick={() => handleRemove(ach.id)}
                  style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Award Title</label>
                  <input
                    type="text"
                    value={ach.title || ''}
                    onChange={(e) => handleChange(ach.id, 'title', e.target.value)}
                    className="glass-card"
                    style={{ width: '100%', padding: '6px 10px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Scope / Metrics (e.g. Out of 200 teams / Score: 30.35)</label>
                  <input
                    type="text"
                    value={ach.meta || ''}
                    onChange={(e) => handleChange(ach.id, 'meta', e.target.value)}
                    className="glass-card"
                    style={{ width: '100%', padding: '6px 10px', color: '#00f0ff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Organization</label>
                    <input
                      type="text"
                      value={ach.organization || ''}
                      onChange={(e) => handleChange(ach.id, 'organization', e.target.value)}
                      className="glass-card"
                      style={{ width: '100%', padding: '6px 10px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Year</label>
                    <input
                      type="text"
                      value={ach.year || ''}
                      onChange={(e) => handleChange(ach.id, 'year', e.target.value)}
                      className="glass-card"
                      style={{ width: '100%', padding: '6px 10px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Description</label>
                  <textarea
                    rows="2"
                    value={ach.description || ''}
                    onChange={(e) => handleChange(ach.id, 'description', e.target.value)}
                    className="glass-card"
                    style={{ width: '100%', padding: '6px 10px', color: '#cbd5e1', fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
