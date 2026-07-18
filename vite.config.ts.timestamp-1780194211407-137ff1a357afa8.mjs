// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { readdirSync, unlinkSync, renameSync } from "fs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
function cleanPublicDir() {
  return {
    name: "clean-public-dir",
    buildStart() {
      const publicDir = resolve(__vite_injected_original_dirname, "public");
      try {
        const files = readdirSync(publicDir);
        for (const file of files) {
          if (file.includes(" ")) {
            const oldPath = resolve(publicDir, file);
            const newName = file.replace(/ /g, "_");
            const newPath = resolve(publicDir, newName);
            try {
              unlinkSync(oldPath);
            } catch {
              try {
                renameSync(oldPath, newPath);
              } catch {
              }
            }
          }
        }
      } catch {
      }
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [react(), cleanPublicDir()],
  optimizeDeps: {
    exclude: ["lucide-react"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZWFkZGlyU3luYywgdW5saW5rU3luYywgcmVuYW1lU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5cbmZ1bmN0aW9uIGNsZWFuUHVibGljRGlyKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2NsZWFuLXB1YmxpYy1kaXInLFxuICAgIGJ1aWxkU3RhcnQoKSB7XG4gICAgICBjb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSByZWFkZGlyU3luYyhwdWJsaWNEaXIpO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICBpZiAoZmlsZS5pbmNsdWRlcygnICcpKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRQYXRoID0gcmVzb2x2ZShwdWJsaWNEaXIsIGZpbGUpO1xuICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IGZpbGUucmVwbGFjZSgvIC9nLCAnXycpO1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHJlc29sdmUocHVibGljRGlyLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHVubGlua1N5bmMob2xkUGF0aCk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZW5hbWVTeW5jKG9sZFBhdGgsIG5ld1BhdGgpO1xuICAgICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAvLyBGaWxlIG1heSBiZSBsb2NrZWQsIHNraXBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIERpcmVjdG9yeSBtYXkgbm90IGV4aXN0XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGNsZWFuUHVibGljRGlyKCldLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGFBQWEsWUFBWSxrQkFBa0I7QUFDcEQsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBTXpDLFNBQVMsaUJBQXlCO0FBQ2hDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFDWCxZQUFNLFlBQVksUUFBUSxrQ0FBVyxRQUFRO0FBQzdDLFVBQUk7QUFDRixjQUFNLFFBQVEsWUFBWSxTQUFTO0FBQ25DLG1CQUFXLFFBQVEsT0FBTztBQUN4QixjQUFJLEtBQUssU0FBUyxHQUFHLEdBQUc7QUFDdEIsa0JBQU0sVUFBVSxRQUFRLFdBQVcsSUFBSTtBQUN2QyxrQkFBTSxVQUFVLEtBQUssUUFBUSxNQUFNLEdBQUc7QUFDdEMsa0JBQU0sVUFBVSxRQUFRLFdBQVcsT0FBTztBQUMxQyxnQkFBSTtBQUNGLHlCQUFXLE9BQU87QUFBQSxZQUNwQixRQUFRO0FBQ04sa0JBQUk7QUFDRiwyQkFBVyxTQUFTLE9BQU87QUFBQSxjQUM3QixRQUFRO0FBQUEsY0FFUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsUUFBUTtBQUFBLE1BRVI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFBQSxFQUNuQyxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
