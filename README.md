# Melody Master 🎵

An interactive educational web app to learn music theory, specifically the Treble Clef, through a drag-and-drop game.

## Features
- **Interactive Staff**: Drag and drop notes to hear them instantly.
- **Realistic Piano Sound**: Web Audio API synthesis for accurate piano tones.
- **Full Range**: Covers notes from C4 to C6.
- **Ear Training**: Play by ear or read the notes.

## 🚀 How to Deploy to GitHub Pages

This project uses a "No-Build" architecture (via Import Maps and CDN), which makes deployment extremely simple. You do not need `npm build` or a complex CI/CD pipeline.

### Step 1: Push to GitHub
1. Create a new repository on GitHub.
2. Push all the project files (`index.html`, `index.tsx`, `App.tsx`, etc.) to the `main` branch of your repository.

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (top tab).
3. In the left sidebar, click on **Pages**.
4. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` and `/ (root)`.
6. Click **Save**.

### Step 3: Done!
GitHub will process the files (usually takes 1-2 minutes). Refresh the Pages settings page to see your live URL (e.g., `https://your-username.github.io/melody-master/`).

## Local Development
To run this locally, you can use any static file server.
If you have Python installed:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.
