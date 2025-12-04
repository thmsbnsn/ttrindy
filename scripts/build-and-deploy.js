#!/usr/bin/env node

/**
 * Build and Deploy Script for Top Tier Restoration
 * This script builds the project, pushes to GitHub, and triggers Vercel deployment
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWindows = process.platform === 'win32';

function exec(command, options = {}) {
  try {
    console.log(`\n▶ ${command}`);
    execSync(command, {
      stdio: 'inherit',
      shell: isWindows,
      ...options
    });
    return true;
  } catch (error) {
    console.error(`\n❌ Error executing: ${command}`);
    if (!options.continueOnError) {
      process.exit(1);
    }
    return false;
  }
}

function getCurrentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
  } catch {
    try {
      return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    } catch {
      return 'main';
    }
  }
}

function hasChanges() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    return status.trim().length > 0;
  } catch {
    return false;
  }
}

function main() {
  console.log('🚀 Starting build and deploy process...\n');

  // Step 1: Build the Vite project
  console.log('📦 Building Vite project...');
  exec('npm run build:only');

  // Step 2: Build Sanity Studio
  console.log('\n🎨 Building Sanity Studio...');
  exec('npm run sanity:build', { continueOnError: true });

  // Step 3: Check if git is initialized
  try {
    execSync('git status', { stdio: 'ignore' });
  } catch {
    console.log('\n⚠️  Git repository not initialized. Skipping git operations.');
    console.log('💡 Initialize git with: git init');
    console.log('💡 Add remote with: git remote add origin <your-repo-url>');
    process.exit(0);
  }

  // Step 4: Check for changes and commit
  if (hasChanges()) {
    console.log('\n📝 Staging changes...');
    exec('git add .');

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    console.log('\n💾 Committing changes...');
    exec(`git commit -m "Build: ${timestamp}"`, { continueOnError: true });
  } else {
    console.log('\n✅ No changes to commit');
  }

  // Step 5: Push to GitHub (this will trigger Vercel via webhook)
  const branch = getCurrentBranch();
  console.log(`\n📤 Pushing to GitHub (branch: ${branch})...`);

  try {
    execSync('git remote get-url origin', { stdio: 'ignore' });
    exec(`git push origin ${branch}`, { continueOnError: true });
    console.log('\n✅ Successfully pushed to GitHub!');
    console.log('🌐 Vercel will automatically deploy from GitHub webhook');
  } catch {
    console.log('\n⚠️  No GitHub remote configured.');
    console.log('💡 Add remote with: git remote add origin <your-github-repo-url>');
  }

  console.log('\n✅ Build and deploy process complete!');
}

main();
