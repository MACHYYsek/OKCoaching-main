/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00EDFF',
        label: '#BCBCBC',
        placeholder: '#505050',
        input: '#DEDEDE',
        'input-bg': '#222223',
      },
    },
  },
  plugins: [],
}