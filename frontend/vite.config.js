import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from 'fs'; 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync('./localhost+1-key.pem'), 
      cert: fs.readFileSync('./localhost+1.pem'),  
    },
  },
});