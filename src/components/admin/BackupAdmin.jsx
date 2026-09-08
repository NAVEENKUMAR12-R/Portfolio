import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Download,
  Upload,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  FileCode,
  Database,
  Cloud,
  RefreshCw,
  Key,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BackupAdmin({ onSaveNotification }) {
  const {
    getFullConfig,
    importFullConfig,
    resetToDefaults,
    saveFullConfigToCloud,
    refreshFromCloud,
    cloudStatus,
    adminSecret,
    setAdminSecret,
    lastSyncedAt
  } = usePortfolio();

  const [jsonText, setJsonText] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [syncingCloud, setSyncingCloud] = useState(false);

  // Password Modification State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passStatus, setPassStatus] = useState({ type: '', message: '' });
  const [updatingPass, setUpdatingPass] = useState(false);

  const fullConfig = getFullConfig();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassStatus({ type: '', message: '' });

    if (!currentPass.trim() || !newPass.trim()) {
      setPassStatus({ type: 'error', message: 'Please provide both current and new password.' });
      return;
    }

    if (newPass.trim().length < 4) {
      setPassStatus({ type: 'error', message: 'New password must be at least 4 characters.' });
      return;
    }

    if (newPass.trim() !== confirmPass.trim()) {
      setPassStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setUpdatingPass(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_password',
          currentPassword: currentPass.trim(),
          newPassword: newPass.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAdminSecret(newPass.trim());
        localStorage.setItem('portfolio_admin_auth', newPass.trim());
        setPassStatus({ type: 'success', message: 'Admin passcode updated and saved to MongoDB!' });
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch {}
        onSaveNotification('Admin passcode updated in MongoDB database!');
      } else {
        setPassStatus({ type: 'error', message: data.message || 'Failed to update passcode.' });
      }
    } catch (err) {
      setPassStatus({ type: 'error', message: 'Error: ' + err.message });
    } finally {
      setUpdatingPass(false);
    }
  };

  const handlePushToCloud = async () => {
    setSyncingCloud(true);
    const res = await saveFullConfigToCloud(fullConfig);
    setSyncingCloud(false);
    if (res.success) {
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      } catch {}
      onSaveNotification('Full configuration synced to MongoDB Atlas!');
    } else {
      onSaveNotification(res.message);
    }
  };

  const handlePullFromCloud = async () => {
    setSyncingCloud(true);
    await refreshFromCloud();
    setSyncingCloud(false);
    onSaveNotification('Refreshed latest data from MongoDB cloud database!');
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(fullConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `naveenkumar_portfolio_config_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch {}

    onSaveNotification('Configuration exported as JSON!');
  };

  const handleImportJSON = () => {
    if (!jsonText.trim()) return;
    try {
      const parsed = JSON.parse(jsonText);
      importFullConfig(parsed);
      setJsonText('');
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch {}
      onSaveNotification('Configuration successfully imported!');
    } catch (e) {
      alert('Invalid JSON format. Please verify the syntax.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        importFullConfig(parsed);
        try {
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        } catch {}
        onSaveNotification(`Loaded configuration from ${file.name}!`);
      } catch (err) {
        alert('Failed to parse uploaded JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const generateJsCode = () => {
    return (
      `export const personalInfo = ${JSON.stringify(fullConfig.personalInfo, null, 2)};\n\n` +
      `export const skillsData = ${JSON.stringify(fullConfig.skillsData, null, 2)};\n\n` +
      `export const experienceData = ${JSON.stringify(fullConfig.experienceData, null, 2)};\n\n` +
      `export const projectsData = ${JSON.stringify(fullConfig.projectsData, null, 2)};\n\n` +
      `export const competitiveProgrammingData = ${JSON.stringify(fullConfig.competitiveProgrammingData, null, 2)};\n\n` +
      `export const achievementsData = ${JSON.stringify(fullConfig.achievementsData, null, 2)};\n\n` +
      `export const leadershipData = ${JSON.stringify(fullConfig.leadershipData, null, 2)};\n`
    );
  };

  const handleCopyJsCode = () => {
    navigator.clipboard.writeText(generateJsCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
    onSaveNotification('JavaScript source code copied to clipboard!');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(fullConfig, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 3000);
    onSaveNotification('JSON configuration copied to clipboard!');
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all data to initial defaults? Any unexported customizations will be lost.'
      )
    ) {
      resetToDefaults();
      onSaveNotification('Reset all configurations to factory defaults.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
          MongoDB Cloud Sync & Admin Security
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
          Synchronize data with MongoDB Atlas, modify your admin passcode, or manage offline backups.
        </p>
      </div>

      {/* Cloud Sync Center */}
      <div
        className="glass-card"
        style={{
          padding: '24px',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.06), rgba(168, 85, 247, 0.06))'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={22} color="#00f0ff" />
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
              MongoDB Cloud Database Status
            </h4>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background:
                cloudStatus === 'connected'
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'rgba(245, 158, 11, 0.2)',
              color: cloudStatus === 'connected' ? '#10b981' : '#f59e0b',
              border: `1px solid ${cloudStatus === 'connected' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: cloudStatus === 'connected' ? '#10b981' : '#f59e0b',
                boxShadow: `0 0 8px ${cloudStatus === 'connected' ? '#10b981' : '#f59e0b'}`
              }}
            />
            <span>
              {cloudStatus === 'connected'
                ? 'MongoDB Atlas Connected'
                : 'Offline / Local Fallback Mode'}
            </span>
          </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          {cloudStatus === 'connected'
            ? 'Your portfolio is connected to MongoDB Atlas. Changes made in the admin panel are saved to MongoDB in real-time and served to all Vercel visitors.'
            : 'To enable centralized cloud persistence on Vercel, configure MONGODB_URI in your Vercel Project Settings > Environment Variables.'}
          {lastSyncedAt && (
            <span style={{ display: 'block', marginTop: '6px', color: '#64748b', fontSize: '0.78rem' }}>
              Last Synced: {new Date(lastSyncedAt).toLocaleString()}
            </span>
          )}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={handlePushToCloud}
            disabled={syncingCloud}
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Cloud size={16} />
            <span>{syncingCloud ? 'Syncing...' : 'Push All Data to MongoDB'}</span>
          </button>

          <button
            onClick={handlePullFromCloud}
            disabled={syncingCloud}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={16} className={syncingCloud ? 'animate-spin' : ''} />
            <span>Fetch Latest from MongoDB</span>
          </button>
        </div>
      </div>

      {/* Modify Admin Passcode Card */}
      <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={20} color="#a855f7" />
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              Modify Creator Admin Passcode
            </h4>
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
            SAVED TO MONGODB
          </span>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>
          Update the security passcode required to unlock the <code>/creatoradmin</code> cockpit. The updated passcode will be stored in your MongoDB database.
        </p>

        {passStatus.message && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              background: passStatus.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${passStatus.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: passStatus.type === 'success' ? '#6ee7b7' : '#fca5a5'
            }}
          >
            {passStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{passStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '6px' }}>
                Current Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Current Passcode (e.g. Naveen1212)"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="glass-card font-mono"
                  style={{ width: '100%', padding: '8px 36px 8px 12px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '6px' }}>
                New Passcode
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter new passcode..."
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="glass-card font-mono"
                style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '6px' }}>
                Confirm New Passcode
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Re-type new passcode..."
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="glass-card font-mono"
                style={{ width: '100%', padding: '8px 12px', color: '#00f0ff', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={updatingPass}
            className="btn-primary"
            style={{ padding: '9px 20px', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Lock size={15} />
            <span>{updatingPass ? 'Updating in MongoDB...' : 'Update & Save Passcode'}</span>
          </button>
        </form>
      </div>

      {/* Export & Download Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#00f0ff', marginBottom: '8px' }}>
          Export & Copy Current Configuration
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          Download a standalone backup JSON file or copy clean JavaScript code to update <code>src/data/portfolioData.js</code> in your repository.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button onClick={handleExportJSON} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <Download size={16} />
            <span>Download Backup (JSON)</span>
          </button>

          <button onClick={handleCopyJson} className="btn-secondary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            {copiedJson ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedJson ? 'JSON Copied!' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleCopyJsCode}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.88rem', borderColor: 'rgba(168,85,247,0.3)', color: '#c084fc' }}
          >
            {copiedCode ? <Check size={16} /> : <FileCode size={16} />}
            <span>{copiedCode ? 'JS Code Copied!' : 'Copy portfolioData.js Code'}</span>
          </button>
        </div>
      </div>

      {/* Import Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a855f7', marginBottom: '8px' }}>
          Import Configuration
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '16px' }}>
          Upload a <code>.json</code> file or paste JSON code directly below to restore your custom data.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex' }}>
            <Upload size={16} />
            <span>Upload JSON File</span>
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>

        <textarea
          rows="4"
          placeholder="Paste raw configuration JSON here..."
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="glass-card font-mono"
          style={{ width: '100%', padding: '12px', color: '#00f0ff', fontSize: '0.82rem', outline: 'none', marginBottom: '12px' }}
        />

        <button
          onClick={handleImportJSON}
          disabled={!jsonText.trim()}
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.88rem', opacity: jsonText.trim() ? 1 : 0.5 }}
        >
          <Upload size={16} />
          <span>Apply Pasted JSON</span>
        </button>
      </div>

      {/* Factory Reset Card */}
      <div
        className="glass-card"
        style={{
          padding: '24px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          background: 'linear-gradient(145deg, rgba(30, 10, 15, 0.8) 0%, rgba(15, 6, 10, 0.75) 100%)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <AlertTriangle size={20} color="#ef4444" />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444' }}>
            Factory Reset
          </h4>
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '16px' }}>
          Revert all configurations and clear saved localStorage overrides back to initial default values.
        </p>
        <button
          onClick={handleReset}
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#fca5a5',
            padding: '10px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RotateCcw size={16} />
          <span>Reset to Default Content</span>
        </button>
      </div>
    </div>
  );
}
