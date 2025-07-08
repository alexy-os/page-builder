const tailwindVersion = process.env.VITE_TAILWIND_VERSION || 'tw4-oklch'

export default {
  plugins: tailwindVersion === 'tw3-hsl' 
    ? {
        "postcss-import": {},
        tailwindcss3: {
          config: './tailwind.config.js'
        },
        autoprefixer: {},
      }
    : {
        "@tailwindcss/postcss": {},
      }
};
