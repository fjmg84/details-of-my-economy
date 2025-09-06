/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#6b7280',
        success: '#10b981',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}
