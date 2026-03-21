import React, { useCallback } from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onFileSelect, onFileDrop }) => {
  const isElectron = typeof window !== 'undefined' && window.electronAPI;

  const handleOpenClick = useCallback(async () => {
    if (isElectron && window.electronAPI?.openFileDialog) {
      const path = await window.electronAPI.openFileDialog();
      if (path) {
        onFileSelect(path);
      }
    } else {
      document.getElementById('file-input').click();
    }
  }, [isElectron, onFileSelect]);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
    e.target.value = '';
  }, [onFileSelect]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  return (
    <div
      className="welcome-screen"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        id="file-input"
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <div className="welcome-icon">📄</div>
      <h1>PDF Light Viewer</h1>
      <p className="welcome-subtitle">PhotoDesk style — minimal & fast</p>
      <button className="open-btn" onClick={handleOpenClick}>
        Open PDF
      </button>
      <p className="welcome-hint">or drag and drop a PDF file here</p>
    </div>
  );
};

export default WelcomeScreen;
