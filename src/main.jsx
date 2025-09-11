import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa el provider que creaste para el carrito
import { CarritoProvider } from './context/CarritoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </StrictMode>,
)
