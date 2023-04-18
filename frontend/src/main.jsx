import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { EventContextProvider } from './context/EventContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
