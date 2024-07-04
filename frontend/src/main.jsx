import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApiConextProvider } from './context/ApiContext.jsx'
import { AuthConextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApiConextProvider>
      <AuthConextProvider>
        <App />
      </AuthConextProvider>
    </ApiConextProvider>
  </BrowserRouter>,
)
