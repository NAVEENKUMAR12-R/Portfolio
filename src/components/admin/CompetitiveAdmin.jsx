import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Trophy, Code2, TrendingUp, Award, ExternalLink, Trash2, Plus } from 'lucide-react';

export default function CompetitiveAdmin({ onSaveNotification }) {
  const { competitiveProgrammingData, setCompetitiveProgrammingData } = usePortfolio();
  const [data, setData] = useState(competitiveProgrammingData);

  const handleSummaryChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      summary: { ...prev.summary, [field]: value }
    }));
  };

  const handlePlatformChange = (pId, field, value) => {
    setData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) => (p.id === pId ? { ...p, [field]: value } : p))
    }));
  };

  const handleAddHighlight = (pId, text) => {
    if (!text.trim()) return;
    setData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) => {
        if (p.id === pId) {
          return { ...p, highlights: [...(p.highlights || []), text.trim()] };
        }
        return p;
      })
    }));
  };

  const handleRemoveHighlight = (pId, hIdx) => {
    setData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) => {
        if (p.id === pId) {
          return { ...p, highlights: p.highlights.filter((_, i) => i !== hIdx) };
        }
        return p;
      })
    }));
  };

  const handleSave = () => {
    setCompetitiveProgrammingData(data);
    onSaveNotification('Competitive programming statistics saved successfully!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Competitive Programming & Contest Stats</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Modify LeetCode Knight metrics, ratings, contest counts, and platform URLs.</p>
        </div>
        <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Global Summary Bar Inputs */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f59e0b', marginBottom: '14px' }}>
          Global CP Overview Counts
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Total Problems Solved (e.g. 1,065+)</label>
            <input
              type="text"
              value={data.summary?.totalSolved || ''}
              onChange={(e) => handleSummaryChange('totalSolved', e.target.value)}
              className="glass-card"
              style={{ width: '100%', padding: '8px 12px', color: '#f59e0b', fontWeight: 700, fontSize: '0.95rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Total Contests Attended (e.g. 150+)</label>
            <input
              type="text"
              value={data.summary?.totalContests || ''}
              onChange={(e) => handleSummaryChange('totalContests', e.target.value)}
              className="glass-card"
              style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontWeight: 700, fontSize: '0.95rem', outline: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.platforms?.map((platform) => (
          <PlatformEditorCard
            key={platform.id}
            platform={platform}
            onChange={handlePlatformChange}
            onAddHighlight={handleAddHighlight}
            onRemoveHighlight={handleRemoveHighlight}
          />
        ))}
      </div>
    </div>
  );
}

function PlatformEditorCard({ platform, onChange, onAddHighlight, onRemoveHighlight }) {
  const [newHighlight, setNewHighlight] = useState('');

  return (
    <div className="glass-card" style={{ padding: '24px', borderTop: `3px solid ${platform.accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
          {platform.name}
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Accent:</label>
          <input
            type="color"
            value={platform.accent || '#f59e0b'}
            onChange={(e) => onChange(platform.id, 'accent', e.target.value)}
            style={{ width: '28px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Badge / Rank Title</label>
          <input
            type="text"
            value={platform.badge || ''}
            onChange={(e) => onChange(platform.id, 'badge', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: platform.accent, fontWeight: 700, fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Problems Solved</label>
          <input
            type="text"
            value={platform.solved || ''}
            onChange={(e) => onChange(platform.id, 'solved', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Peak / Max Rating</label>
          <input
            type="text"
            value={platform.maxRating || ''}
            onChange={(e) => onChange(platform.id, 'maxRating', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: platform.accent, fontWeight: 700, fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Contests Count</label>
          <input
            type="text"
            value={platform.contests || ''}
            onChange={(e) => onChange(platform.id, 'contests', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Profile Link</label>
        <input
          type="text"
          value={platform.link || ''}
          onChange={(e) => onChange(platform.id, 'link', e.target.value)}
          className="glass-card"
          style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontSize: '0.88rem', outline: 'none' }}
        />
      </div>

      {/* Highlights */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
          Platform Highlights
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
          {platform.highlights?.map((h, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span style={{ color: '#cbd5e1' }}>{h}</span>
              <button
                onClick={() => onRemoveHighlight(platform.id, idx)}
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
            placeholder="Add highlight point..."
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddHighlight(platform.id, newHighlight);
                setNewHighlight('');
              }
            }}
            className="glass-card"
            style={{ flex: 1, padding: '6px 10px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
          />
          <button
            onClick={() => {
              onAddHighlight(platform.id, newHighlight);
              setNewHighlight('');
            }}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Plus size={13} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
