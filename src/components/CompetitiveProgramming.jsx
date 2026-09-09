import React from 'react';
import { Trophy, Code2, Award, ExternalLink, TrendingUp, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function CompetitiveProgramming() {
  const { competitiveProgrammingData } = usePortfolio();
  const cp = competitiveProgrammingData || { summary: {}, platforms: [] };

  return (
    <section id="competitive" style={{ position: 'relative' }}>
      {/* Background Ambience */}
      <div className="ambient-glow-purple" style={{ top: '25%', left: '-100px' }} />
      <div className="ambient-glow-pink" style={{ bottom: '15%', right: '-100px' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            className="glass-pill"
            style={{
              marginBottom: '16px',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}
          >
            <Trophy size={14} />
            <span>ALGORITHMIC EXCELLENCE</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            Competitive Programming{' '}
            <span className="gradient-text-amber">& Problem Solving</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Over {cp.summary?.totalSolved || '1,065+'} algorithm & data structure challenges solved under high-pressure contest environments.
          </p>
        </div>

        {/* Global CP Overview Counter Bar */}
        <div
          className="glass-card"
          style={{
            padding: '24px 32px',
            marginBottom: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b'
              }}
            >
              <Code2 size={26} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1 }}>
                {cp.summary?.totalSolved || '1,065+'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500 }}>
                Total Problems Solved
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00f0ff'
              }}
            >
              <TrendingUp size={26} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1 }}>
                {cp.summary?.totalContests || '150+'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500 }}>
                Live Rounds Competed
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a855f7'
              }}
            >
              <Award size={26} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1 }}>
                {cp.platforms?.[0]?.badge || 'Knight Tier'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500 }}>
                Rating: {cp.platforms?.[0]?.maxRating || '1845'}
              </div>
            </div>
          </div>
        </div>

        {/* Platforms Detailed Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}
        >
          {cp.platforms?.map((platform) => {
            return (
              <div
                key={platform.id}
                className="glass-card"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${platform.accent || '#f59e0b'}`,
                  background: 'linear-gradient(145deg, rgba(16, 21, 38, 0.8) 0%, rgba(9, 12, 22, 0.75) 100%)'
                }}
              >
                <div>
                  {/* Platform Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>
                        {platform.name}
                      </h3>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          color: platform.accent || '#f59e0b',
                          fontWeight: 700,
                          marginTop: '2px'
                        }}
                      >
                        {platform.badge}
                      </div>
                    </div>

                    {platform.link && (
                      <a
                        href={platform.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#94a3b8',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  {/* Primary Stats Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '14px',
                      padding: '16px',
                      marginBottom: '24px',
                      textAlign: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                        {platform.solved}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Solved
                      </div>
                    </div>

                    <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.08)', borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: platform.accent || '#f59e0b' }}>
                        {platform.maxRating}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Max Rating
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                        {platform.contests}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Contests
                      </div>
                    </div>
                  </div>

                  {/* Sub-breakdown if available */}
                  {platform.breakdown && (
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                        Difficulty & Round Breakdown:
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {platform.breakdown.map((item) => (
                          <div
                            key={item.type}
                            style={{
                              flex: 1,
                              background: 'rgba(255, 255, 255, 0.03)',
                              border: `1px solid ${item.color || '#00f0ff'}30`,
                              borderRadius: '8px',
                              padding: '8px 10px',
                              textAlign: 'center'
                            }}
                          >
                            <div style={{ fontSize: '0.72rem', color: item.color || '#00f0ff', fontWeight: 600 }}>
                              {item.type}
                            </div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                              {item.count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights Bullet List */}
                  {platform.highlights && platform.highlights.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {platform.highlights.map((h, hIdx) => (
                          <li
                            key={hIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              color: '#cbd5e1',
                              fontSize: '0.88rem',
                              lineHeight: 1.5
                            }}
                          >
                            <CheckCircle
                              size={15}
                              color={platform.accent || '#f59e0b'}
                              style={{ minWidth: '15px', marginTop: '3px' }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Profile Link Button */}
                {platform.link && (
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: '0.88rem',
                      justifyContent: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <span>View {platform.name} Profile</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
