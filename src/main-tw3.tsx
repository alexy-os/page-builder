import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadThemeCSS, getCurrentTheme } from './lib/themeManager'

import App from './App.tsx'
import './styles/tailwind-v3.css'

// Initialize theme on app load
async function initializeTheme() {
  const currentTheme = getCurrentTheme();
  await loadThemeCSS(currentTheme);
  console.log(`🎭 Loaded theme: ${currentTheme}`);
}

// Initialize app
async function initializeApp() {
  try {
    await initializeTheme();
    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Fallback render without styles
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

initializeApp(); 