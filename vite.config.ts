import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
//import autoprefixer from 'autoprefixer'

const tailwindVersion = process.env.VITE_TAILWIND_VERSION || 'tw4-oklch'

console.log(`🎨 Building with Tailwind version: ${tailwindVersion}`)

export default defineConfig(async () => {
  const baseConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      rollupOptions: {
        input: tailwindVersion === 'tw3-hsl' 
          ? path.resolve(__dirname, 'index-tw3.html')
          : path.resolve(__dirname, 'index.html')
      }
    }
  }

  if (tailwindVersion === 'tw3-hsl') {
    // Tailwind 3 configuration with PostCSS
    return {
      ...baseConfig,
      css: {
        postcss: './postcss.config.js'
      },
    }
  } else {
    // Tailwind 4 configuration with Vite plugin
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    return {
      ...baseConfig,
      plugins: [
        ...baseConfig.plugins,
        tailwindcss(),
      ],
      css: {
        postcss: './postcss.config.mjs'
      },
    }
  }
})