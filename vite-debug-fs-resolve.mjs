import fs from 'fs';

const LOG_PATH = '.cursor/debug.log';
const INGEST_URL = 'http://127.0.0.1:7247/ingest/86516d1d-89e6-4a24-abd6-0a6ec210fee5';

function writeDebugLog(configName, message, data) {
  const payload = {
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
    location: `vite-debug-fs-resolve.mjs:resolveId`,
    message,
    data: { configName, ...data },
    hypothesisId: 'H1-H5',
  };
  const line = JSON.stringify(payload) + '\n';
  try {
    fs.appendFileSync(LOG_PATH, line);
  } catch (_) {}
  try {
    fetch(INGEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch (_) {}
}

export function viteDebugFsResolvePlugin(configName) {
  return {
    name: 'vite-debug-fs-resolve',
    enforce: 'pre',
    configResolved(config) {
      // #region agent log
      const entry = config.build?.rollupOptions?.input;
      writeDebugLog(configName, 'configResolved build started', {
        entry: entry ? (typeof entry === 'string' ? entry : Object.values(entry || {})[0]) : undefined,
      });
      // #endregion
    },
    resolveId(source, importer, options) {
      // #region agent log
      if (source === 'fs' || source === 'node:fs') {
        writeDebugLog(configName, 'resolveId requested fs', {
          source,
          importer: importer || '(no importer)',
          isEntry: options?.isEntry,
        });
        // Mark Node built-in as external so Vite dep-pre-bundle does not try to resolve it as an npm package
        return { id: source, external: true };
      }
      // #endregion
      return null;
    },
  };
}
