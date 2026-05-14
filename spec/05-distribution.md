# Distribution — Specification

## Two distribution modes

### 1. Node.js/Express server

The production mode where the `dist/` folder is served over HTTP.

```bash
npm run build    # produces dist/
npm run serve    # starts Express server on PORT (default 3000)
```

**server.js** (minimal SPA server):
```js
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(__dirname, 'dist')))
app.get('*', (_, res) => res.sendFile(join(__dirname, 'dist/index.html')))
app.listen(process.env.PORT ?? 3000, () => console.log('Mathplay running'))
```

### 2. Single self-contained HTML file

All JavaScript and CSS are inlined into a single `dist/index.html` — no server needed.

```bash
npm run build:single   # produces a single dist/index.html (works via file://)
```

Uses `vite-plugin-singlefile`. Configured in `vite.config.js` when `BUILD_MODE=single`.

**Constraints:**
- `localStorage` works normally
- No network connection required
- Estimated bundle size: ~300–500 KB uncompressed

## Scripts summary

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm run build:single` | Single-file build → `dist/index.html` |
| `npm run serve` | Start Express server from `dist/` |
| `npm run preview` | Vite preview of the `dist/` build |
| `npm run lint` | ESLint check |
| `npm test` | Playwright E2E tests |
| `npm run test:report` | Open last Playwright HTML report |

## Environment variables

```
PORT=3000              # Express server port (Node.js mode)
BUILD_MODE=single      # Triggers single-file build in vite.config.js
```

## Testing

Playwright E2E tests live in `tests/`. Configuration in `playwright.config.ts`.

Run against the dev server (`npm run dev`) or a preview build (`npm run preview`).

## Azure Static Web App deployment

The project is configured for Azure Static Web Apps (West Europe region). Infrastructure is managed with Terraform locally (not tracked in git). The main branch is the production deployment target.

## CI/CD (planned)

- GitHub Actions: `npm run build` on push to `main` → deploy to Azure Static Web Apps
- Branch `main` = production
