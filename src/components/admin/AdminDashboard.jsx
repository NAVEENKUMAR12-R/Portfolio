import React, { useState } from 'react';
import {
  User,
  Layers,
  Code2,
  Briefcase,
  Trophy,
  Award,
  Users,
  Download,
  X,
  Eye,
  CheckCircle2,
  Settings,
  Lock
} from 'lucide-react';

import PersonalAdmin from './PersonalAdmin';
import SkillsAdmin from './SkillsAdmin';
import ProjectsAdmin from './ProjectsAdmin';
import ExperienceAdmin from './ExperienceAdmin';
import CompetitiveAdmin from './CompetitiveAdmin';
import AchievementsAdmin from './AchievementsAdmin';
import LeadershipAdmin from './LeadershipAdmin';
import BackupAdmin from './BackupAdmin';
import { usePortfolio } from '../../context/PortfolioContext';

export default function AdminDashboard({ onClose, onLogout }) {
  const { cloudStatus, setAdminSecret } = usePortfolio();
  const [activeTab, setActiveTab] = useState('personal');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to lock the creator dashboard and log out?')) {
      localStorage.removeItem('portfolio_admin_auth');
      sessionStorage.removeItem('portfolio_admin_auth');
      setAdminSecret('');
      if (onLogout) onLogout();
      else onClose();
    }
  };

  const navItems = [
    { id: 'personal', label: 'Personal & Links', icon: User, color: '#00f0ff' },
    { id: 'skills', label: 'Skills Matrix', icon: Layers, color: '#a855f7' },
    { id: 'projects', label: 'Featured Projects', icon: Code2, color: '#ec4899' },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, color: '#3b82f6' },
    { id: 'cp', label: 'Competitive Stats', icon: Trophy, color: '#f59e0b' },
    { id: 'achievements', label: 'Achievements', icon: Award, color: '#10b981' },
    { id: 'leadership', label: 'Leadership', icon: Users, color: '#ec4899' },
    { id: 'backup', label: 'MongoDB & Backup', icon: Download, color: '#00f0ff' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(5, 7, 13, 0.96)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 1000,
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.92rem',
            fontWeight: 600,
            animation: 'float 0.3s ease'
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(10, 14, 26, 0.95)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#07080e',
              fontWeight: 900
            }}
          >
            <Settings size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#f8fafc' }}>
                Portfolio Admin Cockpit
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#00f0ff',
                  background: 'rgba(0, 240, 255, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                LIVE EDITOR
              </span>

              {/* MongoDB Status Badge */}
              <button
                onClick={() => setActiveTab('backup')}
                title="Click to view MongoDB Cloud settings"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background:
                    cloudStatus === 'connected'
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(245, 158, 11, 0.15)',
                  color: cloudStatus === 'connected' ? '#10b981' : '#f59e0b',
                  border: `1px solid ${
                    cloudStatus === 'connected'
                      ? 'rgba(16, 185, 129, 0.3)'
                      : 'rgba(245, 158, 11, 0.3)'
                  }`
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: cloudStatus === 'connected' ? '#10b981' : '#f59e0b'
                  }}
                />
                <span>
                  {cloudStatus === 'connected'
                    ? 'MongoDB Synced'
                    : 'Local Mode (No DB URI)'}
                </span>
              </button>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Configure all content, links, metrics, and project data in real-time.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <Eye size={16} />
            <span>View Live Portfolio</span>
          </button>

          <button
            onClick={handleLogoutClick}
            title="Lock & Logout Admin"
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#f87171',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Lock size={15} />
            <span>Lock</span>
          </button>

          <button
            onClick={onClose}
            aria-label="Close Admin"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </header>



      {/* Main Workspace: Sidebar + Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar Navigation */}
        <aside
          style={{
            width: '240px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(8, 11, 20, 0.9)',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflowY: 'auto'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: isActive ? `1px solid ${item.color}50` : '1px solid transparent',
                  background: isActive ? `${item.color}15` : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={isActive ? item.color : '#64748b'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Dynamic Content Panel */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px 40px',
            background: 'linear-gradient(180deg, rgba(12, 16, 30, 0.4) 0%, rgba(7, 8, 14, 0.8) 100%)'
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {activeTab === 'personal' && <PersonalAdmin onSaveNotification={triggerToast} />}
            {activeTab === 'skills' && <SkillsAdmin onSaveNotification={triggerToast} />}
            {activeTab === 'projects' && <ProjectsAdmin onSaveNotification={triggerToast} />}
            {activeTab === 'experience' && <ExperienceAdmin onSaveNotification={triggerToast} />}
            {activeTab === 'cp' && <CompetitiveAdmin onSaveNotification={triggerToast} />}
            {activeTab === 'achievements' && <AchievementsAdmin onSaveNotification={triggerToast} />}
            {activeTab === 'leadership' && <LeadershipAdmin onSaveNotification={triggerToast} />}
            {activeTab === 'backup' && <BackupAdmin onSaveNotification={triggerToast} />}
          </div>
        </main>
      </div>
    </div>
  );
}
