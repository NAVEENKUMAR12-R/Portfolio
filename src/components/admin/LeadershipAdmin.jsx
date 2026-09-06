import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Save, Users, Bug, HeartHandshake } from 'lucide-react';

export default function LeadershipAdmin({ onSaveNotification }) {
  const { leadershipData, setLeadershipData } = usePortfolio();
  const [leadership, setLeadership] = useState(leadershipData || []);

  const handleAdd = () => {
    const newLead = {
      title: 'New Event or Initiative',
      role: 'Lead Coordinator',
      scope: 'Event Scope Description',
      participants: '100+ Participants',
      accent: 'from-cyan-500 to-blue-600',
      points: [
        'Spearheaded event planning and organization.',
        'Mentored participants and coordinated execution.'
      ]
    };
    setLeadership([newLead, ...leadership]);
  };

  const handleRemove = (idx) => {
    setLeadership(leadership.filter((_, i) => i !== idx));
  };

  const handleChange = (idx, field, value) => {
    setLeadership(leadership.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  const handleAddPoint = (idx, point) => {
    if (!point.trim()) return;
    setLeadership(leadership.map((item, i) => {
      if (i === idx) {
        return { ...item, points: [...(item.points || []), point.trim()] };
      }
      return item;
    }));
  };

  const handleRemovePoint = (leadIdx, pIdx) => {
    setLeadership(leadership.map((item, i) => {
      if (i === leadIdx) {
        return { ...item, points: item.points.filter((_, p) => p !== pIdx) };
      }
      return item;
    }));
  };

  const handleSave = () => {
    setLeadershipData(leadership);
    onSaveNotification('Leadership and mentorship saved successfully!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Leadership & Volunteering Manager</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Modify student symposium coordination, mentoring initiatives, and achievements.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleAdd} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.88rem' }}>
            <Plus size={16} />
            <span>Add Leadership Role</span>
          </button>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Leadership Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {leadership.map((item, idx) => (
          <LeadershipEditorItem
            key={idx}
            item={item}
            index={idx}
            onChange={handleChange}
            onAddPoint={handleAddPoint}
            onRemovePoint={handleRemovePoint}
            onDelete={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}

function LeadershipEditorItem({ item, index, onChange, onAddPoint, onRemovePoint, onDelete }) {
  const [newPoint, setNewPoint] = useState('');

  return (
    <div className="glass-card" style={{ padding: '28px', borderLeft: '4px solid #ec4899' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
          {item.title}
        </h4>
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
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Event / Initiative Title</label>
          <input
            type="text"
            value={item.title || ''}
            onChange={(e) => onChange(index, 'title', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Role / Capacity</label>
          <input
            type="text"
            value={item.role || ''}
            onChange={(e) => onChange(index, 'role', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#ec4899', fontWeight: 700, fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Scope / Topic</label>
          <input
            type="text"
            value={item.scope || ''}
            onChange={(e) => onChange(index, 'scope', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>Participants / Attendees</label>
          <input
            type="text"
            value={item.participants || ''}
            onChange={(e) => onChange(index, 'participants', e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>
      </div>

      {/* Points */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
          Contributions & Responsibilities
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {item.points?.map((pt, pIdx) => (
            <div key={pIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.25)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
              <span style={{ color: '#e2e8f0' }}>{pt}</span>
              <button
                onClick={() => onRemovePoint(index, pIdx)}
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
            placeholder="Add responsibility bullet..."
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddPoint(index, newPoint);
                setNewPoint('');
              }
            }}
            className="glass-card"
            style={{ flex: 1, padding: '6px 12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
          />
          <button
            onClick={() => {
              onAddPoint(index, newPoint);
              setNewPoint('');
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
