import React, { useState, useCallback } from 'react';
import PdfViewer from './components/PdfViewer';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileSelect = useCallback((fileOrPath) => {
    if (typeof fileOrPath === 'string') {
      const name = fileOrPath.split(/[/\\]/).pop();
      // For Electron: convert path to file URL for react-pdf
      const url = 'file:///' + fileOrPath.replace(/\\/g, '/');
      setFile({ url, name });
    } else if (fileOrPath instanceof File) {
      setFile(fileOrPath);
    }
  }, []);

  const handleClose = useCallback(() => {
    setFile(null);
  }, []);

  return (
    <div className="App">
      {file ? (
        <PdfViewer file={file} onClose={handleClose} />
      ) : (
        <WelcomeScreen onFileSelect={handleFileSelect} onFileDrop={handleFileSelect} />
      )}
    </div>
  );
};

export default App;
