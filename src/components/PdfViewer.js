import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PdfViewer.css';

// Set up PDF.js worker (unpkg CDN - works in browser and Electron)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showThumbnails, setShowThumbnails] = useState(true);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    setError(err?.message || 'Failed to load PDF');
    setLoading(false);
  }, []);

  const goToPrevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(numPages || 1, p + 1));

  const zoomIn = () => setScale((s) => Math.min(3, s + 0.25));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.25));
  const zoomFit = () => setScale(1.0);

  if (error) {
    return (
      <div className="pdf-viewer pdf-error">
        <p>{error}</p>
        <button className="btn-close" onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      <header className="pdf-toolbar">
        <button className="toolbar-btn" onClick={onClose} title="Close">
          ← Close
        </button>
        <span className="file-name">{file?.name ?? file?.path ?? 'Document'}</span>
        <div className="toolbar-controls">
          <button
            className="toolbar-btn"
            onClick={() => setShowThumbnails(!showThumbnails)}
            title={showThumbnails ? 'Hide thumbnails' : 'Show thumbnails'}
          >
            {showThumbnails ? '⊟' : '⊞'} Thumbnails
          </button>
          <div className="page-nav">
            <button className="toolbar-btn" onClick={goToPrevPage} disabled={pageNumber <= 1}>‹</button>
            <span className="page-info">{pageNumber} / {numPages || '—'}</span>
            <button className="toolbar-btn" onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)}>›</button>
          </div>
          <div className="zoom-controls">
            <button className="toolbar-btn" onClick={zoomOut} title="Zoom out">−</button>
            <span className="zoom-level">{Math.round(scale * 100)}%</span>
            <button className="toolbar-btn" onClick={zoomIn} title="Zoom in">+</button>
            <button className="toolbar-btn" onClick={zoomFit} title="Fit">100%</button>
          </div>
        </div>
      </header>

      <div className="pdf-content">
        {showThumbnails && (
          <aside className="pdf-sidebar">
            <Document
              file={file?.url || file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<div className="pdf-loading">Loading...</div>}
            >
              {Array.from({ length: numPages || 0 }, (_, i) => (
                <div
                  key={i}
                  className={`thumbnail ${pageNumber === i + 1 ? 'active' : ''}`}
                  onClick={() => setPageNumber(i + 1)}
                >
                  <Page pageNumber={i + 1} width={120} />
                </div>
              ))}
            </Document>
          </aside>
        )}

        <main className="pdf-main">
          {loading && <div className="pdf-loading">Loading PDF...</div>}
          <Document
            file={file?.url || file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="pdf-page"
            />
          </Document>
        </main>
      </div>
    </div>
  );
};

export default PdfViewer;
