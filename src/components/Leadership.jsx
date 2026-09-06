import React from 'react';
import { Users, Bug, HeartHandshake, Sparkles, CheckCircle2, Award, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Leadership() {
  const { leadershipData } = usePortfolio();
  const leadership = leadershipData || [];

  return (
    <section id="leadership" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            className="glass-pill"
            style={{
              marginBottom: '16px',
              color: '#ec4899',
              border: '1px solid rgba(236, 72, 153, 0.3)'
            }}
          >
            <Users size={14} />
            <span>LEADERSHIP & MENTORSHIP</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            Community Impact &{' '}
            <span className="gradient-text-purple">Technical Leadership</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Empowering peers through structured algorithmic mentoring, competitive debugging events, and large-scale symposium coordination.
          </p>
        </div>

        {/* Leadership Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {leadership.map((item, idx) => {
            const isGlitched = idx % 2 === 0;
            return (
              <div
                key={item.title || idx}
                className="glass-card"
                style={{
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${isGlitched ? '#00f0ff' : '#ec4899'}`,
                  background: 'linear-gradient(145deg, rgba(16, 21, 38, 0.8) 0%, rgba(9, 12, 22, 0.7) 100%)'
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: isGlitched ? 'rgba(0, 240, 255, 0.12)' : 'rgba(236, 72, 153, 0.12)',
                        border: `1px solid ${isGlitched ? 'rgba(0, 240, 255, 0.3)' : 'rgba(236, 72, 153, 0.3)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isGlitched ? '#00f0ff' : '#ec4899'
                      }}
                    >
                      {isGlitched ? <Bug size={22} /> : <HeartHandshake size={22} />}
                    </div>

                    {item.participants && (
                      <span
                        className="glass-pill font-mono"
                        style={{
                          fontSize: '0.75rem',
                          color: isGlitched ? '#00f0ff' : '#ec4899',
                          borderColor: isGlitched ? 'rgba(0, 240, 255, 0.25)' : 'rgba(236, 72, 153, 0.25)'
                        }}
                      >
                        {item.participants}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: isGlitched ? '#00f0ff' : '#ec4899',
                      marginBottom: '4px'
                    }}
                  >
                    {item.role}
                  </div>

                  {item.scope && (
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#94a3b8',
                        marginBottom: '20px'
                      }}
                    >
                      {item.scope}
                    </div>
                  )}

                  {/* Bullet Points */}
                  {item.points && item.points.length > 0 && (
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {item.points.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            color: '#cbd5e1',
                            fontSize: '0.94rem',
                            lineHeight: 1.6
                          }}
                        >
                          <CheckCircle2
                            size={18}
                            color={isGlitched ? '#00f0ff' : '#ec4899'}
                            style={{ minWidth: '18px', marginTop: '2px' }}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
