import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const Register = () => {
  const { isAuthenticated, signup, signin } = useAuth()
  const [redirectToDashboard, setRedirectToDashboard] = useState(false)


  useEffect(() => {
    if (isAuthenticated) {
      setRedirectToDashboard(true)
    }
  }, [isAuthenticated])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const fields = Object.fromEntries(new FormData(event.currentTarget))
    const { name, email, password } = fields

    await signup({ name, email, password })
    await signin({ email, password })
  }

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />
  }

  return (
    <section>
      <motion.div
        className="flex flex-col items-center justify-center px-6 mx-auto mt-8 lg:mt-24 md:mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <Link
          to="/"
          className="flex items-center mb-6 text-3xl text-gray-900 transition ease-linear hover:opacity-70 dark:text-white"
        >
          <img className="size-12" src="/bee.svg" alt="logo" />
        </Link>
        <div className="w-full lg:w-[600px] md:w-[600px] bg-transparent border rounded-xl shadow border-neutral-200 dark:border-neutral-800">
          <div className="p-4 space-y-4 lg:p-8 md:space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 lg:text-3xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="terms"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <Button variant="gradient" type="submit" className="w-full py-2 text-lg rounded-full">
                Create your account
              </Button>

              <p className="text-base font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
