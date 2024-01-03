import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        main: "/index.html",
        admin: "/admin/index.html",
        eventDetails: "/event_details/index.html",
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
});
