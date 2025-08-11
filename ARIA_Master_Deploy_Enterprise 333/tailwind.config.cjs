module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        aria: {
          navy: '#0B1B2B',
          gold: '#D4AF37',
          gray: '#6B7280',
          warm: '#FAFAFA',
          teal: '#0DD3BF',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
