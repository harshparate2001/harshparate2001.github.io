// @ts-check
import {defineConfig} from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: 'https://harshparate2001.github.io',
    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [react()]
});