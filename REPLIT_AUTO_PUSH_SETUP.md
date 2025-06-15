# Replit Auto-Push Setup Guide

## Enable Git Integration in Replit

### 1. Connect GitHub Repository
1. In Replit, open the **Git** panel (left sidebar)
2. Click **Connect to GitHub**
3. Authorize Replit to access your GitHub account
4. Select the `NextMonthLab/Rob-Hutt-Digital` repository

### 2. Configure Auto-Push
Run the auto-push script whenever you want to deploy changes:

```bash
./auto-push.sh
```

Or manually push changes:

```bash
git add .
git commit -m "Update template"
git push origin main
```

### 3. Automatic Deployment Flow
1. Make changes in Replit
2. Run `./auto-push.sh` to push to GitHub
3. GitHub Actions automatically deploys to Pages
4. Live preview updates at: https://nextmonthlab.github.io/Rob-Hutt-Digital/

## Template Directory Structure

The `/pallet` directory contains the deployable template:
- `index.html` - Main template file
- `src/` - React components and pages
- `public/` - Static assets
- `theme.json` - Customizable theme configuration

## Troubleshooting

**Git Authentication Issues:**
- Ensure you're signed into GitHub in Replit
- Check Git panel for connection status
- Re-authorize if needed

**Deployment Failures:**
- Verify GitHub Pages is enabled with "GitHub Actions" source
- Check Actions tab for build errors
- Ensure main branch is up to date

This setup enables seamless development-to-deployment workflow for the NextMonth Lab template.