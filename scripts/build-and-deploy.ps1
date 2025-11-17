# Build and Deploy Script for Top Tier Restoration (PowerShell)
# This script builds the project, pushes to GitHub, and triggers Vercel deployment

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting build and deploy process..." -ForegroundColor Cyan

# Step 1: Build the Vite project
Write-Host "📦 Building Vite project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Vite build failed!" -ForegroundColor Red
    exit 1
}

# Step 2: Build Sanity Studio
Write-Host "🎨 Building Sanity Studio..." -ForegroundColor Yellow
npm run sanity:build
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Sanity Studio build failed, continuing..." -ForegroundColor Yellow
}

# Step 3: Check if there are changes to commit
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Staging changes..." -ForegroundColor Yellow
    git add .

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "Build: $timestamp" 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ℹ️  No changes to commit or commit failed" -ForegroundColor Gray
    }
} else {
    Write-Host "✅ No changes to commit" -ForegroundColor Green
}

# Step 4: Push to GitHub (this will trigger Vercel via webhook)
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
$branch = git branch --show-current
if ($branch -eq "main") {
    git push origin main 2>&1 | Out-Null
} elseif ($branch -eq "master") {
    git push origin master 2>&1 | Out-Null
} else {
    Write-Host "⚠️  Current branch is not main/master. Pushing to current branch: $branch" -ForegroundColor Yellow
    git push origin $branch 2>&1 | Out-Null
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Push failed or no remote configured" -ForegroundColor Yellow
    Write-Host "💡 Make sure you have a GitHub remote configured:" -ForegroundColor Cyan
    Write-Host "   git remote add origin <your-github-repo-url>" -ForegroundColor Gray
} else {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
}

Write-Host "✅ Build and deploy process complete!" -ForegroundColor Green
Write-Host "🌐 Vercel will automatically deploy from GitHub webhook" -ForegroundColor Cyan

