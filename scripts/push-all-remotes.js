#!/usr/bin/env node
/**
 * Push current branch to all git remotes.
 * Usage: node scripts/push-all-remotes.js
 * Or: npm run push:all
 */
import { execSync } from 'child_process';

const remotes = execSync('git remote', { encoding: 'utf-8' })
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const branch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();

if (remotes.length === 0) {
  console.error('No remotes configured.');
  process.exit(1);
}

console.log(`Pushing ${branch} to ${remotes.length} remote(s): ${remotes.join(', ')}\n`);

for (const remote of remotes) {
  try {
    execSync(`git push ${remote} ${branch}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to push to ${remote}`);
    process.exit(1);
  }
}

console.log('\nDone. Pushed to all remotes.');
