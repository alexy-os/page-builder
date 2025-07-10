import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
{/* import { performance } from './lib/utils'

// Initialize enhanced performance monitoring
if (process.env.NODE_ENV === 'development') {
  performance.observeLongTasks();
  performance.observeReactPerformance();
  performance.observeDOMOperations();
  
  // Make performance utilities globally available
  (window as any).perf = performance;
  
  console.log('🔧 Performance monitoring initialized');
  console.log('💡 Use perf.dashboard() in console to analyze performance');
  
  // Log initial performance stats
  setTimeout(() => {
    const stats = performance.getStats();
    if (stats) {
      console.log('📊 Initial Performance Stats:', stats);
    }
  }, 1000);
} */}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)