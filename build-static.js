#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building static site for GitHub Pages...');

try {
  // Build the frontend with Vite
  console.log('Building frontend...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Copy static assets if they exist
  const assetsDir = './attached_assets';
  const distDir = './dist';
  
  if (fs.existsSync(assetsDir)) {
    const assetsDestDir = path.join(distDir, 'assets');
    if (!fs.existsSync(assetsDestDir)) {
      fs.mkdirSync(assetsDestDir, { recursive: true });
    }
    
    console.log('Copying attached assets...');
    execSync(`cp -r ${assetsDir}/* ${assetsDestDir}/`, { stdio: 'inherit' });
  }
  
  // Create a simple .nojekyll file to bypass Jekyll processing
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  
  console.log('Static build completed successfully!');
  console.log('Files are ready in ./dist directory');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}