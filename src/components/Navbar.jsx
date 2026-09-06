import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Send, Sun, Moon } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar() {
  const { personalInfo, theme, toggleTheme } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Competitive', href: '#competitive' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'experience', 'projects', 'competitive', 'achievements', 'leadership', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        padding: isScrolled ? '12px 0' : '20px 0',
        background: isScrolled ? 'rgba(7, 8, 14, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none'
      }}
    >
      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
              color: '#07080e',
              fontWeight: 900
            }}
          >
            {personalInfo.name ? personalInfo.name.charAt(0) : 'N'}
          </div>
          <div>
            <span>{personalInfo.nickname || personalInfo.name?.split(' ')[0] || 'Naveenkumar'}</span>
            <span style={{ color: '#00f0ff', marginLeft: '2px' }}>.dev</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(15, 20, 35, 0.65)',
            backdropFilter: 'blur(12px)',
            padding: '6px 10px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          className="md:flex"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#00f0ff' : '#94a3b8',
                  background: isActive ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.15)' : 'none'
                }}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Social Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="md:flex">
          {personalInfo.socials?.github && (
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <GithubIcon size={18} />
            </a>
          )}

          {personalInfo.socials?.linkedin && (
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <LinkedinIcon size={18} />
            </a>
          )}

          {/* Theme Toggle Button (Dark / Light Mode) */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
              color: theme === 'dark' ? '#f59e0b' : '#6366f1',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#contact"
            className="btn-primary"
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              borderRadius: '10px'
            }}
          >
            <Send size={14} />
            Let's Talk
          </a>
        </div>

        {/* Mobile Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'}`,
              borderRadius: '10px',
              color: theme === 'dark' ? '#f59e0b' : '#6366f1',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'}`,
              borderRadius: '10px',
              color: 'var(--text-primary)',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: theme === 'dark' ? 'rgba(7, 8, 14, 0.96)' : 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                color: activeSection === link.href.substring(1) ? 'var(--cyan)' : 'var(--text-primary)',
                background: activeSection === link.href.substring(1) ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 0, 0, 0.03)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{link.name}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>→</span>
            </a>
          ))}

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => {
                toggleTheme();
              }}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '0.9rem',
                borderRadius: '10px',
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'}`,
                color: 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#6366f1" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ flex: 1, padding: '12px', fontSize: '0.9rem', justifyContent: 'center' }}
            >
              <Send size={16} />
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
