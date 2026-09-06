import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, Upload, RotateCcw, Copy, Check, AlertTriangle, FileCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BackupAdmin({ onSaveNotification }) {
  const { getFullConfig, importFullConfig, resetToDefaults } = usePortfolio();
  const [jsonText, setJsonText] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const fullConfig = getFullConfig();

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `naveenkumar_portfolio_config_${new Date().toISOString().slice(0,10)}.json`);
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
    return `export const personalInfo = ${JSON.stringify(fullConfig.personalInfo, null, 2)};\n\n` +
           `export const skillsData = ${JSON.stringify(fullConfig.skillsData, null, 2)};\n\n` +
           `export const experienceData = ${JSON.stringify(fullConfig.experienceData, null, 2)};\n\n` +
           `export const projectsData = ${JSON.stringify(fullConfig.projectsData, null, 2)};\n\n` +
           `export const competitiveProgrammingData = ${JSON.stringify(fullConfig.competitiveProgrammingData, null, 2)};\n\n` +
           `export const achievementsData = ${JSON.stringify(fullConfig.achievementsData, null, 2)};\n\n` +
           `export const leadershipData = ${JSON.stringify(fullConfig.leadershipData, null, 2)};\n`;
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
    if (window.confirm('Are you sure you want to reset all data to initial defaults? Any unexported customizations will be lost.')) {
      resetToDefaults();
      onSaveNotification('Reset all configurations to factory defaults.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Backup, Export & Code Generator</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
          Export your configuration to JSON, copy updated code into your Git repo, or import backups.
        </p>
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

          <button onClick={handleCopyJsCode} className="btn-secondary" style={{ padding: '10px 18px', fontSize: '0.88rem', borderColor: 'rgba(168,85,247,0.3)', color: '#c084fc' }}>
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
      <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(145deg, rgba(30, 10, 15, 0.8) 0%, rgba(15, 6, 10, 0.75) 100%)' }}>
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
