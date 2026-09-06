import React, { useState } from 'react';
import { ExternalLink, Sparkles, CheckCircle2, ArrowUpRight, Layers, Film, CalendarCheck, ShieldCheck, Database, Server } from 'lucide-react';
import { GithubIcon } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { projectsData } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = projectsData || [];

  return (
    <section id="projects" style={{ position: 'relative' }}>
      {/* Background Glows */}
      <div className="ambient-glow-cyan" style={{ top: '20%', right: '-150px' }} />
      <div className="ambient-glow-purple" style={{ bottom: '10%', left: '-150px' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
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
            <span>FEATURED PROJECTS</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            Engineered For{' '}
            <span className="gradient-text-vibrant">Performance & Scale</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Production-oriented full-stack web applications and enterprise systems solving real concurrency, authorization, and workflow bottlenecks.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {projects.map((project, idx) => {
            const isFirst = idx % 2 === 0;
            const accentColor = isFirst ? '#00f0ff' : '#a855f7';
            const rawDemo = project.demo || project.liveUrl;
            const liveUrl = (rawDemo && rawDemo !== '#' && rawDemo.trim() !== '')
              ? (rawDemo.startsWith('http://') || rawDemo.startsWith('https://') ? rawDemo.trim() : `https://${rawDemo.trim()}`)
              : project.github || 'https://github.com/NAVEENKUMAR12-R';

            return (
              <div
                key={project.id || idx}
                className="glass-card"
                style={{
                  padding: '40px',
                  position: 'relative',
                  border: `1px solid ${isFirst ? 'rgba(0, 240, 255, 0.2)' : 'rgba(168, 85, 247, 0.2)'}`,
                  background: 'linear-gradient(145deg, rgba(15, 20, 36, 0.8) 0%, rgba(9, 12, 22, 0.75) 100%)'
                }}
              >
                {/* Accent Top Border */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: isFirst
                      ? 'linear-gradient(90deg, #00f0ff, #3b82f6)'
                      : 'linear-gradient(90deg, #a855f7, #ec4899)'
                  }}
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    alignItems: 'center'
                  }}
                >
                  {/* Left Column: Project Info */}
                  <div>
                    {/* Header Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <span
                        className="glass-pill font-mono"
                        style={{
                          fontSize: '0.75rem',
                          color: accentColor,
                          borderColor: `${accentColor}50`,
                          background: `${accentColor}15`
                        }}
                      >
                        {project.category}
                      </span>

                      {project.badge && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            color: '#f59e0b',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.25)',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontWeight: 600
                          }}
                        >
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                        fontWeight: 800,
                        color: '#f8fafc',
                        marginBottom: '8px'
                      }}
                    >
                      {project.title}
                    </h3>

                    <div
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isFirst ? '#00f0ff' : '#ec4899',
                        marginBottom: '18px'
                      }}
                    >
                      {project.tagline}
                    </div>

                    {/* Description */}
                    <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '24px' }}>
                      {project.description}
                    </p>

                    {/* Key Features Bullet List */}
                    {project.features && project.features.length > 0 && (
                      <div style={{ marginBottom: '28px' }}>
                        <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                          Core Engineering Highlights:
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {project.features.slice(0, 4).map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px',
                                color: '#e2e8f0',
                                fontSize: '0.92rem',
                                lineHeight: 1.5
                              }}
                            >
                              <CheckCircle2
                                size={16}
                                color={accentColor}
                                style={{ minWidth: '16px', marginTop: '2px' }}
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    {project.techStack && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono"
                            style={{
                              fontSize: '0.8rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#f1f5f9',
                              padding: '4px 12px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
                            color: '#ffffff',
                            textDecoration: 'none'
                          }}
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn-secondary"
                        style={{
                          background: isFirst
                            ? 'rgba(0, 240, 255, 0.1)'
                            : 'rgba(168, 85, 247, 0.1)',
                          borderColor: isFirst
                            ? 'rgba(0, 240, 255, 0.3)'
                            : 'rgba(168, 85, 247, 0.3)',
                          color: isFirst ? '#00f0ff' : '#ec4899'
                        }}
                      >
                        <span>Deep Dive Architecture</span>
                        <ArrowUpRight size={16} />
                      </button>

                      {project.github && (
                        <a
                          href={project.github.startsWith('http') ? project.github : `https://${project.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          <GithubIcon size={16} />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Architecture / Interactive Blueprint Preview */}
                  <div
                    style={{
                      background: 'rgba(10, 14, 26, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    {/* Window Controls Bar */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '16px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        marginBottom: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {project.title?.toLowerCase().replace(/\s+/g, '-')}-spec.json
                      </span>
                    </div>

                    {/* Architecture Blueprint Mockup */}
                    {project.id === 'ticketly' ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#00f0ff' }}>
                          <Film size={18} />
                          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Concurrency & Locking Protocol</span>
                        </div>

                        <div
                          style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(0, 240, 255, 0.15)',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '16px'
                          }}
                        >
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>
                            Interactive Seat Matrix State (Real-time Lock):
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px', marginBottom: '12px' }}>
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((seat) => {
                              const isLocked = seat === 6 || seat === 7;
                              const isBooked = seat === 2 || seat === 3 || seat === 11;
                              return (
                                <div
                                  key={seat}
                                  style={{
                                    height: '24px',
                                    borderRadius: '4px',
                                    background: isLocked
                                      ? 'rgba(0, 240, 255, 0.3)'
                                      : isBooked
                                      ? 'rgba(239, 68, 68, 0.3)'
                                      : 'rgba(255, 255, 255, 0.06)',
                                    border: isLocked
                                      ? '1px solid #00f0ff'
                                      : isBooked
                                      ? '1px solid #ef4444'
                                      : '1px solid rgba(255, 255, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    color: isLocked ? '#00f0ff' : isBooked ? '#ef4444' : '#94a3b8',
                                    fontWeight: 600
                                  }}
                                >
                                  {seat}
                                </div>
                              );
                            })}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '8px', height: '8px', background: '#00f0ff', borderRadius: '2px' }} /> Held (Inngest Lock)
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '2px' }} /> Reserved
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} /> Available
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                            <span>Auth Engine:</span>
                            <span style={{ color: '#00f0ff', fontWeight: 600 }}>Clerk Multi-Role SSO</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                            <span>Async Event Orchestrator:</span>
                            <span style={{ color: '#3b82f6', fontWeight: 600 }}>Inngest Background Jobs</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                            <span>Double-Booking Protection:</span>
                            <span style={{ color: '#10b981', fontWeight: 600 }}>Zero-Conflict Guaranteed</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#ec4899' }}>
                          <CalendarCheck size={18} />
                          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Layered Backend & Architectural Specs</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                          {(project.architecture || [
                            { label: 'Controller Layer', val: 'REST Endpoints & Validation' },
                            { label: 'Service Layer', val: 'Core Business Logic Engine' },
                            { label: 'Persistence Layer', val: 'ORM & Data Mappings' },
                            { label: 'Database', val: 'Optimized Schema Design' }
                          ]).map((item, i) => (
                            <div
                              key={item.label || i}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '8px',
                                borderLeft: `3px solid ${i % 2 === 0 ? '#a855f7' : '#ec4899'}`
                              }}
                            >
                              <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                                  {item.label}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                  {item.val}
                                </div>
                              </div>
                              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#a855f7' }}>
                                [L{i+1}]
                              </span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                          <span>System Status:</span>
                          <span style={{ color: '#10b981', fontWeight: 600 }}>Production Tested</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
