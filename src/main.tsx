import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { QuizzApp } from './QuizzApp'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QuizzApp />
    </Provider>
  </StrictMode>
)
