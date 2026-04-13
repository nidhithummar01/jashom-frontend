import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { loadTidio } from './lib/loadTidio'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)

function scheduleTidio(): void {
  const run = () => {
    loadTidio()
  }
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 2500 })
  } else {
    setTimeout(run, 500)
  }
}
scheduleTidio()

