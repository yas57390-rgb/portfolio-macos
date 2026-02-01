import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { MusicProvider } from './contexts/MusicContext.jsx'

import ErrorBoundary from './components/system/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <MusicProvider>
        <App />
      </MusicProvider>
    </ErrorBoundary>
  </StrictMode>,
)
