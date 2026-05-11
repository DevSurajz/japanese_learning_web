import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ViewportProvider } from './hooks.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewportProvider>
      <App />
    </ViewportProvider>
  </StrictMode>,
)
