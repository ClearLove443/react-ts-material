import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.material-react-table.com",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api2/, ""),
      },
    },
  },
  preview: {
    proxy: {
      "/api2": {
        target: "https://www.material-react-table.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api2/, ""),
      },
    },
  },
});
