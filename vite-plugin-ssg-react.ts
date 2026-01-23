import type { Plugin } from 'vite';
import { execSync } from 'child_process';
import { join } from 'path';

export interface SSGPluginOptions {
  routes?: string[];
  scriptPath?: string;
}

export function ssg(options: SSGPluginOptions = {}): Plugin {
  const {
    routes = [],
    scriptPath = join(process.cwd(), 'scripts', 'prerender.js'),
  } = options;

  return {
    name: 'vite-plugin-ssg-react',
    apply: 'build',
    closeBundle() {
      // Run prerender script after build
      try {
        console.log('🚀 Running SSG prerender...');
        execSync(`node ${scriptPath}`, { stdio: 'inherit' });
        console.log('✅ SSG prerender complete!');
      } catch (error) {
        console.error('❌ SSG prerender failed:', error);
        // Don't fail the build if prerender fails
      }
    },
  };
}
