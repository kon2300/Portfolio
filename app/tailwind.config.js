module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'i-like-food-img': "url('./src/include/images/i-like-food.webp')",
        'wall-img': "url('./src/include/images/wall.webp')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
