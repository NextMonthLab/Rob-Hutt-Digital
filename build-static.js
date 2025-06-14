#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building static site for GitHub Pages...');

try {
  // Build the frontend with Vite
  console.log('Building frontend...');
  execSync('vite build', { stdio: 'pipe' });
  
  // Create a simple .nojekyll file to bypass Jekyll processing
  const distDir = './dist';
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  
  console.log('Static build completed successfully!');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}