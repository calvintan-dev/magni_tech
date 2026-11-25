// GitHub Pages has no URL rewrites. Serving index.html as 404.html lets deep links
// such as /services/sea load the app, which then renders the right route.
// Cloudflare Pages uses public/_redirects instead; the extra file is harmless there.
import { copyFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '../dist');
copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('dist/404.html written (SPA fallback)');
