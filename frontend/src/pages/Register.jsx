import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EyeButton } from '../components/EyeButton'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { isAuthenticated, signup } = useAuth()

  useEffect(() => {
    if (isAuthenticated) <Navigate to='/dashboard' />
  }, [isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const fields = Object.fromEntries(new FormData(e.currentTarget))
    const { name, email, password } = fields

    await signup({ name, email, password })
  
  }

  return (
    <section className='flex justify-center px-4 mt-28 min-h-min sm:px-6 lg:px-8 lg:mt-40'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-2 text-3xl font-extrabold text-center text-blue-600 dark:text-white'>
            Get started at bee.ly
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}
          className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>

            <div className='relative'>
              <label htmlFor="complete-name" className='text-black dark:text-white'>
                Complete name
              </label>
              <input
                type="text"
                name='name'
                id='complete-name'
                autoComplete='name'
                required
                className='relative block w-full px-3 py-3 border border-gray-700 rounded-md appearance-none focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                placeholder='Complete name'
              />
            </div>

            <div className='relative'>
              <label htmlFor="email-address" className='text-black dark:text-white'>
                Email address
              </label>
              <input
                type="email"
                name='email'
                id='email-address'
                autoComplete='email'
                required
                className='relative block w-full px-3 py-3 border border-gray-700 rounded-md appearance-none focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
            </div>

            <div className='relative'>
              <label htmlFor="password" className='text-black dark:text-white'>
                Password
              </label>
              <input
                type={showPassword ? 'text': 'password'}
                name='password'
                id='password'
                autoComplete='current-password'
                required
                className='relative block w-full px-3 py-3 border border-gray-700 rounded-md appearance-none focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                placeholder='Password'
              />

              <EyeButton showPassword={showPassword} setShowPassword={setShowPassword} />

            </div>

            <div className='relative'>
              <label htmlFor="confirmPassword" className='text-black dark:text-white'>
                Confirm password
              </label>
              <input
                type={showPassword ? 'text': 'password'}
                name='confirmPassword'
                id='confirmPassword'
                autoComplete='current-password'
                required
                className='relative block w-full px-3 py-3 border border-gray-700 rounded-md appearance-none focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm'
                placeholder='Confirm pasword'
              />

              <EyeButton showPassword={showPassword} setShowPassword={setShowPassword} />

            </div>

          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <input 
                  type="checkbox"
                  id='remember-me'
                  name='remember-me'
                  className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-blue-400'
                />
                <label htmlFor="remember-me" className='block ml-2 text-sm text-gray-700 dark:text-white'>
                  Remember me
                </label>
            </div>

            <div className='text-sm'>
                <Link to="/signin" className='form-medium text-sky-600 hover:text-sky-700 dark:text-slate-300 dark:hover:text-slate-40'>
                  Already have an account ?
                </Link>
            </div>
          </div>

          <div>
            <Button variant='secondary' size='md'>
              Signup
            </Button>
          </div>
      </form>

      </div>
    </section>
  )
}
