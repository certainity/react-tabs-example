import React from 'react';
import './MicrosoftAdBanner.css';

/**
 * Microsoft Ad Banner component for Microsoft Advertising (Monetize Now / pubCenter).
 *
 * Setup:
 * 1. Sign up at https://monetizenow.microsoft.com or Microsoft pubCenter
 * 2. Create ad units and get your code snippets
 * 3. Add snippets to public/index.html (paste before </body>)
 * 4. Set elementId via prop or .env (e.g. REACT_APP_MS_ADS_WELCOME_ID, REACT_APP_MS_ADS_VIEWER_ID)
 */
const MicrosoftAdBanner = ({ slotId = 'ms-ad-slot', elementId: elementIdProp, className = '' }) => {
  const elementId = elementIdProp || process.env.REACT_APP_MS_ADS_ELEMENT_ID || `ms-ad-${slotId}`;
  const isConfigured = !!(elementIdProp || process.env.REACT_APP_MS_ADS_ELEMENT_ID);

  return (
    <div className={`microsoft-ad-banner ${className}`} data-ms-ad-slot={slotId}>
      {isConfigured ? (
        <div id={elementId} className="ms-ad-container" />
      ) : (
        <div className="ms-ad-placeholder">
          <span className="ms-ad-label">Microsoft Ad</span>
          <span className="ms-ad-hint">
            Add Microsoft ad code to index.html & REACT_APP_MS_ADS_ELEMENT_ID to .env
          </span>
        </div>
      )}
    </div>
  );
};

export default MicrosoftAdBanner;
