/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#0d9488",
          DEFAULT: "#0f766e",
          dark: "#134e4a",
        },
        secondary: {
          light: "#1e293b",
          DEFAULT: "#0f172a",
          dark: "#020617",
        },
        accent: {
          DEFAULT: "#fbbf24",
          dark: "#d97706",
        },
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
      }
    },
  },
  plugins: [],
};