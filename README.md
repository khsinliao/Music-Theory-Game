# UU Music 🎵

An interactive educational web app to learn music theory, specifically the Treble Clef, through a drag-and-drop game.

## Features
- **Interactive Staff**: Drag and drop notes to hear them instantly.
- **Realistic Piano Sound**: Web Audio API synthesis for accurate piano tones.
- **Full Range**: Covers notes from C4 to C6.
- **Ear Training**: Play by ear or read the notes.

## 🚀 How to Deploy to GitHub Pages

This project uses **Vite** to build an optimized production version of the app.

### Prerequisites
Make sure you have Node.js and npm installed.

### Step 1: Install Dependencies
Open your terminal in the project folder and run:
```bash
npm install
```

### Step 2: One-Click Deploy
Run the following command:
```bash
npm run deploy
```

**What this command does:**
1. Checks TypeScript for errors.
2. Builds the project using Vite (generates a `dist` folder).
3. Pushes the `dist` folder to the `gh-pages` branch on GitHub.

### Step 3: Verify GitHub Settings
1. Go to your repository on GitHub.
2. Click on **Settings** (top tab).
3. In the left sidebar, click on **Pages**.
4. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
5. Ensure **Branch** is set to `gh-pages` and folder is `/ (root)`.
6. Wait a minute or two, and your site will be live!

## Local Development
To run the app locally with hot-reloading:
```bash
npm run dev
```
Then open `http://localhost:5173` in your browser.