import React from 'react';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(5, 7, 13, 0.85)',
        backdropFilter: 'blur(16px)'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          background: 'linear-gradient(145deg, rgba(16, 22, 42, 0.95) 0%, rgba(8, 11, 22, 0.95) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 240, 255, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div
            className="glass-pill font-mono"
            style={{
              fontSize: '0.8rem',
              color: '#00f0ff',
              borderColor: 'rgba(0, 240, 255, 0.3)',
              marginBottom: '12px'
            }}
          >
            {project.category}
          </div>

          <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            {project.title}
          </h3>

          <p style={{ color: '#00f0ff', fontSize: '1.1rem', fontWeight: 600 }}>
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono"
              style={{
                fontSize: '0.82rem',
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#e2e8f0',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Deep Dive Description */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '1rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            System Overview & Engineering Architecture:
          </h4>
          <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.8 }}>
            {project.detailedDescription}
          </p>
        </div>

        {/* Architecture Grid */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '1rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
            Architecture Breakdown:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {project.architecture.map((arch) => (
              <div
                key={arch.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 16px',
                  borderRadius: '12px'
                }}
              >
                <div style={{ fontSize: '0.78rem', color: '#00f0ff', fontWeight: 600, textTransform: 'uppercase' }}>
                  {arch.label}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#f8fafc', fontWeight: 500, marginTop: '2px' }}>
                  {arch.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features List */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '1rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
            Key Technical Implementations:
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {project.features.map((feature, fIdx) => (
              <li
                key={fIdx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#e2e8f0',
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}
              >
                <CheckCircle2
                  size={18}
                  color="#00f0ff"
                  style={{ minWidth: '18px', marginTop: '2px' }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {(() => {
            const rawDemo = project.demo || project.liveUrl;
            const liveUrl = (rawDemo && rawDemo !== '#' && rawDemo.trim() !== '')
              ? (rawDemo.startsWith('http://') || rawDemo.startsWith('https://') ? rawDemo.trim() : `https://${rawDemo.trim()}`)
              : project.github || 'https://github.com/NAVEENKUMAR12-R';

            return liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: '12px 22px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
              >
                <ExternalLink size={18} />
                <span>Launch Live Project</span>
              </a>
            ) : null;
          })()}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ flex: 1, padding: '12px 20px', minWidth: '180px' }}
            >
              <GithubIcon size={18} />
              <span>View Source on GitHub</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
