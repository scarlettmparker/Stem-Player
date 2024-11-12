/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '192': '48rem',
        '144': '36rem',
        '128': '32rem'
      },
      colors: {
        'mimi': '#ECCBD9',
        'chocolate': '#4C191B',
        'quinacridone': '#963D5A',
        'indigo': '#084B83',
        'areo': '#42BFDD',
        'forest': '#08833C',
        'mint': '#42DD8F'
      }
    },
  },
  plugins: [],
}

