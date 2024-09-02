import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:13000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/remote": {
        target: "https://www.material-react-table.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/remote/, ""),
      },
    },
  },
});
