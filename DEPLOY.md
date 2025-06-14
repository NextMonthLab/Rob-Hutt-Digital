# GitHub Pages Deployment Guide

## Overview

This business site template is configured for automatic deployment to GitHub Pages using GitHub Actions. The setup includes a custom build process that generates a static version of the React application.

## Setup Instructions

### 1. Repository Configuration

1. Push this project to a GitHub repository
2. Go to your repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The deployment will trigger automatically on pushes to the `main` branch

### 2. Repository Name Configuration

The template is currently configured for repository name `business-site-template`. If using a different repository name, you'll need to update the base path in the Vite configuration.

### 3. Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Trigger on pushes to `main` branch
- Install dependencies using npm
- Build the static site using the custom build script
- Deploy to GitHub Pages automatically

## Build Process

### Static Build Script

The `build-static.js` script handles:
- Frontend compilation with Vite
- Asset copying from `attached_assets` directory
- Creating `.nojekyll` file for proper GitHub Pages handling

### Manual Build Testing

To test the build locally:

```bash
node build-static.js
```

This will create a `dist` directory with the static files.

### Manual Deployment

For manual deployment using gh-pages:

```bash
npx gh-pages -d dist
```

## File Structure

```
.github/workflows/deploy.yml  # GitHub Actions workflow
build-static.js              # Custom build script
dist/                        # Generated static files (after build)
client/                      # React application source
attached_assets/             # Static assets
```

## Deployment URL

After successful deployment, your site will be available at:
```
https://<username>.github.io/<repository-name>/
```

For example: `https://yourname.github.io/business-site-template/`

## Important Notes

- The build process creates a static version of the frontend only
- Server-side functionality (Express.js backend) is not included in GitHub Pages deployment
- API calls will need to be configured for your production backend or replaced with static data
- The NextMonth SOT integration will require proper API endpoint configuration for production

## Troubleshooting

### Build Failures
- Check that all dependencies are properly listed in package.json
- Ensure the Vite build completes without errors
- Verify that attached assets exist and are accessible

### Pages Not Loading
- Confirm the repository name matches the base path configuration
- Check that GitHub Pages is enabled in repository settings
- Verify the deployment completed successfully in the Actions tab

### Asset Loading Issues
- Ensure assets use relative paths
- Check that the `.nojekyll` file is present in the dist directory
- Verify asset paths are correctly configured for the base URL