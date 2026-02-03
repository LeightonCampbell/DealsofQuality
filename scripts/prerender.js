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

// Routes to prerender – MUST match every route in src/App.tsx for Netlify SSG (no 404s).
// Service pages live at ROOT level (e.g. /plumbing, /electrical), not under /services/.
// When adding a new route in App.tsx, add it here too or Netlify will 404.
const routes = [
  // Core pages
  '/',
  '/join-as-pro',
  '/contact',
  '/about',
  '/faqs',
  '/terms',
  '/privacy',
  '/services',
  '/blog',
  '/quote-received',
  '/booking-confirmed',
  '/success',
  '/remote-support',
  '/services/contact-sales',
  // Admin (prerender for crawlers; auth still required at runtime)
  '/admin',
  '/admin/dashboard',
  // Service category hubs (under /services/)
  '/services/home-services',
  '/services/tv-mounting',
  '/services/smart-home',
  '/services/audio-video',
  '/services/wifi-network',
  '/services/home-security',
  '/services/computers-printers',
  '/services/business',
  // Blog posts – add any new blog route from App.tsx here
  '/blog/7-reasons-why-your-local-business-needs-modern-website-2026',
  '/blog/signs-your-computer-needs-professional-support',
  '/blog/tv-mounting-done-right-why-professional-installation-matters',
  '/blog/top-5-mistakes-to-avoid-when-mounting-your-tv',
  '/blog/tv-mounting-services-los-angeles',
  '/blog/handyman-services-los-angeles',
  // Home services (root-level)
  '/handyman-services',
  '/painting',
  '/flooring-installation',
  '/drywall-installation',
  '/cabinet-installation',
  '/tile-work',
  '/window-door-replacement',
  '/window-cleaning',
  '/deck-patio-building',
  '/fence-installation',
  '/bathroom-remodeling',
  '/kitchen-remodeling',
  '/plumbing',
  '/electrical',
  '/hvac',
  '/roofing',
  '/appliance-repair',
  '/water-heater-installation',
  '/gutter-installation',
  '/siding-installation',
  '/garage-door-installation',
  '/solar-panel-installation',
  '/house-cleaning',
  '/carpet-cleaning',
  '/junk-removal',
  '/pressure-washing',
  '/gutter-cleaning',
  '/pest-control',
  '/organization-services',
  '/landscaping',
  '/snow-removal',
  '/furniture-assembly',
  '/ac-tune-up',
  '/leak-detection',
  '/light-fixture-replacement',
  '/smoke-detector-installation',
  '/smart-irrigation-installation',
  '/holiday-lighting-installation',
  // TV mounting services
  '/tv-mounting-up-to-50',
  '/tv-mounting-51-to-65',
  '/tv-mounting-over-65',
  '/tv-cable-concealment',
  '/soundbar-installation',
  '/tv-dismount-remount',
  // Smart home services
  '/smart-thermostats',
  '/video-doorbells',
  '/smart-locks',
  '/smart-home-integration',
  // Audio & video services
  '/home-theater',
  '/surround-sound',
  '/streaming-setup',
  '/gaming-setup',
  // WiFi & network services
  '/router-setup',
  '/network-optimization',
  '/dead-zone-elimination',
  '/business-networks',
  // Home security services
  '/security-cameras',
  '/motion-sensors',
  // Computers & printers services
  '/computer-repair',
  '/virus-removal',
  '/printer-setup',
  '/data-backup',
  // Business services
  '/website-design',
  '/remote-support-service',
  '/business-it-solutions',
  '/custom-solutions',
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Wait for any dynamic content
      await page.waitForFunction(
        () => document.getElementById('root')?.innerHTML.length > 0,
        { timeout: 10000 }
      );
      
      // Additional wait for animations/transitions
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
