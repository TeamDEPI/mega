import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/mega/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://d3.deltauniv.edu.eg",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
