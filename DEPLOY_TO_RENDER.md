# Deploying to Render (Free Static Site)

This project is pre-configured for instant deployment on [Render](https://render.com) as a **Static Site** (100% free with SSL and CDN).

---

## Pre-Configured Files

1. **`render.yaml`** (Blueprint specification):
   - Type: `static`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Rewrite rule: `/*` to `/index.html` (prevents 404 errors on browser page reloads in React Router)
2. **`public/_redirects`**:
   - Bundled automatically into `dist/` to handle SPA browser history routing.

---

## Step-by-Step Deployment Options

### Option A: Push to GitHub & Connect to Render (Recommended)

1. **Create a GitHub repository**:
   - Go to [github.com/new](https://github.com/new).
   - Name it (e.g. `data-structure-visualizer`), keep it Public or Private, and do not initialize with README.

2. **Push this local repository**:
   Run in your terminal:
   ```bash
   cd /home/alarion/.gemini/antigravity/scratch/data-structure-visualizer
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/data-structure-visualizer.git
   git push -u origin main
   ```

3. **Deploy on Render**:
   - Log into [dashboard.render.com](https://dashboard.render.com).
   - Click **New +** → **Static Site**.
   - Connect your GitHub repository.
   - Render will automatically populate:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
   - Click **Create Static Site**.
   - Within 1–2 minutes, your web application will be live at `https://data-structure-visualizer-xxxx.onrender.com`!

---

### Option B: Deploy Using Render Blueprints

1. In the Render Dashboard, click **New +** → **Blueprint**.
2. Select your connected repository.
3. Render will read `render.yaml` automatically, set up the static service, build commands, and routing rules without manual input.
4. Click **Apply**.
