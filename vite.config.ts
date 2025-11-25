import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), nitro(), tailwindcss()],
});
