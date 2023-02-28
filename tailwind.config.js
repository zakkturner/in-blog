/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./index.vue",

  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /.*/,
    }]
}
