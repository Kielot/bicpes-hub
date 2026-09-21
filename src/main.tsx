import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// // main.tsx
// import ReactDOM from 'react-dom/client'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <h1 style={{ color: 'black', fontSize: '40px' }}>TEST</h1>
// )