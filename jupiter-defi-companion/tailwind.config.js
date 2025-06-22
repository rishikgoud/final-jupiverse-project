module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jupiterPurple: '#7f56d9',  // can keep if you still use
        jupiterCyan: '#22d3ee',
        jupiterGreen: '#10b981',
        jupiterOrange: '#f97316',
        jupiterDark: '#0b1120',
        jupiterBg: '#1e1b4b',         // dark nav bg
        jupiterHoverFrom: '#4c1d95',  // gradient dark start
        jupiterHoverTo: '#312e81'     // gradient dark end
      },
    },
  },
  plugins: [],
}

