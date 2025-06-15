#!/bin/bash

# Auto-push script for Replit Git integration
echo "Auto-pushing changes to GitHub..."

git add .
git commit -m "Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo "Changes pushed to GitHub successfully!"