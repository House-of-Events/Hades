/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // add padding-top-xl as 2rem padding top
  theme: {
    extend: {
      colors: {
        background: '#191A1B',
        foreground: 'var(--foreground)',
        tableHeaderColor: '#1E2232',
        grayIron: {
          100: '#f5f5f5',
          200: '#e0e0e0',
          300: '#cfcfcf',
          400: '#b0b0b0',
          500: '#909090',
          600: '#707070',
          700: '#505050',
          800: '#303030',
        },
      },
      spacing: {
        'top-xl': '2rem',
      },
    },
  },
  plugins: [],
};
