/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      colors: {
        blue: "var(--primary-color)",
        success: "var(--success-color)",
        warning: "var(--warning-color)",
        error: "var(--error-color)",
        info: "var(--info-color)",
        body: "var(--text-color)",
        heading: "var(--heading-color)",
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
      },
    },
  },
  plugins: [],
};
