import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ChakraProvider} from '@chakra-ui/react'
import { AuthContextProvider } from './context/AuthContext'
import { EventContextProvider } from './context/EventContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
    <AuthContextProvider>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </AuthContextProvider>
    {/* </ChakraProvider> */}
  </React.StrictMode>,
)
