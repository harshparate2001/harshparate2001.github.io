import { defineConfig } from "vite";

export default defineConfig({
    server: {
        allowedHosts: [".trycloudflare.com"], // use - cloudflared tunnel --url http://localhost:4321
        port: 4321, // make sure it matches your dev port
    },
});
