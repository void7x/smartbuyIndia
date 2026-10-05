/**
 * Bundles scripts/smoke.jsx with the esbuild that ships inside Vite, then runs
 * it with Node. Keeps the smoke test dependency-free.
 */
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', '.smoke');
mkdirSync(outDir, { recursive: true });

await build({
  entryPoints: [resolve(__dirname, 'smoke.jsx')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  outfile: resolve(outDir, 'smoke.cjs'),
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
  jsx: 'automatic',
  logLevel: 'warning',
  // Node built-ins stay external; react comes from node_modules.
});

execFileSync(process.execPath, [resolve(outDir, 'smoke.cjs')], { stdio: 'inherit' });
