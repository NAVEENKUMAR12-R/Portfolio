import React, { useState } from 'react';
import { Sparkles, Terminal, Layout, Database, Server, Wrench, Cpu, Check, Layers, Code } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
  const { skillsData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('all');

  const iconMap = {
    Terminal: Terminal,
    Layout: Layout,
    Database: Database,
    Server: Server,
    Wrench: Wrench,
    Cpu: Cpu
  };

  const categories = skillsData.categories || [];

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" style={{ position: 'relative' }}>
      {/* Background Glow */}
      <div className="ambient-glow-purple" style={{ top: '10%', left: '-120px' }} />
      <div className="ambient-glow-cyan" style={{ bottom: '10%', right: '-120px' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            className="glass-pill"
            style={{
              marginBottom: '16px',
              color: '#a855f7',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}
          >
            <Sparkles size={14} />
            <span>TECHNICAL EXPERTISE</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            Core Stacks &{' '}
            <span className="gradient-text-purple">Engineering Toolkit</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            A comprehensive, battle-tested skill matrix spanning full-stack frameworks, enterprise Java backends, relational & NoSQL databases, and computer science foundations.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px'
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: activeTab === 'all' ? '1px solid rgba(0, 240, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
              background: activeTab === 'all' ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(168, 85, 247, 0.2))' : 'rgba(255, 255, 255, 0.03)',
              color: activeTab === 'all' ? '#00f0ff' : '#94a3b8',
              boxShadow: activeTab === 'all' ? '0 0 15px rgba(0, 240, 255, 0.2)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            All Categories
          </button>

          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Code;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? `1px solid ${cat.accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isActive ? `${cat.accent}20` : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#f8fafc' : '#94a3b8',
                  boxShadow: isActive ? `0 0 15px ${cat.accent}30` : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <Icon size={15} color={isActive ? cat.accent : '#94a3b8'} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Code;
            return (
              <div
                key={cat.id}
                className="glass-card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `2px solid ${cat.accent || '#00f0ff'}80`
                }}
              >
                <div>
                  {/* Category Title */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: `${cat.accent || '#00f0ff'}15`,
                          border: `1px solid ${cat.accent || '#00f0ff'}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: cat.accent || '#00f0ff'
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
                        {cat.name}
                      </h3>
                    </div>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '4px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {cat.skills?.length || 0} skills
                    </span>
                  </div>

                  {/* Skills Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {cat.skills?.map((skill, idx) => (
                      <div
                        key={skill.name || idx}
                        className="glass-pill"
                        style={{
                          padding: '8px 14px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderColor: 'rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: '2px',
                          flexGrow: 1
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f1f5f9' }}>
                            {skill.name}
                          </span>
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: cat.accent || '#00f0ff',
                              boxShadow: `0 0 6px ${cat.accent || '#00f0ff'}`
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 400 }}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
