#!/bin/bash

# Build and Deploy Script for Top Tier Restoration
# This script builds the project, pushes to GitHub, and triggers Vercel deployment

set -e  # Exit on any error

echo "🚀 Starting build and deploy process..."

# Step 1: Build the Vite project
echo "📦 Building Vite project..."
npm run build

# Step 2: Build Sanity Studio
echo "🎨 Building Sanity Studio..."
npm run sanity:build

# Step 3: Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Staging changes..."
    git add .

    echo "💾 Committing changes..."
    git commit -m "Build: $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
else
    echo "✅ No changes to commit"
fi

# Step 4: Push to GitHub (this will trigger Vercel via webhook)
echo "📤 Pushing to GitHub..."
git push origin main || git push origin master || echo "⚠️  Push failed or no remote configured"

echo "✅ Build and deploy process complete!"
echo "🌐 Vercel will automatically deploy from GitHub webhook"

