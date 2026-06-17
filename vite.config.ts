import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, unlinkSync, renameSync } from 'fs';
import { resolve } from 'path';
import type { Plugin } from 'vite';

function cleanPublicDir(): Plugin {
  return {
    name: 'clean-public-dir',
    buildStart() {
      const publicDir = resolve(__dirname, 'public');
      try {
        const files = readdirSync(publicDir);
        for (const file of files) {
          if (file.includes(' ')) {
            const oldPath = resolve(publicDir, file);
            const newName = file.replace(/ /g, '_');
            const newPath = resolve(publicDir, newName);
            try {
              unlinkSync(oldPath);
            } catch {
              try {
                renameSync(oldPath, newPath);
              } catch {
                // File may be locked, skip
              }
            }
          }
        }
      } catch {
        // Directory may not exist
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), cleanPublicDir()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
