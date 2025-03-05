import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { remixPWA } from '@remix-pwa/dev';

declare module '@remix-run/dev' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    // Custom plugin resolves warning - Failed to resolve "remix:manifest" from /Users/... An id should be written. Did you pass a URL?
    {
      name: 'remix-manifest-resolver',
      resolveId(id) {
        if (id === 'remix:manifest') {
          return id;
        }
      },
      // Optional: warning is suppressed without this hook
      // Provides an empty object for 'remix:manifest' if HMR triggers, but HMR remains non-functional
      load(id) {
        if (id === 'remix:manifest') {
          return 'export default {}';
        }
      },
    },
    tsconfigPaths(),
    remixPWA(),
  ],
});
