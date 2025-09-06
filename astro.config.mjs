// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page
      // Useful if you need to define and/or import your own custom `base.css`
      // or if you just want to have a single entry point for your css.
      // See the "Importing Tailwind in your CSS" example below for where you would use this
      applyBaseStyles: false,
    })
  ]
});