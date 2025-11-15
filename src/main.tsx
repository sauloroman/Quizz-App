import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QuizzApp } from './QuizzApp'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizzApp />
  </StrictMode>
)
