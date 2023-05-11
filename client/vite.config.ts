import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import dns from "dns";
import { fileURLToPath } from "node:url";

dns.setDefaultResultOrder("verbatim");

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "localhost",
      port: 1234,
      open: true,
    },
  };
});
