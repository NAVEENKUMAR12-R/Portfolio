import React from 'react';
import { Trophy, Award, Flame, Zap, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Achievements() {
  const { achievementsData } = usePortfolio();
  const achievements = achievementsData || [];

  const iconMap = {
    Trophy: Trophy,
    Award: Award,
    Flame: Flame,
    Zap: Zap
  };

  return (
    <section id="achievements" style={{ position: 'relative' }}>
      {/* Glow */}
      <div className="ambient-glow-cyan" style={{ top: '20%', left: '-120px' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            className="glass-pill"
            style={{
              marginBottom: '16px',
              color: '#10b981',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}
          >
            <Trophy size={14} />
            <span>HONORS & RECOGNITION</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            Hackathons &{' '}
            <span className="gradient-text-vibrant">National Milestones</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Recognized across prestigious national hackathons, ideathons, and standardized engineering assessments.
          </p>
        </div>

        {/* Achievements Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px'
          }}
        >
          {achievements.map((item, idx) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <div
                key={item.id || idx}
                className="glass-card"
                style={{
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'linear-gradient(145deg, rgba(16, 21, 38, 0.75) 0%, rgba(8, 11, 20, 0.7) 100%)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 20px ${item.glow || 'rgba(0,240,255,0.2)'}`
                      }}
                    >
                      <Icon size={22} color="#00f0ff" />
                    </div>

                    {item.year && (
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.75rem',
                          color: '#94a3b8',
                          background: 'rgba(255, 255, 255, 0.04)',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        {item.year}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  {/* Organization & Scope */}
                  {item.meta && (
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#00f0ff',
                        fontWeight: 600,
                        marginBottom: '14px'
                      }}
                    >
                      {item.meta}
                    </div>
                  )}

                  {/* Description */}
                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>

                {item.organization && (
                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      color: '#64748b'
                    }}
                  >
                    <CheckCircle size={14} color="#10b981" />
                    <span>{item.organization}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
