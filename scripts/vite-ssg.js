#!/usr/bin/env node
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Run vite build (which includes our SSG plugin)
console.log('🚀 Building with SSG...');
try {
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: rootDir,
  });
  console.log('✅ SSG build complete!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
