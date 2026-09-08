import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Save, User, Link, GraduationCap } from 'lucide-react';

export default function PersonalAdmin({ onSaveNotification }) {
  const { personalInfo, saveSectionToCloud } = usePortfolio();
  const [data, setData] = useState(personalInfo);
  const [newRole, setNewRole] = useState('');
  const [saving, setSaving] = useState(false);


  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [key]: value }
    }));
  };

  const handleAddRole = () => {
    if (!newRole.trim()) return;
    setData((prev) => ({
      ...prev,
      roles: [...prev.roles, newRole.trim()]
    }));
    setNewRole('');
  };

  const handleRemoveRole = (index) => {
    setData((prev) => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index)
    }));
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...data.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setData((prev) => ({ ...prev, stats: updatedStats }));
  };

  const handleAddStat = () => {
    const newStat = {
      label: 'New Metric',
      value: '100+',
      subtitle: 'Highlight metric detail',
      icon: 'Trophy'
    };
    setData((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), newStat]
    }));
  };

  const handleRemoveStat = (index) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await saveSectionToCloud('personalInfo', data);
    setSaving(false);
    onSaveNotification(res?.message || 'Personal details saved to cloud database!');
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Save Button Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Personal Details & Social Links</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Modify basic information, headline, academic metrics, roles, and links.</p>
        </div>
        <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Basic Info Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Full Name</label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Institution / College</label>
          <input
            type="text"
            value={data.institution || ''}
            onChange={(e) => handleChange('institution', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Degree</label>
          <input
            type="text"
            value={data.degree || ''}
            onChange={(e) => handleChange('degree', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>CGPA</label>
          <input
            type="text"
            value={data.cgpa || ''}
            onChange={(e) => handleChange('cgpa', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Location</label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Availability Status Badge</label>
          <input
            type="text"
            value={data.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>
      </div>

      {/* Headlines & Subtitles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Hero Main Headline</label>
          <input
            type="text"
            value={data.headline || ''}
            onChange={(e) => handleChange('headline', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Hero Subtitle Paragraph</label>
          <textarea
            rows="3"
            value={data.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none', resize: 'vertical' }}
          />
        </div>
      </div>

      {/* Animated Typing Roles Manager */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#00f0ff', marginBottom: '12px' }}>
          Hero Animated Typing Roles
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          {data.roles.map((role, idx) => (
            <div
              key={idx}
              className="glass-pill"
              style={{ padding: '6px 12px', background: 'rgba(0, 240, 255, 0.08)', borderColor: 'rgba(0, 240, 255, 0.25)', color: '#f8fafc' }}
            >
              <span>{role}</span>
              <button
                onClick={() => handleRemoveRole(idx)}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Add new role (e.g. Distributed Systems Engineer)"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
            className="glass-card"
            style={{ flex: 1, padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
          />
          <button onClick={handleAddRole} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Plus size={16} />
            <span>Add Role</span>
          </button>
        </div>
      </div>

      {/* Social Links Configuration */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#a855f7', marginBottom: '16px' }}>
          Socials & Contact Links
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>GitHub Profile Link</label>
            <input
              type="text"
              value={data.socials?.github || ''}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              className="glass-card"
              style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>LinkedIn Profile Link</label>
            <input
              type="text"
              value={data.socials?.linkedin || ''}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="glass-card"
              style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>Primary Contact Email</label>
            <input
              type="email"
              value={data.socials?.email || ''}
              onChange={(e) => handleSocialChange('email', e.target.value)}
              className="glass-card"
              style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>LeetCode Profile Link</label>
            <input
              type="text"
              value={data.socials?.leetcode || ''}
              onChange={(e) => handleSocialChange('leetcode', e.target.value)}
              className="glass-card"
              style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.8rem', color: '#00f0ff', fontWeight: 600 }}>
                Web3Forms Access Key (For Direct Message Email Delivery)
              </label>
              <a
                href="https://web3forms.com"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.75rem', color: '#38bdf8', textDecoration: 'underline' }}
              >
                Get Free Access Key ↗
              </a>
            </div>
            <input
              type="password"
              placeholder="e.g. a87d89f2-xxxx-xxxx-xxxx-xxxxxxxxxxxx (or set VITE_WEB3FORMS_ACCESS_KEY in .env)"
              value={data.web3formsKey || ''}
              onChange={(e) => handleChange('web3formsKey', e.target.value)}
              className="glass-card"
              style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none', border: '1px solid rgba(0, 240, 255, 0.3)' }}
            />
            <p style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px' }}>
              When set, direct messages from the contact form will be instantly delivered to your email ({data.socials?.email || 'your email'}).
            </p>
          </div>
        </div>
      </div>

      {/* Key Metric Stats Cards */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f59e0b' }}>
              Key Metrics & About Stats Cards
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '2px' }}>
              Add, remove, or edit your highlighted stats cards displayed in the About section.
            </p>
          </div>
          <button
            onClick={handleAddStat}
            className="btn-secondary"
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              color: '#f59e0b'
            }}
          >
            <Plus size={14} />
            <span>Add Metric</span>
          </button>
        </div>

        {(!data.stats || data.stats.length === 0) ? (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              color: '#94a3b8'
            }}
          >
            <p style={{ fontSize: '0.88rem', marginBottom: '10px' }}>No metrics configured currently.</p>
            <button
              onClick={handleAddStat}
              className="btn-primary"
              style={{ padding: '6px 16px', fontSize: '0.82rem' }}
            >
              <Plus size={14} />
              <span>Create First Metric Card</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>
                    Metric #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveStat(idx)}
                    title="Delete Metric"
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Label</label>
                    <input
                      type="text"
                      placeholder="e.g. CGPA, DSA Problems"
                      value={stat.label || ''}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.84rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Value</label>
                    <input
                      type="text"
                      placeholder="e.g. 9.05, 1,065+"
                      value={stat.value || ''}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#00f0ff', borderRadius: '6px', fontWeight: 700, fontSize: '0.84rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Academic Excellence, Across Coding Platforms"
                    value={stat.subtitle || ''}
                    onChange={(e) => handleStatChange(idx, 'subtitle', e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.84rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Icon</label>
                  <select
                    value={stat.icon || 'Trophy'}
                    onChange={(e) => handleStatChange(idx, 'icon', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      background: '#0d111d',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#cbd5e1',
                      borderRadius: '6px',
                      fontSize: '0.84rem',
                      outline: 'none'
                    }}
                  >
                    <option value="GraduationCap">GraduationCap (Academic / Degree)</option>
                    <option value="Code2">Code2 (DSA / Programming)</option>
                    <option value="Trophy">Trophy (Competitions / Ratings)</option>
                    <option value="Flame">Flame (Hackathons / Streaks)</option>
                    <option value="Award">Award (Certificates / Honors)</option>
                    <option value="Sparkles">Sparkles (Innovation / Highlights)</option>
                    <option value="Zap">Zap (Performance / Speed)</option>
                    <option value="Star">Star (Recognition)</option>
                    <option value="Target">Target (Goals / Accuracy)</option>
                    <option value="Cpu">Cpu (Engineering / Systems)</option>
                    <option value="Layers">Layers (Full-Stack / Architecture)</option>
                    <option value="BookOpen">BookOpen (Publications / Research)</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
