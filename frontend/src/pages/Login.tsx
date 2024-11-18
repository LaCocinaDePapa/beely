import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"

export const Login = () => {
  const { signin, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) <Navigate to="/dashboard" />
  }, [isAuthenticated])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const fields = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    const { email, password } = fields

    await signin({ email, password })
  }

  return (
    <section>
      <motion.div

        className="flex flex-col items-center justify-center px-6 mx-auto mt-8 lg:mt-24 md:mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <a
          href="/"
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="size-14" src="/bee.svg" alt="logo" />
          bee.ly
        </a>
        <div className="w-full bg-transparent border rounded-lg shadow lg:w-[600px] md:w-[600px] border-neutral-800">
          <div className="p-4 space-y-4 lg:p-8 md:space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 lg:text-3xl dark:text-white">
              Welcome back
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 border border-gray-300 rounded h-14 bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-base font-medium text-blue-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button variant="gradient" type="submit" className="w-full py-2 text-lg rounded-full">
                Sign in to your account
              </Button>

              <p className="text-base font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
