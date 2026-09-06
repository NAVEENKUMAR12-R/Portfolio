import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Heart, Sparkles, Terminal, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { personalInfo } = usePortfolio();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(180deg, rgba(7, 8, 14, 0.6) 0%, rgba(4, 5, 9, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
        padding: '60px 0 30px 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container-custom">
        {/* Top Tier */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            marginBottom: '40px'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#07080e',
                  fontWeight: 900,
                  fontSize: '0.9rem'
                }}
              >
                {personalInfo.name ? personalInfo.name.charAt(0) : 'N'}
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                {personalInfo.name || 'Naveenkumar R'}
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '380px' }}>
              {personalInfo.title || 'Full-Stack Developer & Problem Solver building scalable web applications.'}
            </p>
          </div>

          {/* Time & Live Status Indicator */}
          <div
            className="glass-card"
            style={{
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                <span>IST (Chennai)</span>
              </div>
              <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: '#00f0ff', marginTop: '2px' }}>
                {time || 'Loading...'}
              </div>
            </div>

            <div style={{ width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.1)' }} />

            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
              <div>Status</div>
              <div style={{ fontWeight: 600, color: '#10b981' }}>{personalInfo.status?.split(' ')[0] || 'Open for Work'}</div>
            </div>
          </div>

          {/* Social Links, Admin Trigger & Back to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {personalInfo.socials?.github && (
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass-pill"
                style={{ width: '42px', height: '42px', padding: 0, justifyContent: 'center' }}
              >
                <GithubIcon size={18} />
              </a>
            )}

            {personalInfo.socials?.linkedin && (
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass-pill"
                style={{ width: '42px', height: '42px', padding: 0, justifyContent: 'center', color: '#38bdf8' }}
              >
                <LinkedinIcon size={18} />
              </a>
            )}

            {personalInfo.socials?.email && (
              <a
                href={`mailto:${personalInfo.socials.email}`}
                aria-label="Email"
                className="glass-pill"
                style={{ width: '42px', height: '42px', padding: 0, justifyContent: 'center', color: '#ec4899' }}
              >
                <Mail size={18} />
              </a>
            )}

            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="glass-pill"
              style={{
                width: '42px',
                height: '42px',
                padding: 0,
                justifyContent: 'center',
                color: '#00f0ff',
                cursor: 'pointer',
                borderColor: 'rgba(0, 240, 255, 0.3)'
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Tier */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.85rem',
            color: '#64748b'
          }}
        >
          <div>
            © {new Date().getFullYear()} {personalInfo.name || 'Naveenkumar R'}. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Built with</span>
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>React</span>
            <span>+</span>
            <span style={{ color: '#a855f7', fontWeight: 600 }}>Spring Core</span>
            <span>+</span>
            <span style={{ color: '#ec4899', fontWeight: 600 }}>Pure Energy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
