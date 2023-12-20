/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    "./components/*.{vue,js}",
    "./pages/*.{vue,js}",
    "./app.vue",
    "./nuxt.config.{js,ts}",
  ],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
