import '@fontsource-variable/onest';
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Footer } from './components/Footer'
import { NotFound } from './pages/NotFound'
import { DashboardLayout } from './dashboard/DashboardLayout'
import { Links } from './components/Links'
import { ProtectedRoute } from './routes'
import UserProfileUpdateWithQR from './components/UserProfileUpdate'
import { AuthProvider } from './context/AuthContext'


const App = () => {
  return (
    <AuthProvider>
        <main className='grid max-w-screen min-h-dvh' style={{gridTemplateRows: 'auto 1fr auto'}}>
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white"></div>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Hero />} />
            <Route path='signin' element={<Login />} />
            <Route path='signup' element={<Register />} />

            {/* Protected routes with shared layout */}
            <Route>
              <Route path='dashboard' element={<DashboardLayout />}>
                <Route index element={<Links />} />
                <Route path='settings' element={<UserProfileUpdateWithQR />} />
              </Route>
            </Route>

            {/* Not found pages */}
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
    </AuthProvider>
  )
}

export default App
