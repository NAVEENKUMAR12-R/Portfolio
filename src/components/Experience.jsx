import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2, ChevronRight, Terminal, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Experience() {
  const { experienceData } = usePortfolio();
  const experiences = experienceData || [];

  return (
    <section id="experience" style={{ position: 'relative' }}>
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
            <span>WORK EXPERIENCE</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            Professional{' '}
            <span className="gradient-text-cyan">Journey & Internships</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Hands-on software development experience delivering production features, robust REST backends, and responsive user interfaces.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Glowing Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '28px',
              width: '2px',
              background: 'linear-gradient(180deg, #00f0ff 0%, #a855f7 50%, transparent 100%)',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.4)',
              zIndex: 1
            }}
            className="hidden sm:block"
          />

          {experiences.map((exp, idx) => (
            <div
              key={exp.role || idx}
              style={{
                position: 'relative',
                paddingLeft: '0',
                marginBottom: '32px'
              }}
              className="sm:pl-16"
            >
              {/* Timeline Marker Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '19px',
                  top: '24px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#07080e',
                  border: '3px solid #00f0ff',
                  boxShadow: '0 0 15px #00f0ff',
                  zIndex: 2
                }}
                className="hidden sm:block"
              />

              {/* Experience Card */}
              <div
                className="glass-card"
                style={{
                  padding: '32px',
                  borderLeft: '4px solid #00f0ff',
                  background: 'linear-gradient(145deg, rgba(16, 22, 40, 0.75) 0%, rgba(9, 12, 22, 0.7) 100%)'
                }}
              >
                {/* Header info */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Briefcase size={20} color="#00f0ff" />
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                        {exp.role}
                      </h3>
                    </div>

                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#a855f7' }}>
                      {exp.company}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.period && (
                      <div
                        className="glass-pill font-mono"
                        style={{
                          fontSize: '0.8rem',
                          color: '#00f0ff',
                          borderColor: 'rgba(0, 240, 255, 0.3)',
                          background: 'rgba(0, 240, 255, 0.08)'
                        }}
                      >
                        <Calendar size={13} />
                        <span>{exp.period}</span>
                      </div>
                    )}

                    {exp.location && (
                      <div
                        className="glass-pill font-mono"
                        style={{
                          fontSize: '0.8rem',
                          color: '#cbd5e1',
                          background: 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <MapPin size={13} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {exp.description}
                </p>

                {/* Highlights List */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                      Key Contributions & Engineering Impact:
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {exp.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            color: '#e2e8f0',
                            fontSize: '0.94rem',
                            lineHeight: 1.6
                          }}
                        >
                          <CheckCircle2
                            size={18}
                            color="#00f0ff"
                            style={{ minWidth: '18px', marginTop: '2px' }}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                      Technologies Utilized:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono"
                          style={{
                            fontSize: '0.8rem',
                            background: 'rgba(0, 240, 255, 0.06)',
                            color: '#00f0ff',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 240, 255, 0.2)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
