# PDF Light Viewer

A lightweight PDF viewer for Windows, inspired by PhotoDesk — minimal, fast, and focused on viewing.

## Features

- **Microsoft Ads** — Configurable ad slots (Monetize Now / pubCenter) on welcome & viewer screens
- **Clean, minimal UI** — Dark theme with distraction-free viewing
- **Thumbnail sidebar** — Quick navigation between pages (toggle on/off)
- **Zoom controls** — Zoom in, out, and fit to 100%
- **Page navigation** — Previous/next page with page counter
- **Drag & drop** — Drop PDF files to open them
- **Native file dialog** — Open files via system dialog (Electron)
- **Runs in browser too** — Works as a web app for local development

## Quick Start

### Web (Development)

```bash
npm install
npm start
```

Opens at http://localhost:3000. Use the file input or drag & drop a PDF.

### Windows Desktop (Electron)

**Build the app first:**

```bash
npm run build
npm run electron
```

**Or run in development mode** (React hot-reload + Electron):

```bash
npm run electron-dev
```

### Create Windows Installer

```bash
npm run electron-build
```

The installer will be in the `dist/` folder.

## Tech Stack

- React 18
- react-pdf (PDF.js)
- Electron (for Windows packaging)

## Microsoft Advertising

The app includes Microsoft ad slots on the welcome screen and in the PDF viewer. To enable:

1. **Sign up** at [Microsoft Monetize Now](https://monetizenow.microsoft.com) or [Microsoft pubCenter](https://about.ads.microsoft.com/en-us/h/a/publishers)
2. **Create ad units** and copy the code snippets from your publisher dashboard
3. **Add snippets** to `public/index.html` (before `</body>`)
4. **Configure** element IDs in `.env`:

```bash
# Single ad unit (same ID for all slots)
REACT_APP_MS_ADS_ELEMENT_ID=your-ad-unit-div-id

# Or separate ad units per location
REACT_APP_MS_ADS_WELCOME_ID=welcome-banner-id
REACT_APP_MS_ADS_VIEWER_ID=viewer-banner-id
```

Copy `.env.example` to `.env` and fill in your values. Without configuration, placeholder "Microsoft Ad" slots are shown.

> **Note:** Microsoft Monetize Now is scheduled to shut down Sept 2025; consider [Microsoft pubCenter](https://about.ads.microsoft.com/en-us/h/a/publishers) as an alternative.

## Usage

1. Click **Open PDF** or drag and drop a PDF file
2. Use the toolbar to navigate pages, zoom, or toggle thumbnails
3. Click **← Close** to return to the welcome screen and open another file
