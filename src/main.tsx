import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { loadSupportBoard } from './lib/loadSupportBoard'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)

function scheduleSupportBoard(): void {
  const run = () => {
    loadSupportBoard()
  }
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 2500 })
  } else {
    setTimeout(run, 500)
  }
}
scheduleSupportBoard()

