import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // ? right here
import './index.css'; // ? your custom styles, if any

createRoot(document.getElementById('root')).render(
    
  <StrictMode>
    <App />
  </StrictMode>,
)
console.log('main.jsx is rendering');
