import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ImageConverter from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageConverter />
  </StrictMode>,
)
