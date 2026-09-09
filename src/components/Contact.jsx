import React, { useState } from 'react';
import { Mail, Send, Sparkles, Check, Copy, MessageSquare, ArrowRight, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { personalInfo } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const contactEmail = personalInfo.socials?.email || 'naveenkumarr.cse@gmail.com';
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || personalInfo.web3formsKey;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#00f0ff', '#a855f7', '#ec4899', '#f59e0b']
      });
    } catch {}

    setTimeout(() => setCopied(false), 3000);
  };

  const getMailtoLink = () => {
    const subject = formData.subject || `Message from ${formData.name || 'Portfolio Visitor'}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setErrorMessage('');

    if (accessKey && accessKey.trim()) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey.trim(),
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Portfolio Direct Message from ${formData.name}`,
            message: formData.message,
            from_name: `${formData.name} (Portfolio Inquiry)`
          })
        });

        const result = await response.json();

        if (result.success) {
          setIsSending(false);
          setSubmitted(true);
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#00f0ff', '#10b981', '#a855f7', '#ffffff']
            });
          } catch {}

          setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }, 6000);
        } else {
          setIsSending(false);
          setErrorMessage(result.message || 'Unable to deliver message automatically. You can send it directly via your mail client.');
        }
      } catch {
        setIsSending(false);
        setErrorMessage('Network error occurred. Click below to launch your email client.');
      }
    } else {
      // Fallback if no Web3Forms access key is configured yet
      window.location.href = getMailtoLink();
      setIsSending(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#10b981', '#a855f7', '#ffffff']
        });
      } catch {}

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 6000);
    }
  };

  return (
    <section id="contact" style={{ position: 'relative', paddingBottom: '120px' }}>
      {/* Background Neon Blobs */}
      <div className="ambient-glow-cyan" style={{ bottom: '10%', left: '-100px' }} />
      <div className="ambient-glow-purple" style={{ top: '20%', right: '-100px' }} />

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
            <span>GET IN TOUCH</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 800, marginBottom: '16px' }}>
            Let's Build Something{' '}
            <span className="gradient-text-vibrant">Amazing.</span>
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '620px', margin: '0 auto', fontSize: '1.1rem' }}>
            Have an idea, opportunity, or project? Let's connect and create something impactful.
          </p>
        </div>

        {/* Contact Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Direct Reachout Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between' }}>
            {/* Interactive Email Copy Card */}
            <div
              className="glass-card"
              style={{
                padding: '32px',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                background: 'linear-gradient(145deg, rgba(16, 22, 42, 0.85) 0%, rgba(9, 12, 24, 0.8) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00f0ff'
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                    Direct Inbox
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                    {contactEmail}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleCopyEmail}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px 16px', fontSize: '0.88rem' }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
                </button>

                <a
                  href={`mailto:${contactEmail}?subject=Hello%20${encodeURIComponent(personalInfo.name || 'Naveenkumar')}`}
                  className="btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '0.88rem' }}
                >
                  <Send size={16} />
                  <span>Mail Client</span>
                </a>
              </div>
            </div>

            {/* Social Channels Card */}
            <div
              className="glass-card"
              style={{
                padding: '32px',
                background: 'linear-gradient(145deg, rgba(16, 21, 38, 0.8) 0%, rgba(9, 12, 22, 0.75) 100%)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
                Connect on Developer Networks
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {personalInfo.socials?.github && (
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#f8fafc',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease'
                    }}
                    className="glass-card"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <GithubIcon size={20} color="#00f0ff" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>GitHub</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {personalInfo.socials.github.replace('https://github.com/', '@')}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} color="#00f0ff" />
                  </a>
                )}

                {personalInfo.socials?.linkedin && (
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#f8fafc',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease'
                    }}
                    className="glass-card"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <LinkedinIcon size={20} color="#38bdf8" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>LinkedIn</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {personalInfo.socials.linkedin.replace('https://www.linkedin.com', '')}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} color="#38bdf8" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(145deg, rgba(16, 21, 38, 0.85) 0%, rgba(8, 11, 20, 0.8) 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <MessageSquare size={20} color="#00f0ff" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc' }}>
                Send a Direct Message
              </h3>
            </div>

            {submitted ? (
              <div
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  textAlign: 'center',
                  color: '#10b981'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: '#10b981'
                  }}
                >
                  <Check size={28} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
                  Message Sent Successfully!
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                  Thank you for reaching out, <strong>{formData.name}</strong>. I will get back to you promptly at <strong>{formData.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#00f0ff')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#00f0ff')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Full-Stack Role / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#00f0ff')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Describe your idea, role details, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#00f0ff')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                {errorMessage && (
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      color: '#fca5a5',
                      fontSize: '0.88rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={18} color="#ef4444" />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={getMailtoLink()}
                      className="btn-secondary"
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        padding: '8px 14px',
                        fontSize: '0.84rem'
                      }}
                    >
                      <Send size={14} />
                      <span>Send with Default Email Client</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', marginTop: '6px' }}
                >
                  <Send size={18} />
                  <span>{isSending ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
