import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MotionConfig } from 'framer-motion'

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
        <App />
      </MotionConfig>
    </AuthProvider>
  </Router>
)
