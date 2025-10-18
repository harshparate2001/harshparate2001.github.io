// @ts-check
import {defineConfig} from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: 'https://harshparate2001.github.io',
    vite: {
        server: {
            port: 4321, // must match your local port
            allowedHosts: [".trycloudflare.com"], // use - cloudflared tunnel --url http://localhost:4321
            // optionally allow all Beeceptor subdomains (so you don’t need to edit every time)
            // allowedHosts: [".free.beeceptor.com"],
        },
        plugins: [tailwindcss()],
    },

    integrations: [react()]
});