#!/bin/bash

# Template registered for NextMonth Lab
# Type: Business Website

echo "Starting business-site-template..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application
echo "Building application..."
npm run build

# Start the production server
echo "Starting production server on port 5000..."
npm start