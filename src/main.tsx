import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { initializeBlockRegistry } from '@/lib/blockRegistry'

// Initialize block registry for content management
initializeBlockRegistry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)