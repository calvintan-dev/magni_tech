# Magni Technology Limited — Website

Marketing site for Magni Technology Limited (logistics, China · Hong Kong · Southeast Asia).
Languages: English, 简体中文, 繁體中文.

Stack: React 19, React Router 7, Vite, Tailwind CSS 4, TypeScript.

## Run locally

Needs Node 22+.

```bash
npm install
npm run dev        # http://127.0.0.1:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, build to `dist/`, add `404.html` fallback |
| `npm run preview` | Serve `dist/` at http://127.0.0.1:4173 |
| `npm run typecheck` | TypeScript check only |
| `npm run map` | Rebuild `src/app/networkMapData.ts` from Natural Earth data |

## Structure

```
.github/workflows/   GitHub Pages deploy
public/              Static files copied as-is (images, robots.txt, _redirects)
scripts/             Build helpers
src/
  app/App.tsx        Router provider
  app/routes.tsx     Pages, layout, translations
  app/networkMapData.ts  Generated map shapes (do not edit)
  index.css          Global styles + Tailwind
  main.tsx           Entry point
index.html           HTML shell
vite.config.ts       Build config
```

## Deploy

**Cloudflare Pages:** build command `npm run build`, output folder `dist`. `public/_redirects` handles page routes.

**GitHub Pages:** in repo Settings → Pages, set Source to "GitHub Actions". Each push to `main` deploys.
The workflow builds with `BASE_PATH=/<repo>/`. With a custom domain, change it to `/`.

## Credits

Map data: [Natural Earth](https://www.naturalearthdata.com/) (public domain).
