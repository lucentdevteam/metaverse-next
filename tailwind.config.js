/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "x-sm": "480px",
      },
      colors: {
        Grey50: "#a4a7af",
        Grey100: "#94979e",
        Grey300: "#686b72",
        Grey400: "#5a5d63",
        Grey500: "#4a4d52",
        Grey700: "#2B2E31",
        Grey800: "#202324",
        Violet200: "#a192a4",
        PrimaryBlue500: "#08a0d8",
        Red300: "#D75A80",
        success: "#3DFFF3",
      },
      fontSize: {
        "font-2rem": "2rem",
        "font-1.5rem": "1.5rem",
        "font-1.25rem": "1.25rem",
        "font-1.125rem": "1.125rem",
      },
    },
    plugins: [],
  },
};
