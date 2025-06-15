# GitHub Pages Setup for Rob Hutt Digital Template

## Quick Setup Instructions

### 1. Enable GitHub Pages
1. Go to: https://github.com/NextMonthLab/Rob-Hutt-Digital/settings/pages
2. Set **Source** to "GitHub Actions" (not branch deployment)
3. Save the settings

### 2. Configure Environment Protection Rules
**CRITICAL**: Configure environment settings to prevent deployment failures:

1. Go to: https://github.com/NextMonthLab/Rob-Hutt-Digital/settings/environments
2. Click on **github-pages** environment (created automatically)
3. Under **Deployment branches**, ensure **main** branch is allowed
4. Save environment settings

Without this step, the deploy job will fail with protection rule errors.

### 3. Verify Deployment Workflow
The `.github/workflows/deploy.yml` file is already configured and will:
- Deploy static files directly from the `/pallet` directory
- Deploy to GitHub Pages automatically on every push to main branch

### 4. Live Preview URL
Once GitHub Pages is enabled, the template will be available at:
**https://nextmonthlab.github.io/Rob-Hutt-Digital/**

### 5. Template Metadata
The `template-metadata.json` file has been updated with:
- Correct live preview URL
- Rob Hutt Digital branding
- NextMonth Lab integration details

## Deployment Process

1. **Automatic Builds**: Every push to main/master triggers deployment
2. **Build Process**: Uses Node.js 20, installs dependencies, builds static files
3. **Deployment**: Deploys built files to GitHub Pages
4. **Live URL**: Updates automatically at the GitHub Pages URL

## Verification Steps

After enabling GitHub Pages:
1. Push any change to trigger first deployment
2. Check Actions tab for deployment status
3. Verify live site at the GitHub Pages URL
4. Confirm NextMonth Lab can access the live preview

This configuration will immediately resolve the "metadata missing" and "Live Preview Not Available" issues in NextMonth Lab.