import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { readdir } from 'fs/promises';
import { stat } from 'fs/promises';
import { extname } from 'path';
import { createServer as createNetServer } from 'net';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, '..', 'dist');
const indexPath = join(distDir, 'index.html');

// Routes to prerender
const routes = [
  '/',
  '/join-as-pro',
  '/contact',
  '/services',
  '/services/tv-mounting',
  '/blog/tv-mounting-services-los-angeles',
  '/plumbing',
  '/electrical',
  '/hvac',
  '/handyman-services',
  '/services/smart-home',
  '/house-cleaning',
  '/booking-confirmed',
  '/quote-received',
];

// Find an available port
function findAvailablePort(startPort = 4173) {
  return new Promise((resolve, reject) => {
    const server = createNetServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try next port
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

// Simple static file server
function createStaticServer(port) {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);
      
      // Handle directory requests - serve index.html
      try {
        const stats = await stat(filePath);
        if (stats.isDirectory()) {
          filePath = join(filePath, 'index.html');
        }
      } catch (e) {
        // File doesn't exist, try index.html
        if (!extname(filePath)) {
          filePath = join(filePath, 'index.html');
        }
      }
      
      // Default to index.html for SPA routing
      if (!extname(filePath) || !filePath.includes('.')) {
        filePath = join(distDir, 'index.html');
      }
      
      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        const contentType = 
          ext === '.html' ? 'text/html' :
          ext === '.js' ? 'application/javascript' :
          ext === '.css' ? 'text/css' :
          ext === '.json' ? 'application/json' :
          'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch (e) {
        // Fallback to index.html for SPA
        try {
          const content = readFileSync(join(distDir, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        } catch (e2) {
          res.writeHead(404);
          res.end('Not found');
        }
      }
    });
    
    server.listen(port, () => {
      console.log(`🌐 Static server running on http://localhost:${port}`);
      resolve(server);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        reject(new Error(`Port ${port} is already in use`));
      } else {
        reject(err);
      }
    });
  });
}

async function prerender() {
  console.log('🚀 Starting prerendering...');
  
  // Read the base index.html template
  const indexHtmlTemplate = readFileSync(indexPath, 'utf-8');
  
  // Find available port and start static server
  const port = await findAvailablePort(4173);
  const server = await createStaticServer(port);
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });
  
  for (const route of routes) {
    try {
      console.log(`📄 Prerendering: ${route}`);
      
      // Navigate to the route
      await page.goto(`http://localhost:${port}${route}`, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait for React to render
      await page.waitForSelector('#root', { timeout: 10000 });
      
      // Wait for lazy-loaded components
      await page.waitForTimeout(2000);
      
      // Wait for any dynamic content
      await page.waitForFunction(
        () => document.getElementById('root')?.innerHTML.length > 0,
        { timeout: 10000 }
      );
      
      // Additional wait for animations/transitions
      await page.waitForTimeout(500);
      
      // Get the rendered HTML
      const html = await page.content();
      
      // Extract the root content
      const rootContent = await page.evaluate(() => {
        const root = document.getElementById('root');
        return root ? root.innerHTML : '';
      });
      
      // Extract head content (for react-helmet-async)
      const headContent = await page.evaluate(() => {
        const head = document.head;
        // Get all head children except script and link tags that are added by Vite
        const headChildren = Array.from(head.children)
          .filter(child => {
            const tag = child.tagName.toLowerCase();
            return !(tag === 'script' && child.src) && 
                   !(tag === 'link' && child.rel === 'modulepreload');
          })
          .map(child => child.outerHTML)
          .join('\n    ');
        return headChildren;
      });
      
      // Create the prerendered HTML
      // Replace the root div
      let prerenderedHtml = indexHtmlTemplate.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${rootContent}</div>`
      );
      
      // Insert head content before closing head tag
      prerenderedHtml = prerenderedHtml.replace(
        '</head>',
        `    ${headContent}\n  </head>`
      );
      
      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = indexPath;
      } else {
        const routeDir = join(distDir, route);
        mkdirSync(routeDir, { recursive: true });
        outputPath = join(routeDir, 'index.html');
      }
      
      // Write the prerendered HTML
      writeFileSync(outputPath, prerenderedHtml, 'utf-8');
      console.log(`✅ Prerendered: ${route} -> ${outputPath}`);
      
    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
    }
  }
  
  await browser.close();
  server.close();
  console.log('✨ Prerendering complete!');
}

prerender().catch(console.error);
