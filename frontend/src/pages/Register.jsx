import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { EyeButton } from "../components/EyeButton"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { isAuthenticated, signup } = useAuth()

  useEffect(() => {
    if (isAuthenticated) <Navigate to="/dashboard" />
  }, [isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fields = Object.fromEntries(new FormData(e.currentTarget))
    const { name, email, password } = fields

    await signup({ name, email, password })
  }

  return (
    <section>
      <motion.div
        className="flex flex-col justify-center items-center px-6 mx-auto mt-8 lg:mt-24 md:mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mr-2 size-10" src="/bee.svg" alt="logo" />
          Bee.ly
        </a>
        <div className="w-full bg-transparent rounded-md shadow dark:border sm:max-w-md xl:p-0 dark:border-neutral-800">
          <div className="p-4 space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold tracking-tight leading-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-14 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="text-gray-500 dark:text-gray-300"
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
                </div>
              </div>

              <Button type="submit" className="w-full py-2 text-[14.9px]">
                Create your account
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
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
