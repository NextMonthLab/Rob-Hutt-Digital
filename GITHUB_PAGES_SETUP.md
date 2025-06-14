# GitHub Pages Deployment - Complete Setup

## Files Added for GitHub Pages Support

✅ **`.github/workflows/deploy.yml`** - GitHub Actions workflow for automatic deployment  
✅ **`build-static.js`** - Custom build script for static site generation  
✅ **`DEPLOY.md`** - Comprehensive deployment documentation  
✅ **`gh-pages`** package installed for manual deployment option

## Quick Start

1. **Push to GitHub**: Upload this repository to GitHub
2. **Automatic Setup**: The workflow will automatically create and configure GitHub Pages
3. **Deploy**: Push to `main` branch triggers automatic deployment
4. **Access Site**: After deployment completes, find your site URL in the Actions tab

## Repository Name Configuration

Current configuration assumes repository name: `business-site-template`

**To use a different repository name:**
- The Vite base path is currently set in the existing config
- Update any hardcoded references if needed
- GitHub Actions will automatically handle the deployment

## Build Process

The deployment uses a streamlined build process:
- Frontend built with existing Vite configuration
- Static files generated in `./dist` directory
- `.nojekyll` file added for proper GitHub Pages handling
- Automatic deployment via GitHub Actions

## Manual Deployment (Optional)

For immediate deployment without pushing to GitHub:

```bash
node build-static.js
npx gh-pages -d dist
```

## Deployment URL Structure

Your deployed site will be available at:
```
https://<github-username>.github.io/<repository-name>/
```

## Important Notes

- This creates a **static frontend-only** deployment
- Express.js backend functionality not included in GitHub Pages
- NextMonth SOT integration will need production API configuration
- All API calls default to relative paths (suitable for static deployment)

## Template Benefits for GitHub Pages

The business template is well-suited for GitHub Pages because:
- React frontend compiles to static HTML/CSS/JS
- Professional design works across all devices
- Generic content ready for customization
- Self-contained with minimal external dependencies

## Next Steps

1. Push this repository to GitHub
2. Configure GitHub Pages in repository settings
3. Customize the base URL if using different repository name
4. Deploy and share your business template!