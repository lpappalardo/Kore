import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApiConextProvider } from './context/ApiContext.jsx'
import { AuthConextProvider } from './context/AuthContext.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApiConextProvider>
      <AuthConextProvider>
        <App />
        <Toaster 
          richColors
          position='top-right'
          dir='auto'
          visibleToasts={1}
          duration={2000}
          closeButton
          toastOptions={{
            className: 'my-toast',
          }}
        />
      </AuthConextProvider>
    </ApiConextProvider>
  </BrowserRouter>,
)
