import React from 'react';
import {
  GraduationCap,
  Code2,
  Trophy,
  Flame,
  CheckCircle,
  Award,
  Terminal,
  Sparkles,
  Cpu,
  BookOpen,
  Layers,
  Zap,
  Star,
  Target
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  GraduationCap,
  Code2,
  Trophy,
  Flame,
  Award,
  Sparkles,
  Cpu,
  Layers,
  CheckCircle,
  BookOpen,
  Zap,
  Star,
  Target
};

const defaultColorThemes = [
  { color: '#00f0ff', bg: 'rgba(0, 240, 255, 0.12)', border: 'rgba(0, 240, 255, 0.3)' },
  { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)' },
  { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  { color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)' },
  { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' }
];

export default function About() {
  const { personalInfo } = usePortfolio();

  const corePillars = [
    {
      title: "Full-Stack Development",
      desc: "Crafting end-to-end architectures from scalable React frontends to robust Spring Boot & Node.js backends.",
      icon: Layers,
      color: "#00f0ff"
    },
    {
      title: "Algorithmic Problem Solving",
      desc: `Knight Badge holder with ${personalInfo.stats?.[1]?.value || '1,065+'} problems solved across data structures & algorithms.`,
      icon: Code2,
      color: "#a855f7"
    },
    {
      title: "Clean Enterprise Code",
      desc: "Dedicated to layered Controller-Service-Repository patterns, SOLID principles, JPA/Hibernate ORM, and REST APIs.",
      icon: Cpu,
      color: "#ec4899"
    },
    {
      title: "Fast Tech Adaptability",
      desc: "Demonstrated agility across modern stacks, cloud event flows (Inngest), authentication systems, and SQL/NoSQL databases.",
      icon: Sparkles,
      color: "#f59e0b"
    }
  ];

  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            className="glass-pill"
            style={{
              marginBottom: '16px',
              color: '#00f0ff',
              border: '1px solid rgba(0, 240, 255, 0.3)'
            }}
          >
            <Sparkles size={14} />
            <span>ABOUT ME</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            Driven by Logic,{' '}
            <span className="gradient-text-cyan">Powered by Scalability</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Engineering thoughtful digital experiences through disciplined architecture and rigorous algorithmic fundamentals.
          </p>
        </div>

        {/* Stats Grid */}
        {personalInfo.stats && personalInfo.stats.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '48px'
            }}
          >
            {personalInfo.stats.map((stat, idx) => {
              const theme = defaultColorThemes[idx % defaultColorThemes.length];
              const StatIcon = iconMap[stat.icon] || (idx === 0 ? GraduationCap : idx === 1 ? Code2 : idx === 2 ? Trophy : idx === 3 ? Flame : Award);

              return (
                <div
                  key={stat.label ? `${stat.label}-${idx}` : idx}
                  className="glass-card"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      background: theme.bg,
                      border: `1px solid ${theme.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.color,
                      flexShrink: 0
                    }}
                  >
                    <StatIcon size={26} />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '1.9rem',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: '#f8fafc',
                        lineHeight: 1.1
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0', marginTop: '2px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {stat.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Narrative & Highlights Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch'
          }}
        >
          {/* Main Story Card */}
          <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Terminal size={20} color="#00f0ff" />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Academic & Engineering Profile</h3>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
                I am a {personalInfo.degree || 'Computer Science and Engineering'} student at <strong style={{ color: '#00f0ff' }}>{personalInfo.institution || 'Chennai Institute of Technology'}</strong> with a cumulative GPA of <strong style={{ color: '#f59e0b' }}>{personalInfo.cgpa || '9.05'}</strong> and a deep passion for building scalable, high-impact software systems.
              </p>

              <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '24px' }}>
                My journey combines the rigor of enterprise software architecture (Spring Boot, Java, JPA/Hibernate, Node.js, React.js) with high-intensity competitive programming and hackathons. I thrive on deconstructing complex problems into elegant, maintainable codebases.
              </p>
            </div>

            {/* Quick Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                personalInfo.institution || 'Chennai Institute of Technology',
                personalInfo.degree || 'B.E. Computer Science',
                `CGPA: ${personalInfo.cgpa || '9.05'}`,
                'GATE 2026 Qualified',
                'LeetCode Knight'
              ].map((badge) => (
                <div
                  key={badge}
                  className="glass-pill"
                  style={{
                    fontSize: '0.8rem',
                    borderColor: 'rgba(0, 240, 255, 0.2)',
                    color: '#e2e8f0',
                    background: 'rgba(0, 240, 255, 0.05)'
                  }}
                >
                  <CheckCircle size={14} color="#00f0ff" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Strengths Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="glass-card"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: `${pillar.color}15`,
                        border: `1px solid ${pillar.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: pillar.color,
                        marginBottom: '16px'
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: '#f8fafc' }}>
                      {pillar.title}
                    </h4>

                    <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
