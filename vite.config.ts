import reactPlugin from "@vitejs/plugin-react";
import { defineConfig, PluginOption } from "vite";

export default defineConfig({
  plugins: [reactPlugin() as PluginOption],
  define: {
    global: "window",
  },
});
