import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Sparkles, Terminal, Code2, Layers, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';
import HeroCanvas from './HeroCanvas';

export default function Hero() {
  const { personalInfo } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = personalInfo.roles && personalInfo.roles.length > 0
    ? personalInfo.roles
    : ['Full-Stack Developer', 'Problem Solver', 'Competitive Programmer', 'Software Engineer'];

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '80px',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow orbs */}
      <div className="ambient-glow-cyan" style={{ top: '-100px', left: '-100px' }} />
      <div className="ambient-glow-purple" style={{ top: '20%', right: '-150px' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Hero Content */}
          <div>
            {/* Status Badge */}
            <div
              className="glass-pill"
              style={{
                marginBottom: '24px',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                background: 'rgba(0, 240, 255, 0.06)',
                color: '#e2e8f0'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#00f0ff',
                  boxShadow: '0 0 10px #00f0ff'
                }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {personalInfo.status}
              </span>
            </div>

            {/* Greeting */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Terminal size={18} color="#00f0ff" />
              <span
                className="font-mono"
                style={{
                  color: '#00f0ff',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em'
                }}
              >
                Hi, I'm {personalInfo.name}.
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                marginBottom: '20px'
              }}
            >
              {personalInfo.headline?.includes('Scalable') ? (
                <>
                  {personalInfo.headline.split('Scalable')[0]}
                  <span className="gradient-text-vibrant">
                    Scalable {personalInfo.headline.split('Scalable')[1]}
                  </span>
                </>
              ) : (
                <span className="gradient-text-vibrant">{personalInfo.headline}</span>
              )}
            </h1>

            {/* Animated Role Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '22px',
                minHeight: '36px'
              }}
            >
              <span style={{ color: '#94a3b8', fontSize: '1.15rem', fontWeight: 500 }}>
                Focusing as:
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#00f0ff',
                  borderBottom: '2px solid rgba(0, 240, 255, 0.5)',
                  paddingBottom: '2px',
                  display: 'inline-block'
                }}
              >
                {displayText}
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.1em',
                    background: '#ec4899',
                    marginLeft: '4px',
                    verticalAlign: 'middle',
                    animation: 'pulse-ring 1s infinite'
                  }}
                />
              </span>
            </div>

            {/* Subtitle */}
            <p
              style={{
                color: '#94a3b8',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: '32px'
              }}
            >
              {personalInfo.subtitle}
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '40px'
              }}
            >
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <ChevronRight size={18} />
              </a>

              <a href="#contact" className="btn-secondary">
                <span>Contact Me</span>
                <Mail size={16} />
              </a>
            </div>

            {/* Social Links & Quick Specs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Connect:
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {personalInfo.socials?.github && (
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill"
                    style={{ color: '#f8fafc', padding: '6px 14px' }}
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                  </a>
                )}

                {personalInfo.socials?.linkedin && (
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill"
                    style={{ color: '#38bdf8', padding: '6px 14px' }}
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn</span>
                  </a>
                )}

                {personalInfo.socials?.email && (
                  <a
                    href={`mailto:${personalInfo.socials.email}`}
                    className="glass-pill"
                    style={{ color: '#ec4899', padding: '6px 14px' }}
                  >
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas / Hologram Visual */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <HeroCanvas />

            {/* Tech Stack Ticker Below Hero Graphic */}
            <div
              style={{
                marginTop: '24px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px',
                maxWidth: '420px'
              }}
            >
              {['React.js', 'Spring Boot', 'Node.js', 'JPA/Hibernate', 'LeetCode Knight', 'MongoDB / MySQL'].map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#94a3b8',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
