#!/bin/bash

# Script for deploying the Rob Hutt Digital application to Hetzner
# This script handles the build process and deployment preparation

echo "Starting deployment process for Rob Hutt Digital"

# Clean up previous build artifacts
echo "Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Type check
echo "Running TypeScript check..."
npx tsc --noEmit

# Run tests if they exist
if [ -d "tests" ] || [ -d "__tests__" ]; then
  echo "Running tests..."
  npm test
fi

# Create necessary directories
mkdir -p logs

echo "Build completed successfully!"
echo "The application is ready to be deployed to Hetzner."
echo "Use 'docker-compose up --build' to start the application in production mode."