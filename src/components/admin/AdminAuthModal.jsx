import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { usePortfolio } from '../../context/PortfolioContext';

export default function AdminAuthModal({ onAuthenticated, onCancel }) {
  const { setAdminSecret } = usePortfolio();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter your creator passcode');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        // Store in context & storage
        setAdminSecret(data.token);
        if (rememberMe) {
          localStorage.setItem('portfolio_admin_auth', data.token);
        } else {
          sessionStorage.setItem('portfolio_admin_auth', data.token);
        }

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}

        setTimeout(() => {
          onAuthenticated(data.token);
        }, 800);
      } else {
        setErrorMsg(data.message || 'Access Denied: Incorrect passcode.');
      }
    } catch (err) {
      // Local fallback check: if API route can't be reached, check against stored or default
      setErrorMsg('Verification failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.96) 0%, rgba(3, 7, 18, 0.98) 100%)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '36px 32px',
          borderRadius: '24px',
          border: isSuccess
            ? '1px solid rgba(16, 185, 129, 0.6)'
            : errorMsg
            ? '1px solid rgba(239, 68, 68, 0.5)'
            : '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: isSuccess
            ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(16, 185, 129, 0.3)'
            : '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Glow Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: isSuccess
              ? 'linear-gradient(90deg, #10b981, #00f0ff)'
              : 'linear-gradient(90deg, #00f0ff, #a855f7, #ec4899)'
          }}
        />

        {/* Security Icon Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              margin: '0 auto 16px',
              background: isSuccess
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))'
                : 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(168, 85, 247, 0.2))',
              border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.5)' : 'rgba(0, 240, 255, 0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isSuccess ? '0 0 20px rgba(16, 185, 129, 0.4)' : '0 0 20px rgba(0, 240, 255, 0.2)'
            }}
          >
            {isSuccess ? (
              <Unlock size={30} color="#10b981" />
            ) : (
              <Lock size={30} color="#00f0ff" />
            )}
          </div>

          <div
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: '#00f0ff',
              background: 'rgba(0, 240, 255, 0.1)',
              padding: '3px 10px',
              borderRadius: '20px',
              marginBottom: '10px',
              letterSpacing: '1px'
            }}
          >
            RESTRICTED ACCESS PORTAL
          </div>

          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#f8fafc',
              marginBottom: '6px'
            }}
          >
            {isSuccess ? 'Access Granted' : 'Creator Authorization'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            {isSuccess
              ? 'Security credentials verified. Opening cockpit...'
              : 'Enter your creator admin passcode to manage portfolio content.'}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#fca5a5',
              fontSize: '0.85rem',
              animation: 'shake 0.3s ease-in-out'
            }}
          >
            <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="admin-passcode-input"
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#cbd5e1',
                marginBottom: '8px'
              }}
            >
              ADMIN PASSCODE
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b'
                }}
              >
                <KeyRound size={17} />
              </div>
              <input
                id="admin-passcode-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter ADMIN_SECRET..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                autoFocus
                disabled={loading || isSuccess}
                className="glass-card font-mono"
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 42px',
                  color: '#00f0ff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  borderRadius: '12px',
                  border: errorMsg
                    ? '1px solid rgba(239, 68, 68, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.12)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#00f0ff', cursor: 'pointer' }}
              />
              <span>Remember session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || isSuccess}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              borderRadius: '12px'
            }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={18} />
                <span>Unlocked</span>
              </>
            ) : (
              <>
                <span>Unlock Cockpit</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#94a3b8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
