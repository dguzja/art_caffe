import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import './styles/components.css'
import App from './App.tsx'

// Përshpejto renderimet dhe vendos elementet në root
const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
